def test_word():
    assert last_character("python") == "n"


def test_single_character():
    assert last_character("a") == "a"


def test_empty_string():
    assert last_character("") == ""


def test_keeps_whitespace():
    assert last_character("hello ") == " "
