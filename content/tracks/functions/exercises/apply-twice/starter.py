from collections.abc import Callable


def apply_twice(function: Callable[[int], int], value: int) -> int:
    return value


if __name__ == "__main__":
    print(apply_twice(lambda n: n + 3, 1))
