# Regex Pattern Replacer

This project allows users to upload structured tabular data (CSV or Excel), write natural language instructions, and automatically generate regular expressions using an LLM (Large Language Model) to perform pattern-based search and replacement.

## Features
- Upload Excel or CSV files
- Display uploaded data in a table
- Use natural language instructions to generate regex
- Apply regex-based replacements
- Preview processed results
- Download processed data as a CSV

---

## How to Set Up and Run the Project

### 1. Backend Setup (Django + OpenAI)

#### Requirements
- Python 3.9+
- pip
- virtualenv (optional but recommended)

#### Installation
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Add OpenAI API Key
Create a `.env` file in the `backend` folder:
```
OPENAI_API_KEY=your_openai_key_here
```

#### Run the server
```bash
python manage.py runserver
```

### 2. Frontend Setup (React + MUI)

#### Requirements
- Node.js (18+ recommended)
- npm

#### Installation
```bash
cd frontend
npm install
```

#### Run the development server
```bash
npm start
```

The frontend should be available at [http://localhost:3000](http://localhost:3000).
Make sure the backend runs at [http://localhost:8000](http://localhost:8000).

---

## Demo Video

> [![](https://img.youtube.com/vi/ytCFVj-wqEU/0.jpg)](https://www.youtube.com/watch?v=ytCFVj-wqEU)


---

## Project Summary

This project demonstrates the combination of natural language understanding and traditional data transformation techniques. It leverages GPT (via OpenAI API) to:

- Convert flexible, human-friendly instructions into strict regex patterns
- Enhance usability for non-technical users dealing with messy datasets


### 🧠 Limitations & Ideas for Improvement
- Currently only supports one rule at a time
- Could add support for column-specific filtering
- Could support multiple regex instructions in batch
- Improve UX with real-time validation or pattern previews

---

## Folder Structure

```
project-root/
├── backend/          # Django backend with OpenAI integration
├── frontend/         # React frontend using MUI
└── README.md         # This file
```

---

## Contact

Author: chan.tang@student.unimelb.edu.au

