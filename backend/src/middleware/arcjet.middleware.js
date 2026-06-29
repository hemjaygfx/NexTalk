import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            const reasonName = decision.reason?.name || decision.reason?.type || "unknown";
            console.log("Arcjet decision reason:", reasonName);

            if (reasonName.includes("RATE") || reasonName.includes("LIMIT")) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            if (decision.reason?.isBot?.()) {
                return res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            }
            return res.status(403).json({ message: "Access denied due to suspicious activity." });
        }

        next();
    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
};