export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            res.status(400).json({ errors: err.errors });
        }
    };
};
