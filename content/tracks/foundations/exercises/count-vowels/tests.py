def test_counts_simple_word():
    assert count_vowels("hello") == 2


def test_ignores_case():
    assert count_vowels("AEIOU") == 5


def test_ignores_non_letters():
    assert count_vowels("h3llo, w0rld!") == 2


def test_empty_string():
    assert count_vowels("") == 0


def test_repeated_vowels():
    assert count_vowels("queue") == 4
