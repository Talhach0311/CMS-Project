import jwt from 'jsonwebtoken'

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.redirect("/admin/")
        }

        const verifyUser = jwt.verify(token, process.env.JWT_sectret);

        req.user = verifyUser;
        res.locals.user = verifyUser

        next();
    } catch (error) {
        res.status(401).send("UnAuthorized Token");
    }
}


export default isAuth