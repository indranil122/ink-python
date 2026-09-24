def test_plain_number():
    assert fizzbuzz_line(7) == "7"


def test_divisible_by_three():
    assert fizzbuzz_line(9) == "Fizz"


def test_divisible_by_five():
    assert fizzbuzz_line(10) == "Buzz"


def test_divisible_by_both():
    assert fizzbuzz_line(15) == "FizzBuzz"


def test_zero_and_negative():
    assert fizzbuzz_line(0) == "FizzBuzz"
    assert fizzbuzz_line(-3) == "Fizz"
