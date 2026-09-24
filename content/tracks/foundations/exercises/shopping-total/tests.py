def test_single_item():
    assert basket_total([("apple", 1.50, 4)]) == 6.0


def test_multiple_items():
    assert basket_total([("apple", 1.50, 4), ("bread", 2.25, 1)]) == 8.25


def test_empty_basket():
    assert basket_total([]) == 0.0


def test_zero_quantity():
    assert basket_total([("apple", 1.50, 0), ("bread", 2.25, 2)]) == 4.5
