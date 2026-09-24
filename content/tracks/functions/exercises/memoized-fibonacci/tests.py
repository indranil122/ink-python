def test_base_cases():
    assert fibonacci(0) == 0
    assert fibonacci(1) == 1


def test_small_values():
    assert fibonacci(2) == 1
    assert fibonacci(10) == 55


def test_moderate_value():
    assert fibonacci(30) == 832040


def test_is_fast_enough():
    assert fibonacci(80) == 23416728348467685
