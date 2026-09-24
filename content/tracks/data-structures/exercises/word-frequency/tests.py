def test_simple_counts():
    assert word_frequency("a b a") == [("a", 2), ("b", 1)]


def test_ignores_case():
    assert word_frequency("A a") == [("a", 2)]


def test_ignores_punctuation():
    assert word_frequency("a, b.") == [("a", 1), ("b", 1)]


def test_ties_are_alphabetical():
    assert word_frequency("b a c") == [("a", 1), ("b", 1), ("c", 1)]


def test_empty_text():
    assert word_frequency("") == []
    assert word_frequency("...!") == []
