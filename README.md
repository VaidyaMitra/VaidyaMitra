# 🏥 VaidyaMitra — Privacy-First Clinical Intelligence Platform

> AI-powered healthcare decision-support for Bharat 🇮🇳 — Making quality clinical intelligence accessible, affordable, and privacy-compliant.

![Made for Bharat](https://img.shields.io/badge/Made%20for-Bharat%20🇮🇳-orange)
![Privacy First](https://img.shields.io/badge/Privacy-First%20🔒-green)
![AI Powered](https://img.shields.io/badge/AI-Powered%20🤖-blue)
![Meta Llama 3](https://img.shields.io/badge/Meta%20Llama%203-AWS%20Bedrock-purple)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [AWS EC2 Deployment](#-aws-ec2-deployment)
- [Environment Variables](#-environment-variables)
- [Privacy & Security](#-privacy--security)
- [Screenshots](#-screenshots)

---

## Overview

**VaidyaMitra** is a privacy-preserving clinical intelligence system designed to improve doctor efficiency during consultations. The system acts as a decision-support assistant that processes clinical information while maintaining strict privacy standards through mandatory PII/PHI masking before any AI processing.

**Key Principles:**
- 🔒 **Privacy-First** — All PII/PHI is detected and masked (Aadhaar, PAN, phone, email) before any data reaches the AI model
- 🤖 **Real AI Reasoning** — AWS Bedrock with Meta Llama 3 for clinical intelligence, not rule-based
- 💊 **Jan Aushadhi Integration** — Affordable generic medicine alternatives from PMBJP catalog (50+ medicines)
- 🌐 **Multilingual** — 9 Indian languages + English with AI-powered translation
- 🎤 **Voice-Enabled** — Speak queries in any supported language, get AI responses
- 📊 **Agentic AI** — Intent-aware orchestrator routes queries to specialized sub-agents

> ⚠️ **Disclaimer:** VaidyaMitra is strictly a decision-support tool. It does NOT provide diagnosis or treatment recommendations.

---

## ✨ Features

| Module | Description | Key Capabilities |
|--------|-------------|-----------------|
| **🔐 DataGuard Privacy** | MS Presidio + regex-based PII/PHI masking | Text, image, PDF, and JSON scrubbing; Aadhaar/PAN detection; audit logging |
| **👤 Patient Management** | Full patient lifecycle | VM-ID generation, Aadhaar verification, visit tracking, profile management |
| **📋 Clinical Data** | Comprehensive clinical intake | Vitals, complaints, assessments, AI-powered clinical summaries |
| **📄 Report Simplifier** | AI medical report translation | Complex jargon → Grade 6 readability; PDF/image OCR; multi-format support |
| **🔬 Disease Predictor** | Symptom-based risk assessment | 60+ conditions; Medicure ML patterns + AI reasoning; recommended tests |
| **💊 Jan Aushadhi Engine** | Affordable generic alternatives | PMBJP catalog search; price comparison; savings calculation; image recognition |
| **🧪 Medicine Identifier** | Drug identification & comparison | Branded vs generic lookup; AI-powered image identification; drug info |
| **🎤 Voice Query** | Multilingual voice interface | 9 Indian languages; speech-to-text; AI response; text-to-speech |
| **🤖 AI Query (RAG)** | Agentic clinical assistant | Intent classification; RAG-grounded responses; context-aware orchestration |
| **🌐 Multilingual** | Translation & localization | Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi |

---

## 🏗️ Tech Stack

### Backend
| Component | Technology |
|-----------|-----------|
| **Framework** | FastAPI (Python 3.11) with Uvicorn ASGI server |
| **AI Model** | AWS Bedrock — Meta Llama 3 8B Instruct |
| **Embeddings** | Amazon Titan Embed Text v2 (RAG) |
| **Database** | AWS DynamoDB (patients, visits, summaries, predictions, cache) |
| **Storage** | AWS S3 (uploaded reports, medical documents) |
| **Privacy** | Microsoft Presidio + custom regex (Aadhaar, PAN patterns) |
| **OCR** | PyMuPDF + OpenCV preprocessing + Pytesseract |
| **Translation** | AI-powered via Bedrock + medical phrase fallback |
| **Caching** | DynamoDB-backed + in-memory LRU (configurable TTLs) |
| **Middleware** | Rate limiter, audit logger, CORS, error handler |

### Frontend
| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 15 (React 19, App Router) |
| **Styling** | Tailwind CSS 4 |
| **Language** | TypeScript |
| **Theme** | Dark/Light mode with CSS variables |

### Infrastructure
| Component | Technology |
|-----------|-----------|
| **Deployment** | AWS EC2 with Docker Compose |
| **Reverse Proxy** | Nginx |
| **Serverless** | AWS SAM template (Lambda + API Gateway) |
| **Lambda Adapter** | Mangum (FastAPI → Lambda) |
| **Containerization** | Docker multi-stage builds |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│   Next.js 15 Frontend (React 19 + Tailwind CSS)                │
│   Dashboard │ Patients │ Clinical │ Reports │ Predict │ Voice  │
│   Medicine  │ Identify │ AI Query │ Records                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────┴──────────────────────────────────────┐
│                      NGINX REVERSE PROXY                        │
│              / → Frontend :3000  │  /api → Backend :8000        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────────┐
│                    MIDDLEWARE LAYER                              │
│         Rate Limiter → Audit Logger → Error Handler → CORS      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────────┐
│                 PRIVACY LAYER (CRITICAL FIRST STAGE)            │
│   MS Presidio + Custom Regex → PII/PHI Detection & Masking     │
│   Aadhaar │ PAN │ Phone │ Email │ Names │ MRN │ Address        │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Anonymized Data Only
┌──────────────────────────┴──────────────────────────────────────┐
│                   APPLICATION LAYER (FastAPI)                    │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │ Patient Mgmt │  │ Clinical Data│  │ Report Simplifier  │     │
│  └─────────────┘  └──────────────┘  └────────────────────┘     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │Disease Pred. │  │Jan Aushadhi  │  │Medicine Identifier │     │
│  └─────────────┘  └──────────────┘  └────────────────────┘     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │ Voice Query  │  │ Translation  │  │ Agentic Orchestrator│    │
│  └─────────────┘  └──────────────┘  └────────────────────┘     │
│                                                                  │
└──────────────┬────────────────┬────────────────┬────────────────┘
               │                │                │
┌──────────────┴──┐  ┌─────────┴──────┐  ┌─────┴────────────────┐
│  AWS Bedrock     │  │ AWS DynamoDB   │  │ AWS S3               │
│  Meta Llama 3    │  │ 7 Tables +     │  │ Reports & Documents  │
│  + Titan Embed   │  │ Cache Layer    │  │                      │
└─────────────────┘  └────────────────┘  └──────────────────────┘
```

**Data Flow:** Raw Data → Privacy Layer (PII/PHI masking) → AI Processing → Structured Response

---

## 📁 Project Structure

```
VAIDYAMITRA/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   └── orchestrator.py       # Agentic AI orchestrator (intent → sub-agent routing)
│   │   ├── api/
│   │   │   ├── routes.py             # All 35+ REST API endpoints
│   │   │   └── models.py             # Shared API request/response models
│   │   ├── core/
│   │   │   ├── config.py             # Pydantic settings (env vars)
│   │   │   ├── dynamodb_client.py    # DynamoDB operations (7 tables)
│   │   │   ├── s3_client.py          # S3 document storage
│   │   │   └── cache_client.py       # DynamoDB-backed + LRU caching
│   │   ├── data/
│   │   │   └── pmbjp_list.csv        # Jan Aushadhi medicine catalog
│   │   ├── lambdas/
│   │   │   ├── report_pipeline.py    # PDF/image OCR pipeline
│   │   │   ├── cv2_utils.py          # OpenCV image preprocessing
│   │   │   └── clinical_normalizer.py# Clinical data normalization
│   │   ├── middleware/
│   │   │   ├── rate_limiter.py       # Request rate limiting
│   │   │   ├── audit_logger.py       # Request audit logging
│   │   │   └── error_handler.py      # Global error handling
│   │   ├── models/
│   │   │   ├── patient_models.py     # Patient & visit Pydantic models
│   │   │   ├── clinical.py           # Clinical data models
│   │   │   ├── ai_models.py          # AI response models
│   │   │   ├── drug_models.py        # Medicine/drug models
│   │   │   └── privacy.py            # Privacy event models
│   │   ├── services/
│   │   │   ├── privacy_layer.py      # PII/PHI detection & masking (Presidio + regex)
│   │   │   ├── bedrock_client.py     # AWS Bedrock AI client (Llama 3 + mock mode)
│   │   │   ├── patient_service.py    # Patient CRUD operations
│   │   │   ├── summary_generator.py  # AI clinical summaries
│   │   │   ├── change_detector.py    # Visit-to-visit change detection
│   │   │   ├── disease_predictor.py  # Symptom-based prediction (60+ conditions)
│   │   │   ├── generic_medicine_engine.py # Jan Aushadhi generic search
│   │   │   ├── medicine_identifier.py# Drug identification & comparison
│   │   │   ├── report_simplifier.py  # Medical report simplification
│   │   │   ├── translation_service.py# Multilingual translation (10 languages)
│   │   │   ├── rag_service.py        # RAG embedding & retrieval
│   │   │   ├── dataguard_service.py  # DataGuard scrubbing service
│   │   │   ├── pmbjp_catalog.py      # PMBJP CSV catalog loader
│   │   │   └── prompt_templates.py   # AI prompt templates
│   │   └── main.py                   # FastAPI app entry point
│   ├── lambda_handler.py             # AWS Lambda adapter (Mangum)
│   ├── requirements.txt              # Python dependencies
│   ├── Dockerfile                    # Backend container
│   └── .env                          # Environment config (gitignored)
├── frontend/
│   ├── src/
│   │   ├── app/                      # Next.js pages
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── patients/page.tsx     # Patient Management
│   │   │   ├── clinical/page.tsx     # Clinical Data Entry
│   │   │   ├── records/page.tsx      # Medical Records Viewer
│   │   │   ├── reports/page.tsx      # Report Simplifier
│   │   │   ├── predict/page.tsx      # Disease Prediction
│   │   │   ├── medicine/page.tsx     # Jan Aushadhi Search
│   │   │   ├── identify/page.tsx     # Medicine Identifier
│   │   │   ├── voice/page.tsx        # Voice Query
│   │   │   ├── query/page.tsx        # AI Query (RAG)
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── globals.css           # Global styles + CSS variables
│   │   ├── components/
│   │   │   └── Sidebar.tsx           # Navigation sidebar
│   │   └── lib/
│   │       ├── api.ts                # API client (Axios)
│   │       ├── ThemeProvider.tsx      # Dark/light mode context
│   │       └── styles.ts             # Shared Tailwind utilities
│   ├── package.json
│   ├── tailwind.config.ts
│   └── Dockerfile                    # Frontend container
├── aws/
│   └── template.yaml                 # SAM template (Lambda + DynamoDB + S3)
├── nginx/
│   └── nginx.conf                    # Reverse proxy config
├── docker-compose.yml                # Full-stack deployment
├── deploy.sh                         # EC2 deployment script
├── requirements.md                   # Formal requirements document
├── design.md                         # System design document
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

All endpoints are under `/api/v1/`. Full interactive docs available at `/api/docs` (Swagger UI).

### Health & Info
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root — system info & feature list |
| `GET` | `/api/v1/health` | Health check (AI, DynamoDB, S3, Privacy Layer status) |
| `GET` | `/api/v1/languages` | List supported languages |
| `GET` | `/api/v1/languages/{lang}/ui` | Get UI strings for a language |

### Patient Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/patients/register` | Register new patient (VM-ID assigned) |
| `GET` | `/api/v1/patients` | List all patients (with search) |
| `GET` | `/api/v1/patients/{patient_id}` | Get patient details |
| `PUT` | `/api/v1/patients/{patient_id}` | Update patient info |
| `POST` | `/api/v1/patients/{patient_id}/visits` | Add visit record |
| `GET` | `/api/v1/patients/{patient_id}/visits` | Get visit history |
| `GET` | `/api/v1/patients/{patient_id}/records` | Get EHR-style records |
| `GET` | `/api/v1/patients/{patient_id}/trends` | Get health trends |
| `GET` | `/api/v1/patients/{patient_id}/ai-summary` | AI clinical summary |

### Clinical Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/clinical-data` | Submit clinical data (privacy-masked) |

### Disease Prediction
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/predict-disease` | Predict diseases from symptoms |

### Generic Medicine (Jan Aushadhi)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/generic-medicine` | Find generic alternatives |
| `POST` | `/api/v1/generic-medicine/image` | Find generics from medicine image |

### AI Query (Agentic Orchestrator)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/query` | AI query with intent routing + RAG |

### Report Simplifier
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/simplify-report` | Simplify medical report (Grade 6) |
| `POST` | `/api/v1/summarize-report` | AI-structured summary |
| `POST` | `/api/v1/translate-report` | Translate report to Indian language |

### DataGuard Privacy
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/scrub/text` | Scrub PII from text |
| `POST` | `/api/v1/scrub/image` | Scrub PII from image (OCR + mask) |
| `POST` | `/api/v1/scrub/pdf` | Scrub PII from PDF |
| `POST` | `/api/v1/scrub/dict` | Scrub PII from JSON dictionary |

### Voice Query
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/voice-query` | Process voice query (multilingual) |

### Medicine Identifier
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/identify-medicine` | Identify medicine by name |
| `POST` | `/api/v1/identify-medicine/image` | Identify medicine from image |
| `POST` | `/api/v1/compare-medicine` | Compare branded vs generic |
| `GET` | `/api/v1/medicines` | List all medicines in catalog |
| `GET` | `/api/v1/medicines/search?q=` | Search medicines |

### File Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/upload-report` | Upload medical report (PDF/image) |
| `GET` | `/api/v1/upload-url` | Get presigned S3 upload URL |

### Translation
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/translate` | Translate text to target language |
| `POST` | `/api/v1/detect-language` | Detect language of text |

### Cache Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/cache/stats` | Cache performance statistics |
| `POST` | `/api/v1/cache/clear` | Clear cache (optional service filter) |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- AWS account with:
  - IAM credentials (Access Key + Secret Key)
  - Bedrock model access enabled (Meta Llama 3)
  - DynamoDB and S3 permissions

### Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate     # Linux/Mac
# venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your AWS credentials

# Run development server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
API Docs: `http://localhost:8000/api/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## ☁️ AWS EC2 Deployment

### Quick Deploy (Docker Compose)

```bash
# 1. SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# 2. Clone the repository
git clone https://github.com/YOUR_USERNAME/VAIDYAMITRA.git
cd VAIDYAMITRA

# 3. Configure environment
cp backend/.env.example backend/.env
nano backend/.env    # Add your AWS credentials

# 4. Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

The app will be available at `http://your-ec2-ip` (port 80).

### Manual Docker Compose

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### EC2 Security Group Rules

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 22 | TCP | Your IP | SSH access |
| 80 | TCP | 0.0.0.0/0 | HTTP (Nginx) |
| 443 | TCP | 0.0.0.0/0 | HTTPS (optional) |

---

## ⚙️ Environment Variables

Create `backend/.env` from the template. Key settings:

| Variable | Description | Default |
|----------|-------------|---------|
| `AWS_REGION` | AWS region | `ap-south-1` |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | *(required)* |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | *(required)* |
| `BEDROCK_MODEL_ID` | LLM model ID | `meta.llama3-8b-instruct-v1:0` |
| `BEDROCK_EMBEDDING_MODEL_ID` | Embedding model | `amazon.titan-embed-text-v2:0` |
| `BEDROCK_REGION` | Bedrock region | `ap-south-1` |
| `DYNAMODB_TABLE_PREFIX` | DynamoDB table prefix | `vaidyamitra_` |
| `S3_BUCKET_NAME` | S3 bucket for reports | `vaidyamitra-data` |
| `CORS_ORIGINS` | Allowed frontend origins | `http://localhost:3000` |
| `AI_MODE` | AI mode (`auto`/`bedrock`/`mock`) | `auto` |
| `PRESIDIO_CONFIDENCE_THRESHOLD` | PII detection threshold | `0.5` |
| `RATE_LIMIT_PER_MINUTE` | API rate limit | `60` |
| `CACHE_ENABLED` | Enable AI result caching | `true` |
| `LOG_LEVEL` | Logging level | `INFO` |

---

## 🛡️ Privacy & Security

VaidyaMitra follows a **privacy-first architecture** where all PII/PHI is masked before any AI processing:

1. **Mandatory Privacy Layer** — Every data flow passes through `PrivacyLayer.detect_and_mask()` before reaching any AI service
2. **Detected PII Types:** Aadhaar numbers, PAN numbers, phone numbers, email addresses, names, medical record numbers, addresses
3. **Dual Detection:** Microsoft Presidio (NLP-based) + custom regex patterns (Indian-specific: Aadhaar, PAN)
4. **Audit Logging** — Every masking operation is logged with entity types, confidence scores, and timestamps
5. **Consistent Tokenization** — Same PII always maps to the same token within a session
6. **Data Encryption** — DynamoDB and S3 encrypt data at rest; HTTPS for data in transit

---

## 📸 Screenshots

*Coming soon !!*

---

<p align="center">
  <b>VaidyaMitra</b> · AI-Powered · Privacy-First · Made for Bharat 🇮🇳
</p>
