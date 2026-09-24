def test_returns_highest_first():
    assert top_n({"ada": 100, "alan": 91, "grace": 98}, 2) == [
        ("ada", 100),
        ("grace", 98),
    ]


def test_n_larger_than_input():
    assert top_n({"ada": 100}, 5) == [("ada", 100)]


def test_zero():
    assert top_n({"ada": 100}, 0) == []


def test_empty_dictionary():
    assert top_n({}, 3) == []


def test_ties_keep_insertion_order():
    assert top_n({"a": 5, "b": 5, "c": 1}, 2) == [("a", 5), ("b", 5)]
