"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const complaints_1 = __importDefault(require("./routes/complaints"));
const admin_1 = __importDefault(require("./routes/admin"));
const community_1 = __importDefault(require("./routes/community"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        system: 'AI Civic Companion API Backend',
        version: '1.2.0',
        timestamp: new Date().toISOString()
    });
});
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/complaints', complaints_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/community', community_1.default);
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` AI Civic Companion Backend API running on port ${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
});
