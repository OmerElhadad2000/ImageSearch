type ImageResult = string[];

const DisplaySearchResults = ({images, query}: { images: ImageResult; query: string }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 mt-4 text-white">Results for "{query}"</h1>
            {images.length === 0 && <p className="text-white">No images found.</p>}
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                {images.map((imgPath, idx) => {
                    const filename = imgPath.split("\\").pop();

                    return (
                        <div key={idx} className="relative rounded overflow-hidden shadow-lg group">
                            <img
                                src={`http://localhost:8000/image/${filename}`}
                                alt={`Image ${idx}`}
                                className="w-72 h-72 object-cover transform transition duration-300 group-hover:scale-105"
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2
                                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {filename}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplaySearchResults;
