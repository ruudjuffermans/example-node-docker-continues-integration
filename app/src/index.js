import express from "express";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";
import student from "./model.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// // Sequelize setup
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    port: process.env.DB_PORT,
  }
);

// Sync the models with the database
sequelize.sync().then(() => {
  console.log("Database is synchronized.");
});

const Student = student(sequelize);

app.use(express.json());
app.use(bodyParser.json());
app.set("json spaces", 4);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// // GET route to retrieve messages from the database
app.get("/student", async (req, res) => {
  try {
    const messages = await Student.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // POST route to add a new message to the database
app.get("/student/push", async (req, res) => {
  try {
    const newMessage = await Student.create({ text: "new student" });
    res
      .status(201)
      .json({ message: "Message added", messageId: newMessage.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to return all environment variables
app.get("/env", (req, res) => {
  res.json(process.env);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
