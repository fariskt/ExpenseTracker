"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticate = (req, // 👈 use standard Request here
res, next) => {
    const token = req.cookies.token;
    console.log("eee", token);
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("ishannnnn ", decoded);
        if (typeof decoded === "string" || !decoded.id) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        // 👇 type assertion here to assign custom property
        req.user = { userId: decoded.id };
        next();
    }
    catch (err) {
        res.status(401).json({ message: `Invalid or expired token`, error: err });
        return;
    }
};
exports.isAuthenticate = isAuthenticate;
