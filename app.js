import express from "express"
import path from "path"
import dotenv from "dotenv"
import flash from "connect-flash"
import expressLayouts from "express-ejs-layouts"
import cookieParser from "cookie-parser"
import Setting from "./src/model/settings.js"

const app = express()

dotenv.config()

// Database
import connectDB from "./src/config/db.js"
connectDB()

app.use(async (req, res, next) => {
    try {
        const setting = await Setting.findOne();

        res.locals.setting = setting;

        next();
    } catch (error) {
        console.log(error);
        next();
    }
});

app.use(cookieParser(process.env.SESSION_SECRET))

// Flash
app.use(flash())

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static
app.use(express.static(path.join(process.cwd(), "src", "public")))

// EJS Layout
app.use(expressLayouts)

// EJS View Engine
app.set("views", path.join(process.cwd(), "src", "views"))
app.set("view engine", "ejs")

// Frontend Routes
import frontendRoute from "./src/route/frontendRoutes.js"
app.use("/", frontendRoute)

// Admin Routes
import adminRoutes from "./src/route/adminRoutes.js"
app.use("/admin", adminRoutes)

app.use((req,res) => {
    res.status(404).render("404", {
        layout: false,
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})