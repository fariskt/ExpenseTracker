var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExist = yield prisma.user.findUnique({
        where: { email },
    });
    if (userExist) {
        return res.status(404).json({ message: "User already exists" });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = yield prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
    return res.status(201).json(user);
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (!user.password) {
        return res.status(404).json({ message: "NO password set for this user" });
    }
    const ismatch = bcrypt.compare(password, user.password);
    if (!ismatch) {
        return res.status(401).json({ message: "Incorrect Password" });
    }
    const accessToken = generateToken({ id: user.id });
    res.cookie("token", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    });
    return res.json(user);
});
export const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    if (!userId) {
        return res.status(404).json({ message: "Userid not found" });
    }
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    return res
        .status(200)
        .json({ message: "User data fetched successfully", user });
});
