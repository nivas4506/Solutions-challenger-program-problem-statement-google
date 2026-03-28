require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(morgan('dev')); // Request logging

// --- Microservice Routes Mapping ---

// 1. Dashboard & Analytics Service (e.g. stats, reports)
app.use('/api/dashboard', createProxyMiddleware({ 
    target: process.env.DASHBOARD_SVC_URL || 'http://localhost:3001', 
    changeOrigin: true,
    pathRewrite: { '^/api/dashboard': '' }
}));

// 2. Media Ingestion Service (e.g. uploading streams for analysis)
app.use('/api/ingest', createProxyMiddleware({ 
    target: process.env.MEDIA_INGEST_URL || 'http://localhost:3002', 
    changeOrigin: true,
    pathRewrite: { '^/api/ingest': '' }
}));

// 3. Crawler Manager (e.g. fleet status)
app.use('/api/crawler', createProxyMiddleware({ 
    target: process.env.CRAWLER_MGR_URL || 'http://localhost:3003', 
    changeOrigin: true,
    pathRewrite: { '^/api/crawler': '' }
}));

// 4. Alert & Notification Service (e.g. querying live intercepts)
app.use('/api/alerts', createProxyMiddleware({ 
    target: process.env.ALERT_SVC_URL || 'http://localhost:3004', 
    changeOrigin: true,
    pathRewrite: { '^/api/alerts': '' }
}));

// Fallback Route / Health check for API Gateway itself
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'API Gateway', timestamp: new Date().toISOString() });
});

// Start Gateway
app.listen(PORT, () => {
    console.log(`🚀 API Gateway is running on http://localhost:${PORT}`);
    console.log(`Proxying active to microservices...`);
});
