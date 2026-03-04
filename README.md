# 🏥 VaidyaMitra — Privacy-First Clinical Intelligence Platform

> AI-powered healthcare for Bharat 🇮🇳 — Making quality clinical intelligence accessible, affordable, and privacy-compliant.

![Made for Bharat](https://img.shields.io/badge/Made%20for-Bharat%20🇮🇳-orange)
![Privacy First](https://img.shields.io/badge/Privacy-First%20🔒-green)
![AI Powered](https://img.shields.io/badge/AI-Powered%20🤖-blue)

---

## ✨ Features

| Module | Description |
|--------|-------------|
| **Patient Management** | Register patients with VM-IDs, Aadhaar verification, visit tracking |
| **Clinical Data Engine** | Comprehensive clinical intake with OCR auto-fill from lab reports |
| **DataGuard Privacy** | MS Presidio-based PII/PHI masking (Aadhaar, PAN, phone, email) before AI processing |
| **Report Simplifier** | Converts complex medical reports to Grade 6 readability |
| **Disease Predictor** | Symptom-based AI risk assessment for 60+ conditions |
| **Jan Aushadhi Engine** | Affordable generic medicine alternatives with savings calculation |
| **Medicine Identifier** | Identify and compare branded vs generic medicines |
| **Voice Query** | Speak in 9 Indian languages — AI responds with translation |
| **AI Query (RAG)** | Agentic RAG-grounded clinical assistant with context-aware responses |
| **Multilingual Support** | Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia + English |

---

## 🏗️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **AI Model**: AWS Bedrock — Meta Llama 3 (8B Instruct)
- **Embeddings**: Amazon Titan Embed Text v2
- **Database**: AWS DynamoDB
- **Storage**: AWS S3
- **Privacy**: Microsoft Presidio (PII/PHI detection & masking)
- **OCR**: AWS Textract + OpenCV preprocessing
- **Translation**: AWS Translate
- **TTS/STT**: AWS Polly / Transcribe

### Frontend
- **Framework**: Next.js 15 (React 19, App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

### Infrastructure
- **Deployment**: AWS SAM (Serverless Application Model)
- **Lambda Adapter**: Mangum (FastAPI → Lambda)

---

## 📁 Project Structure

```
VAIDYAMITRA/
├── backend/
│   ├── app/
│   │   ├── agents/          # AI orchestrator agent
│   │   ├── api/             # FastAPI routes & request models
│   │   ├── core/            # Config, DynamoDB, S3, cache clients
│   │   ├── data/            # PMBJP medicine catalog (CSV)
│   │   ├── lambdas/         # Lambda pipeline utilities (OCR, cv2)
│   │   ├── middleware/      # Audit logger, error handler, rate limiter
│   │   ├── models/          # Pydantic models (patient, clinical, AI, drugs, privacy)
│   │   ├── services/        # Core business logic (14 service modules)
│   │   └── main.py          # FastAPI app entry point
│   ├── lambda_handler.py    # AWS Lambda adapter (Mangum)
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Container build config
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages (dashboard, patients, clinical, etc.)
│   │   ├── components/      # Shared components (Sidebar)
│   │   └── lib/             # API client, theme provider, shared styles
│   ├── public/              # Static assets
│   ├── package.json
│   └── tailwind.config.ts
├── aws/
│   └── template.yaml        # SAM template (Lambda, API Gateway, DynamoDB, S3)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- AWS CLI configured with appropriate credentials
- AWS Bedrock access enabled for Meta Llama 3

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env   # Then edit with your AWS credentials

# Run development server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/` with the following:

| Variable | Description | Example |
|----------|-------------|---------|
| `AI_MODE` | AI provider mode | `bedrock` |
| `AWS_REGION_NAME` | AWS region | `ap-south-1` |
| `BEDROCK_MODEL_ID` | LLM model ID | `meta.llama3-8b-instruct-v1:0` |
| `BEDROCK_EMBEDDING_MODEL_ID` | Embedding model | `amazon.titan-embed-text-v2:0` |
| `DYNAMODB_TABLE_PREFIX` | DynamoDB table prefix | `vaidyamitra_` |
| `S3_BUCKET_NAME` | S3 bucket for reports | `vaidyamitra-data` |
| `FRONTEND_URL` | Frontend origin (CORS) | `http://localhost:3000` |

---

## 🛡️ Privacy & Security

- **All PII/PHI is masked** before any data reaches the AI model
- Aadhaar, PAN, phone numbers, emails, and medical record numbers are detected and redacted
- Privacy audit logs are maintained for every masking operation
- Data encryption at rest (DynamoDB, S3) and in transit (HTTPS)

---

## 📄 License

This project is developed as a healthcare innovation initiative for Bharat.

---

<p align="center">
  <b>VaidyaMitra</b> · AI-Powered · Privacy-First · Made for Bharat 🇮🇳
</p>
