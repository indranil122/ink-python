def test_simple_grouping():
    assert group_by_length(["a", "bb", "cc"]) == {1: ["a"], 2: ["bb", "cc"]}


def test_mixed_lengths():
    assert group_by_length(["one", "two", "six"]) == {
        3: ["one", "two", "six"]
    }


def test_duplicates_are_kept():
    assert group_by_length(["aa", "aa"]) == {2: ["aa", "aa"]}


def test_empty_list():
    assert group_by_length([]) == {}
