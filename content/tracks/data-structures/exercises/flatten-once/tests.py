def test_flattens_one_level():
    assert flatten_once([[1, 2], [3], [4, 5]]) == [1, 2, 3, 4, 5]


def test_leaves_deeper_nesting():
    assert flatten_once([[1, [2]]]) == [1, [2]]


def test_keeps_plain_items():
    assert flatten_once([1, [2], 3]) == [1, 2, 3]


def test_empty_input():
    assert flatten_once([]) == []
