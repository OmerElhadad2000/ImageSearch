export async function getImagesUrl(query: string, matchingAmount: number) {
    return await fetch(`http://localhost:8000/search/${encodeURIComponent(query)}?matching_amount=${matchingAmount}`);

}

export async function searchImage(_: any, form: FormData) {

    const query = form.get("query");
    const matchingAmount = Number(form.get("matchingAmount")) || 9;


    if (typeof query !== "string" || query.trim() === "") {
        return {error: "Query cannot be empty"};
    }

    const response = await getImagesUrl(query, matchingAmount);
    if (!response.ok) {
        return {error: "Failed to fetch images"};
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0) {
        return {error: "No images found", query};
    }

    return {images: data.images, query};
}
