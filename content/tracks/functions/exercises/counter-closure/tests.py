def test_first_call():
    counter = make_counter()
    assert counter() == 1


def test_increments():
    counter = make_counter()
    assert [counter(), counter(), counter()] == [1, 2, 3]


def test_counters_are_independent():
    first = make_counter()
    second = make_counter()
    assert first() == 1
    assert second() == 1
    assert first() == 2


def test_does_not_reset():
    counter = make_counter()
    counter()
    counter()
    assert counter() == 3
