require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("Failed to connect to MongoDB Atlas", e);
  }
}

connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const collection = client.db("users&recipes").collection("recipes");
    const recipes = await collection.find({}).toArray();
    res.json(recipes);
  } catch (e) {
    res.status(500).send(e);
  }
});

// API endpoint to upload recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = req.body;
    const collection = client.db("users&recipes").collection("recipes");
    await collection.insertOne(recipe);
    res.status(201).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    try {
        const user = req.body; 
        const collection = client.db("users&recipes").collection("users");
    
        // Check if user already exists
        const existingUser = await collection.findOne({ email: user.email });
        if (existingUser) {
            return res.status(409).send('Email already in use');
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    
        // Insert the user into the database
        await collection.insertOne(user);
        console.log("User created successfully", user);
        res.status(201).send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body; 

        const collection = client.db("users&recipes").collection("users");

        // Check if user exists
        const existingUser = await collection.findOne({ email: email });

        if (!existingUser) {
            return res.status(401).send('Incorrect email or password');
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).send('Incorrect email or password');
        }

        // Generate an access token
        const accessToken = jwt.sign({ username: existingUser.username }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken });
    } catch (e) {
        console.error("Login error:", e); // Detailed error logging
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/home/home.html`);
});
