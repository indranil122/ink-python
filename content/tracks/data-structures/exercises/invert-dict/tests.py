def test_simple_inversion():
    assert invert_dictionary({"a": 1, "b": 2}) == {1: "a", 2: "b"}


def test_mixed_value_types():
    assert invert_dictionary({"one": 1, "two": 2, "three": 3}) == {
        1: "one",
        2: "two",
        3: "three",
    }


def test_empty_dictionary():
    assert invert_dictionary({}) == {}


def test_original_is_unchanged():
    original = {"a": 1}
    invert_dictionary(original)
    assert original == {"a": 1}
