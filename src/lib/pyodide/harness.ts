export const pythonHarness = `
import contextlib
import io
import json
import re
import sys
import traceback
import types
import unittest

_OWN_FILES = ("snippet.py", "solution.py", "tests.py")
_NEWLINE = chr(10)

_IMPORT_RE = re.compile(
    r"^\\s*(?:import|from)\\s+([A-Za-z_][A-Za-z0-9_]*)",
    re.MULTILINE,
)

_STDLIB_NAMES = {
    "unittest", "pytest", "os", "sys", "re", "json", "math", "string",
    "random", "datetime", "collections", "itertools", "functools", "typing",
    "textwrap", "operator", "heapq", "bisect", "copy", "abc", "enum",
    "statistics", "fractions", "decimal", "io", "copyreg", "keyword",
}


def _ink_last_line(text):
    for line in reversed(text.strip().splitlines()):
        if line.strip():
            return line.strip()
    return ""


def _ink_format_error():
    error_type, error_value, _ = sys.exc_info()
    if error_value is None:
        return ""
    exception = traceback.TracebackException.from_exception(error_value)
    frames = [frame for frame in exception.stack if frame.filename in _OWN_FILES]
    lines = []
    if frames:
        lines.append("Traceback (most recent call last):" + _NEWLINE)
        lines.extend(traceback.format_list(frames))
    lines.extend(traceback.format_exception_only(error_type, error_value))
    return "".join(lines)


def _ink_line_number(tests_lines, text):
    matches = re.findall(r'File "tests\\.py", line (\\d+)', text)
    if not matches:
        return 0
    number = int(matches[-1])
    if 1 <= number <= len(tests_lines):
        return number
    return 0


def _ink_error_line(tests_lines):
    _, _, trace = sys.exc_info()
    line_number = 0
    while trace is not None:
        if trace.tb_frame.f_code.co_filename in _OWN_FILES:
            line_number = trace.tb_lineno
        trace = trace.tb_next
    if 0 < line_number <= len(tests_lines):
        return tests_lines[line_number - 1].strip()
    return ""


def _ink_module_name(tests_source):
    for name in _IMPORT_RE.findall(tests_source):
        if name not in _STDLIB_NAMES:
            return name
    return "solution"


def _ink_execute(source, filename, namespace):
    exec(compile(source, filename, "exec"), namespace)


def _ink_iter_tests(suite):
    for item in suite:
        if isinstance(item, unittest.TestSuite):
            for nested in _ink_iter_tests(item):
                yield nested
        else:
            yield item


def _ink_collect(tests_module, tests_lines):
    results = []
    covered = set()

    suite = unittest.defaultTestLoader.loadTestsFromModule(tests_module)

    for test in _ink_iter_tests(suite):
        outcome = unittest.TestResult()
        test.run(outcome)
        name = test.id().split(".")[-1]
        covered.add(name)

        if outcome.failures:
            detail = outcome.failures[0][1]
            number = _ink_line_number(tests_lines, detail)
            results.append(
                {
                    "name": name,
                    "passed": False,
                    "message": _ink_last_line(detail),
                    "source": tests_lines[number - 1].strip() if number else "",
                }
            )
        elif outcome.errors:
            detail = outcome.errors[0][1]
            number = _ink_line_number(tests_lines, detail)
            results.append(
                {
                    "name": name,
                    "passed": False,
                    "message": _ink_last_line(detail),
                    "source": tests_lines[number - 1].strip() if number else "",
                }
            )
        else:
            results.append(
                {"name": name, "passed": True, "message": "", "source": ""}
            )

    for name, value in list(tests_module.__dict__.items()):
        if not name.startswith("test_") or not callable(value) or name in covered:
            continue
        try:
            value()
            results.append(
                {"name": name, "passed": True, "message": "", "source": ""}
            )
        except BaseException:
            results.append(
                {
                    "name": name,
                    "passed": False,
                    "message": _ink_last_line(_ink_format_error()),
                    "source": _ink_error_line(tests_lines),
                }
            )

    return results


def _ink_run_code(source):
    buffer = io.StringIO()
    namespace = {"__name__": "__ink__"}
    payload = {"output": "", "error": "", "ok": True}
    with contextlib.redirect_stdout(buffer), contextlib.redirect_stderr(buffer):
        try:
            _ink_execute(source, "snippet.py", namespace)
        except BaseException:
            payload["ok"] = False
            payload["error"] = _ink_format_error()
    payload["output"] = buffer.getvalue()
    return json.dumps(payload)


def _ink_run_tests(source, tests_source):
    buffer = io.StringIO()
    tests_lines = tests_source.splitlines()
    payload = {"status": "ok", "output": "", "error": "", "tests": []}

    module_name = _ink_module_name(tests_source)
    solution_module = types.ModuleType(module_name)
    tests_module = types.ModuleType("ink_tests")

    with contextlib.redirect_stdout(buffer), contextlib.redirect_stderr(buffer):
        try:
            _ink_execute(source, "solution.py", solution_module.__dict__)
        except BaseException:
            payload["status"] = "solution_error"
            payload["error"] = _ink_format_error()
            payload["output"] = buffer.getvalue()
            return json.dumps(payload)

        previous = sys.modules.get(module_name)
        sys.modules[module_name] = solution_module

        try:
            _ink_execute(tests_source, "tests.py", tests_module.__dict__)
        except BaseException:
            payload["status"] = "tests_error"
            payload["error"] = _ink_format_error()
            payload["output"] = buffer.getvalue()
            return json.dumps(payload)
        finally:
            if previous is None:
                sys.modules.pop(module_name, None)
            else:
                sys.modules[module_name] = previous

        payload["tests"] = _ink_collect(tests_module, tests_lines)

    payload["output"] = buffer.getvalue()
    return json.dumps(payload)
`;
