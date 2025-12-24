# High-Performance Image Search Engine

![LanceDB](https://img.shields.io/badge/Database-LanceDB-orange?style=flat&logo=database)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=flat&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/Language-Python-3776AB?style=flat&logo=python&logoColor=white)

A lightning-fast, full-stack semantic image search application. This project leverages **LanceDB** for efficient vector storage, allowing users to search through massive image datasets using natural language queries with millisecond latency.

> **Note:** This project demonstrates the power of serverless vector databases combined with a modern asynchronous web stack.

---

## Key Features

* **Semantic Search:** Query images using natural language (e.g., "A dog playing in the snow") rather than exact keywords.
* **High Performance:** Powered by **LanceDB**, a serverless, embedded vector database designed for AI workloads.
* **Modern Frontend:** Responsive and interactive UI built with **Next.js**.
* **Asynchronous Backend:** High-throughput API built with **FastAPI** (Python) to handle inference and database queries concurrently.

## Tech Stack

### Frontend
* **Next.js:** For server-side rendering and static site generation.
* **React:** UI Component library.
* **Tailwind CSS:** For styling (optional).

### Backend
* **Python:** Core logic and ML integration.
* **FastAPI:** For creating the REST API endpoints.
* **LanceDB:** For storing image embeddings and performing vector similarity search.
* **CLIP (or similar model):** For generating vector embeddings from images and text.

---

## Architecture

1.  **Ingestion:** Images are processed through an embedding model (e.g., CLIP) to convert visual data into high-dimensional vectors.
2.  **Storage:** These vectors are indexed and stored in LanceDB.
3.  **Querying:** User input (text) is converted into a vector on the fly and compared against the database using Cosine Similarity or Euclidean Distance.
4.  **Result:** The most relevant images are returned to the Next.js frontend instantly.

---

## Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.9+

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/image-search-engine.git](https://github.com/yourusername/image-search-engine.git)
cd image-search-engine
```
### 2. Backend Setup
Navigate to the server directory and install Python dependencies.

```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

### 3. Frontend Setup
Navigate to the client directory and install Node dependencies.

```bash
cd ../frontend
npm install

# Start the development server
npm run dev
```
