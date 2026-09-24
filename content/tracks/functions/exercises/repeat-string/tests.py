def test_repeats():
    assert repeat_string("ab", 3) == "ababab"


def test_single_repeat():
    assert repeat_string("hello", 1) == "hello"


def test_zero_count():
    assert repeat_string("hello", 0) == ""


def test_negative_count():
    assert repeat_string("hello", -2) == ""


def test_keeps_spaces():
    assert repeat_string("ab ", 2) == "ab ab "
