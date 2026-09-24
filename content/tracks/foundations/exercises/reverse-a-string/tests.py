def test_reverses_a_word():
    assert reverse_string("python") == "nohtyp"


def test_empty_string():
    assert reverse_string("") == ""


def test_single_character():
    assert reverse_string("a") == "a"


def test_keeps_spaces():
    assert reverse_string("ab c") == "c ba"


def test_palindrome_stays_the_same():
    assert reverse_string("racecar") == "racecar"
