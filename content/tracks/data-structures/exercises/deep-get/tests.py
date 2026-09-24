def test_existing_value():
    assert deep_get({"server": {"port": 8080}}, ["server", "port"]) == 8080


def test_missing_leaf():
    assert deep_get({"server": {"port": 8080}}, ["server", "host"]) is None


def test_missing_branch():
    assert deep_get({"server": {"port": 8080}}, ["server", "user", "id"]) is None


def test_custom_default():
    assert deep_get({}, ["a"], "fallback") == "fallback"


def test_non_dictionary_in_path():
    assert deep_get({"a": 5}, ["a", "b"]) is None


def test_empty_path():
    assert deep_get({"a": 1}, [], "none") == "none"
