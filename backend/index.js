const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true  
  }))

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/workspace', workspaceRoutes);
app.listen(5001, () => console.log('Server running on port 5001'));