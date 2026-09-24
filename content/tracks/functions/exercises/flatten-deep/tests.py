def test_one_level():
    assert flatten_deep([1, [2, 3]]) == [1, 2, 3]


def test_many_levels():
    assert flatten_deep([1, [2, [3, [4, [5]]]]]) == [1, 2, 3, 4, 5]


def test_strings_are_leaves():
    assert flatten_deep(["ab", ["cd"]]) == ["ab", "cd"]


def test_tuples_are_leaves():
    assert flatten_deep([(1, 2), [3]]) == [(1, 2), 3]


def test_empty():
    assert flatten_deep([]) == []
    assert flatten_deep([[], [[]]]) == []
