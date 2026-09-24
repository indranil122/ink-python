def test_simple_case():
    assert second_largest([4, 1, 9, 7]) == 7


def test_ignores_duplicates():
    assert second_largest([9, 9, 4]) == 4


def test_already_sorted():
    assert second_largest([1, 2, 3, 4]) == 3


def test_negative_numbers():
    assert second_largest([-1, -9, -4]) == -4


def test_not_enough_distinct_values():
    assert second_largest([5, 5]) is None
    assert second_largest([]) is None
