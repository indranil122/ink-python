def test_inside_range():
    assert clamp(5, 0, 10) == 5


def test_above_range():
    assert clamp(15, 0, 10) == 10


def test_below_range():
    assert clamp(-5, 0, 10) == 0


def test_on_the_boundary():
    assert clamp(0, 0, 10) == 0
    assert clamp(10, 0, 10) == 10


def test_reversed_bounds_raise():
    try:
        clamp(5, 10, 0)
    except ValueError:
        return
    raise AssertionError("expected ValueError for reversed bounds")
