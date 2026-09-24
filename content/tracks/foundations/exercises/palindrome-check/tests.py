def test_simple_word():
    assert is_palindrome("racecar") is True


def test_ignores_case():
    assert is_palindrome("RaceCar") is True


def test_ignores_punctuation_and_spaces():
    assert is_palindrome("A man, a plan, a canal: Panama") is True


def test_not_a_palindrome():
    assert is_palindrome("python") is False


def test_empty_string():
    assert is_palindrome("") is True
