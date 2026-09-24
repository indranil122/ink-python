def test_simple_word():
    assert letter_counts("banana") == {"b": 1, "a": 3, "n": 2}


def test_ignores_case():
    assert letter_counts("AaA") == {"a": 3}


def test_ignores_non_letters():
    assert letter_counts("a1 b!") == {"a": 1, "b": 1}


def test_empty_string():
    assert letter_counts("") == {}
