
export const isAdmin = (req, res, next) => {
    try {
        if (req.tokenData.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "You are not allowed",
            error: error.message,
        });
    }
};

