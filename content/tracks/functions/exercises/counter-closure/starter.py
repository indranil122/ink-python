def make_counter():
    def increment():
        return 0

    return increment


if __name__ == "__main__":
    counter = make_counter()
    print(counter(), counter())
