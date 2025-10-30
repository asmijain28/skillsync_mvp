# 🎯 SkillSync – AI Career Path Recommender

### 🚀 Problem Statement
Many students choose their academic paths based on peer influence or limited awareness of job market trends. This results in a mismatch between education and employability.  
**SkillSync** is an AI-powered web app that recommends **personalized career paths** by analyzing a student’s **skills, interests, and academic background**.

---

### 💡 Features
- 🧠 AI-driven career recommendations  
- 📊 Smart matching of skills → industry roles  
- 📚 Academic performance analysis  
- 🎯 Personalized career insights  
- 💬 Simple web interface to interact with the AI

---

### 🏗️ Tech Stack
**Backend:** FastAPI, Python, FAISS, Sentence-Transformers  
**Frontend:** HTML, CSS, JavaScript  
**Deployment:** Localhost (for demo)  
**Version Control:** Git + GitHub  

---

### ⚙️ How to Run Locally
#### 1️⃣ Backend Setup
```bash
cd app
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

  