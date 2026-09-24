def test_single_digit():
    assert digit_sum(7) == 7


def test_multiple_digits():
    assert digit_sum(1234) == 10


def test_zero():
    assert digit_sum(0) == 0


def test_all_nines():
    assert digit_sum(999) == 27


def test_large_number():
    assert digit_sum(987654321) == 45
