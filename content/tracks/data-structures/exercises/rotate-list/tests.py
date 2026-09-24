def test_rotate_by_one():
    assert rotate([1, 2, 3, 4], 1) == [2, 3, 4, 1]


def test_rotate_by_two():
    assert rotate([1, 2, 3, 4], 2) == [3, 4, 1, 2]


def test_rotate_by_zero():
    assert rotate([1, 2, 3], 0) == [1, 2, 3]


def test_wraps_around():
    assert rotate([1, 2, 3], 4) == [2, 3, 1]


def test_empty_list():
    assert rotate([], 3) == []
