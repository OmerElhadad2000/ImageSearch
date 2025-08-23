import pandas as pd
from lancedb_utils import create_table, search_table
from image_utils import display_image, get_images

table = create_table("images")
uris = get_images("~/Music")
table.add(pd.DataFrame({"image_uri": uris}))
def main():
    while(True):
        query = input("Enter search query (or 'exit' to quit): ")
        if query.lower() == 'exit':
            break

        for image in search_table(table, query, matching_amount=1):
            display_image(image.image)

if __name__ == '__main__':
    main()