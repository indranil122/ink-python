def test_removes_consecutive_duplicates():
    assert unique_in_order([1, 1, 2, 2, 3, 1]) == [1, 2, 3, 1]


def test_all_unique():
    assert unique_in_order([1, 2, 3]) == [1, 2, 3]


def test_all_the_same():
    assert unique_in_order([7, 7, 7]) == [7]


def test_empty_list():
    assert unique_in_order([]) == []


def test_works_with_strings():
    assert unique_in_order("aaabbcda") == list("abcda")
