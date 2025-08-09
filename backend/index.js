const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/evenRoutes");
const betRoutes = require("./routes/betRoutes");
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended : true}));
app.use(express.static("uploads"))
app.use(bodyParser.json());
app.use(cors(
    {
        origin : "*",
        // origin: "http://localhost:5173", // Allow all origins
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204 // For legacy browser support
    }
));


//Connect to MongoDB
(async function connectDb(){
    try {
        await mongoose.connect("mongodb://localhost:27017/option_Betting");
        console.log("Connected to MongoDB successfully");
    } catch(error){
        console.log("Error to Connecting to MongoDB:", error);
    }
})();

app.use("/api/auth",authRoutes);
app.use("/api/forget-password",otpRoutes);
app.use("/api/profile",userRoutes);
app.use("/api/admin",eventRoutes);
app.use("/api/bet",betRoutes);


app.get("/",(req,res)=>{
    console.log("Hello server is running")
})

app.listen(PORT, () =>{
    console.log(`Server is runing on port ${PORT}`)
})