import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import personRouter from './routes/person.js'
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';
import connectDB from './database.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4422;

const app = express();

console.log("Connecting to database....")
await connectDB();

// Middleware
app.use(express.json());

app.use(logger);

app.use('/api/persons', personRouter)

// Error handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on ${PORT}`))