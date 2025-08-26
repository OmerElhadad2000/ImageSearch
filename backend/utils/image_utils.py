from itertools import chain
from pathlib import Path


def display_image(image):
    image.show()


def get_images(path: str) -> list[str]:
    p = Path(path).expanduser()
    uris = [str(f)[2::] for f in chain(p.glob("*.jpeg"), p.glob("*.png"), p.glob("*.jpg")) if f.is_file()]
    return uris
