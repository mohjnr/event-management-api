require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/events');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Use routes
app.use('/api', eventRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



