def test_largest_in_the_middle():
    assert largest(3, 19, 7) == 19


def test_largest_first():
    assert largest(19, 3, 7) == 19


def test_all_equal():
    assert largest(5, 5, 5) == 5


def test_negative_numbers():
    assert largest(-8, -3, -19) == -3


def test_floats():
    assert largest(1.5, 1.75, 1.25) == 1.75
