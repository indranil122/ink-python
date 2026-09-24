def test_freezing_point():
    assert to_fahrenheit(0) == 32


def test_boiling_point():
    assert to_fahrenheit(100) == 212


def test_body_temperature():
    assert to_fahrenheit(37) == 98.6


def test_negative_temperature():
    assert to_fahrenheit(-40) == -40


def test_returns_a_number():
    assert isinstance(to_fahrenheit(20), (int, float))
