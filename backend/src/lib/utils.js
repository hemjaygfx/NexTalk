import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured properly.");
    } 

    //create token
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // prevent client side js from accessing the cookie - cross-site scripting attacks
        sameSite: "strict", // prevent CSRF attacks - cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" ? false : true, // only send cookie over https in production
    });

    return token;
};
