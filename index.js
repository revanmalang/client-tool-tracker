import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AssignedAssest from "./Models/AssignedAssits.js";
import Location from "./Models/Location.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  console.log(path.join(__dirname, "dist", "index.html"));
  res.sendFile(path.join(__dirname, "dist", "index.html"), (err) => {
    if (err) console.log("Error line No. 56", err);
  });
});

app.get("/assets/findall", async (req, res) => {
  try {
    console.log("Hi");
    const assignedAssests = await AssignedAssest.find();
    console.log(assignedAssests);
    res.status(200).json(assignedAssests);
  } catch (err) {
    console.error("Error retrieving records:", err);
    res.status(400).json("Server Error");
  }
});

app.get("/assets/find-by-category/:category/:value", async (req, res) => {
  const category = req.params.category;
  const value = req.params.value.toUpperCase();
  console.log(category, value, req.params);
  let assignedAssests;
  try {
    if (category === "LOCATION") {
      console.log("1");
      assignedAssests = await AssignedAssest.find({ location: value });
    } else if (category === "ASSET_CATEGORY") {
      console.log("2");
      assignedAssests = await AssignedAssest.find({ asset_category: value });
    } else if (category === "PROJECT") {
      console.log("Hi");
      assignedAssests = await AssignedAssest.find({ project: value });
    } else if (category === "NAME") {
      console.log("4");
      assignedAssests = await AssignedAssest.find({ name: value });
    }
    console.log(assignedAssests);
    res.status(200).json(assignedAssests);
  } catch (err) {
    res.json("Server Error");
    console.log(err);
  }
});

app.post("/assets/add", async (req, res) => {
  console.log(req.body.asset);
  let { name, cdsid, location, assetType ,assetCategory, assetId, project } =
    req.body.asset;
  name = name.toUpperCase();
  location = location.toUpperCase();
  assetCategory = assetCategory.toUpperCase();
  project = project.toUpperCase();
  assetType.toUpperCase();

  try {
    const assignedAssest = new AssignedAssest({
      name,
      cdsid,
      location,
      asset_type : assetType,
      asset_category: assetCategory,
      asset_id: assetId,
      project,
    });

    await assignedAssest.save();
    res.status(201).json("Post Created");
  } catch (err) {
    console.error("Error creating a record:", err);
    res.status(400).json("Server Error");
  }
});

app.get("/location", async (req, res) => {
  try {
    const data = await Location.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json("Server Error");
  }
});

// app.get("/asset_category" ,async (req,res) =>{

// })

// app.get("/projects" , async (req,res)=>{

// })

mongoose
  .connect(
    "mongodb+srv://kush:Laltain100@cluster0.u5wrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB Error", err);
  });
