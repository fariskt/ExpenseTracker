var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from "../config/db";
export const getUserGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const goals = yield prisma.goal.findMany({ where: { userId } });
    if (!goals) {
        return res.status(404).json({ message: "Goals not found" });
    }
    return res.status(200).json({ message: "Goals fetched successfully", goals });
});
export const createGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { deadline } = _a, rest = __rest(_a, ["deadline"]);
    const { userId } = req.user;
    if (!deadline) {
        return res.status(404).json({ message: "Please provide a deadline" });
    }
    const newGoal = yield prisma.goal.create({
        data: Object.assign({ userId, deadline: new Date(deadline) }, rest),
    });
    return res
        .status(201)
        .json({ message: "Goal created succesfully", data: newGoal });
});
