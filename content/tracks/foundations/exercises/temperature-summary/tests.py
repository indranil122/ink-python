def test_freezing():
    assert describe_temperature(-5) == "freezing"
    assert describe_temperature(0) == "freezing"


def test_cold():
    assert describe_temperature(5) == "cold"
    assert describe_temperature(10) == "cold"


def test_mild_and_warm():
    assert describe_temperature(11) == "mild"
    assert describe_temperature(20) == "mild"
    assert describe_temperature(21) == "warm"
    assert describe_temperature(30) == "warm"


def test_hot():
    assert describe_temperature(31) == "hot"
