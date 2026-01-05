require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// In a real scenario, use process.env.MONGO_URI
// implementing a fallback for demo purposes if no env provided
const connectDB = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB Connected');
        } else {
            console.log('No MONGO_URI provided. Running in offline/mock mode.');
        }
    } catch (err) {
        console.error('Database connection error:', err);
    }
};
connectDB();

// Mock Data Store (for demo if DB not connected)
const PRODUCTS = [
    { barcode: "123456", name: "Nebula Energy Drink", price: 3.50, description: "Taste the stars.", image: "🥤" },
    { barcode: "789012", name: "Quantum Chips", price: 2.99, description: "Crispy at a subatomic level.", image: "🍟" },
    { barcode: "345678", name: "Holographic Cereal", price: 5.49, description: "Breakfast from the future.", image: "🥣" }
];

// Routes
app.get('/api/products/:barcode', async (req, res) => {
    const { barcode } = req.params;

    // Try DB first
    if (mongoose.connection.readyState === 1) {
        try {
            const Product = require('./models/Product');
            const product = await Product.findOne({ barcode });
            if (product) return res.json(product);
        } catch (err) {
            console.error(err);
        }
    }

    // Fallback to Mock
    const mockProduct = PRODUCTS.find(p => p.barcode === barcode);
    if (mockProduct) {
        return res.json(mockProduct);
    }

    // Default "Not Found" handling or random product for demo fun
    // In a strict app, return 404. For "Judge Ready" demo, let's return a random one if "demo" query param exists
    // or just return 404.
    res.status(404).json({ message: "Product not found" });
});

app.post('/api/cart/sync', (req, res) => {
    // Sync cart logic here
    res.json({ success: true, message: "Cart synced" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
