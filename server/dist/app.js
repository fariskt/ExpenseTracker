"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const expenseRoute_1 = __importDefault(require("./routes/expenseRoute"));
const goalRoute_1 = __importDefault(require("./routes/goalRoute"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://cashvio.vercel.app/", "http://localhost:5173"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api/users', userRoute_1.default);
app.use('/api/expenses', expenseRoute_1.default);
app.use('/api/goals', goalRoute_1.default);
exports.default = app;
