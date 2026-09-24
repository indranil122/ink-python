def test_greets_a_simple_name():
    assert greet("Ada") == "Hello, Ada!"


def test_greets_a_name_with_spaces():
    assert greet("Grace Hopper") == "Hello, Grace Hopper!"


def test_handles_an_empty_name():
    assert greet("") == "Hello, !"


def test_keeps_unicode_names():
    assert greet("Ada Lovelace 💡") == "Hello, Ada Lovelace 💡!"
