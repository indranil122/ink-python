from typing import Any


def deep_get(data: dict, path: list[str], default: Any = None) -> Any:
    return default


if __name__ == "__main__":
    print(deep_get({"server": {"port": 8080}}, ["server", "port"]))
