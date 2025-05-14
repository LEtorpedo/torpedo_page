# Torpedo Blog & Personal Hub

[中文版说明 (Chinese README)](README.zh-CN.md)

This project is a modern, aesthetically pleasing personal homepage and blog, also serving as a platform for personal tools. It's built with a React frontend and a Python (FastAPI) backend.

## ✨ Core Technologies

*   **Frontend:**
    *   Framework: React (with Vite)
    *   Styling: Tailwind CSS
    *   UI Primitives: Headless UI / shadcn/ui
    *   Routing: React Router
    *   State Management: Zustand (or other suitable)
    *   Data Fetching: TanStack Query + Axios/Fetch
    *   Icons: Lucide Icons
*   **Backend:**
    *   Framework: Python with FastAPI
    *   Database: SQLite (initially)
    *   Data Validation: Pydantic
*   **Content:** Markdown (served via API, rendered by React)

## 🚀 Key Features

*   **Homepage:** Bento Grid layout, Hero section, self-intro, project highlights, latest articles, social links.
*   **Blog:** List & Detail views, Markdown rendering, reading progress, tags.
*   **Academic Homepage:** Professional, information-centric design.
*   **Admin Panel / Personal Workbench:** Secure area for content management (CRUD for posts, categories, tags) and integrated personal tools (e.g., RSS reader, To-Do list placeholders).

(Refer to `design.md` for more detailed feature descriptions)

## 📂 Project Structure

The project is organized into two main sub-directories:

*   `frontend/`: Contains the React + Vite frontend application.
*   `backend/`: Contains the Python + FastAPI backend application.

Refer to `CONTRIBUTING.md` for detailed guidelines on the structure within each sub-project.

## 🛠️ Getting Started (Local Development)

### Prerequisites

*   Node.js (latest LTS version recommended for frontend)
*   npm or yarn
*   Python (3.9+ recommended for backend)
*   pip and virtualenv (or Poetry/PDM for backend dependency management)

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The frontend will typically be available at `http://localhost:5173`.

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies (assuming `requirements.txt` or `pyproject.toml` for Poetry/PDM):
    ```bash
    pip install -r requirements.txt # Or poetry install / pdm install
    ```
4.  Set up environment variables: Create a `.env` file in the `backend/` directory based on a `.env.example` (if provided).
5.  Start the development server (FastAPI with Uvicorn):
    ```bash
    uvicorn app.main:app --reload # Adjust 'app.main:app' as per your backend structure
    ```
    The backend API will typically be available at `http://localhost:8000`.

## 📜 Development Guidelines

Please adhere to the conventions and practices outlined in `CONTRIBUTING.md`. This includes naming conventions, code style, commit messages, and more. 不过更重要的还是我们要严格遵循安全性原则。

**Important:** This project uses a [Conventional Commits](https://www.conventionalcommits.org/) format for commit messages.

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for details on how to contribute, our code of conduct, and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details. 