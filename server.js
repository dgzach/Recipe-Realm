require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error(e);
  }
}

connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const collection = client.db("Project 0").collection("recipes");
    const recipes = await collection.find({}).toArray();
    res.json(recipes);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint for user registration
app.post('/api/register', async (req, res) => {
    try {
        const user = req.body; // User data from the request body
        const collection = client.db("Project 0").collection("users");
    
        // Check if user already exists
        const existingUser = await collection.findOne({ username: user.username });
        if (existingUser) {
        return res.status(409).send('User already exists');
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    
        // Insert the user into the database
        await collection.insertOne(user);
        res.status(201).send();
    } catch (e) {
        res.status(500).send(e.message);
    }
    });

// Endpoint for user login
app.post('/api/login', async (req, res) => {
  try {
    const user = req.body; // User data from the request body
    const collection = client.db("Project 0").collection("users");

    // Check if user exists
    const existingUser = await collection.findOne({ username: user.username });
    if (!existingUser) {
      return res.status(401).send('Incorrect username or password');
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect username or password');
    }

    // Generate an access token
    const accessToken = jwt.sign({ username: existingUser.username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } catch (e) {
    res.status(500).send(e.message);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
