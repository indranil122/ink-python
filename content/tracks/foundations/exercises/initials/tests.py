def test_two_words():
    assert initials("ada lovelace") == "A L"


def test_three_words():
    assert initials("alan turing king") == "A T K"


def test_extra_spaces():
    assert initials("  ada   lovelace  ") == "A L"


def test_single_word():
    assert initials("prince") == "P"


def test_empty_string():
    assert initials("") == ""
