def test_single_word():
    assert first_word("python") == "python"


def test_multiple_words():
    assert first_word("learn python every day") == "learn"


def test_ignores_extra_space():
    assert first_word("   learn   python  ") == "learn"


def test_empty_string():
    assert first_word("") == ""
    assert first_word("   ") == ""
