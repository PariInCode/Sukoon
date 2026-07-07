const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors=require("cors")
const connectDB = require("./config/db");
const moodRoutes = require("./routes/moodRoutes");
const postRoutes = require("./routes/postRoutes");
const aichatRoutes = require("./routes/aichatroutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");




dotenv.config()
connectDB()


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("heheh its working")
});
app.use("/api/posts", postRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aichatRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


