def test_even_positive():
    assert is_even(4) is True


def test_odd_positive():
    assert is_even(7) is False


def test_zero_is_even():
    assert is_even(0) is True


def test_negative_odd():
    assert is_even(-3) is False


def test_negative_even():
    assert is_even(-8) is True
