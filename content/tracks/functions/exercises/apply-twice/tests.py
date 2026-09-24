def test_applies_once():
    assert apply_twice(lambda n: n + 3, 1) == 7


def test_applies_twice():
    assert apply_twice(lambda n: n * 2, 3) == 12


def test_works_with_builtins():
    assert apply_twice(str.strip, "  x  ") == "x"


def test_works_with_zero():
    assert apply_twice(lambda n: n + 1, 0) == 2


def test_negative_values():
    assert apply_twice(abs, -5) == 5
