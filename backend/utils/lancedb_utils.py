import lancedb
from lancedb.embeddings import EmbeddingFunctionRegistry
from lancedb.pydantic import LanceModel, Vector
from PIL import Image

registry = EmbeddingFunctionRegistry.get_instance()
clip = registry.get("open-clip").create()

db = lancedb.connect("~/.lancedb")


class ImageFile(LanceModel):
    vector: Vector(clip.ndims()) = clip.VectorField()
    image_uri: str = clip.SourceField()

    @property
    def image(self):
        return Image.open(self.image_uri)

    @classmethod
    def filter_existing(cls, uris, table):
        existing = {row["URI"] for row in table.to_df()["URI"]}
        return [uri for uri in uris if uri not in existing]


def create_table(table_name: str) -> lancedb.table:
    if table_name in db.table_names():
        db.drop_table(table_name)

    return db.create_table(table_name, schema=ImageFile)


def search_table(table: lancedb.table, query: str, matching_amount=1) -> list[ImageFile]:
    return table.search(query).limit(matching_amount).to_pydantic(ImageFile)
