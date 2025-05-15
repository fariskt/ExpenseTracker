import jwt from "jsonwebtoken";
export const isAuthenticate = (req, // 👈 use standard Request here
res, next) => {
    const token = req.cookies.token;
    console.log("eee", token);
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
