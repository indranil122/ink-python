def test_typical_leap_year():
    assert is_leap_year(2024) is True


def test_typical_non_leap_year():
    assert is_leap_year(2023) is False


def test_century_is_not_a_leap_year():
    assert is_leap_year(1900) is False


def test_four_hundred_years_are_leap():
    assert is_leap_year(2000) is True


def test_year_1600():
    assert is_leap_year(1600) is True
