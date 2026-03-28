# 🛡️ NexusProtect: Universal Digital Asset Protection Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Microservices-Python-3776AB?logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Infrastructure-Docker-2496ED?logo=docker)](https://www.docker.com/)

**NexusProtect** is a premium, high-performance platform designed to safeguard digital intellectual property at a global scale. From independent creators and music labels to major film studios and broadcasters, NexusProtect identifies, fingerprints, and shuts down unauthorized content distribution in real-time.

---

## 📽️ Project Overview

<video src="https://github.com/nivas4506/Solutions-challenger-program-problem-statement-google/raw/master/Digital_Asset_Protection_202603282156.mp4" width="100%" controls></video>

> [!TIP]
> *If the video doesn't play directly in your browser, you can view it here: [Watch Video](Digital_Asset_Protection_202603282156.mp4)*

---

## ✨ Key Features

- **🚀 Real-Time Ingestion**: High-speed ingestion of films, audio, gaming media, and live streams.
- **🏷️ Forensic Watermarking**: Invisible, resilient steganographic watermarks that survive re-encoding and compression.
- **🔍 Distributed Crawling**: A global fleet of automated crawlers scanning social media, pirate sites, and file-sharing platforms.
- **⚡ Automated Enforcement**: Instant DMCA takedown filing triggered by high-confidence fingerprint matches.
- **📊 Premium Dashboard**: Advanced analytics with glassmorphism UI, real-time threat maps, and revenue recovery tracking.

---

## 🛠️ Tech Stack

### **Frontend & UI/UX**
- **React 18** + **Vite** (Ultra-fast HMR)
- **Vanilla CSS Architecture** (Custom premium design system)
- **Glassmorphism & Parallax** (Ultra-smooth visual identity)
- **Lucide Icons** (Clean, consistent iconography)
- **useAnimations Hooks** (Custom scroll-reveal and particle logic)

### **API & Orchestration**
- **Node.js Gateway**: Centralized API routing with `http-proxy-middleware`.
- **Kafka Cluster**: High-throughput message bus for inter-service communication.
- **Docker Compose**: Seamless local orchestration of the entire microservice fleet.

### **Microservices Architecture**
- **Media Ingestion**: FastAPI (Python) for asset storage and metadata extraction.
- **Watermarking Service**: Python-based steganography engine.
- **Fingerprinting Engine**: Distributed perceptual hashing.
- **Crawler Manager**: Node.js manager for coordinating global search fleets.
- **Threat Detection**: AI-driven analysis of intercepted content.

### **Data & Storage**
- **MinIO / S3**: Distributed object storage for raw and watermarked media.
- **SQLAlchemy / PostgreSQL**: Enterprise-grade metadata and violation tracking.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nivas4506/Solutions-challenger-program-problem-statement-google.git
cd Solutions-challenger-program-problem-statement-google
```

### 2. Start Infrastructure
Ensure you have Docker and Docker Compose installed:
```bash
docker-compose up -d
```

### 3. Launch Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Start API Gateway
```bash
cd api-gateway
npm install
node index.js
```

---

## 🏗️ Architecture Diagram

NexusProtect follows a decoupled, cloud-native microservices architecture:

1. **Ingestion** (API Gateway → Ingestion Svc → S3)
2. **Protection** (Kafka → Watermarking Svc → Fingerprinting Svc)
3. **Detection** (Crawler Fleet → Detection Engine → Alert Svc)
4. **Resolution** (Dashboard UI → Automated DMCA Actions)

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for Digital Rights Holders Worldwide
</p>
