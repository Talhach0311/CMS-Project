
const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.redirect('/admin/dashboard')
    }

}

export default isAdmin;