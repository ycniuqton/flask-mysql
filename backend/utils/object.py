class Empty():
    def __init__(self, **kwargs):
        for att in kwargs:
            setattr(self, att, kwargs[att])
