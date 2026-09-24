def test_two_words():
    assert word_lengths("learn python") == [5, 6]


def test_ignores_extra_space():
    assert word_lengths("  a   bb  ccc ") == [1, 2, 3]


def test_empty_sentence():
    assert word_lengths("") == []


def test_punctuation_counts():
    assert word_lengths("hi, there!") == [3, 6]
