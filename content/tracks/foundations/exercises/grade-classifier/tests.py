def test_top_of_the_range():
    assert classify_grade(95) == "A"


def test_boundaries():
    assert classify_grade(90) == "A"
    assert classify_grade(89) == "B"
    assert classify_grade(80) == "B"
    assert classify_grade(60) == "D"
    assert classify_grade(59) == "F"


def test_above_the_scale():
    assert classify_grade(120) == "A"
