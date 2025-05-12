"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await db_1.default.user.findUnique({
        where: { email }
    });
    if (userExist) {
        return res.status(404).json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await db_1.default.user.create({
        data: { name, email, password: hashedPassword }
    });
    return res.status(201).json(user);
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await db_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!user.password) {
        return res.status(404).json({ message: "NO password set for this user" });
    }
    const ismatch = bcryptjs_1.default.compare(password, user.password);
    if (!ismatch) {
        return res.status(401).json({ message: "Incorrect Password" });
    }
    return res.json(user);
};
exports.loginUser = loginUser;
