import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './mongodb/connect.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import companyRoutes from './routes/company.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const staticFilesPath = path.join(__dirname, '../client/build');
app.use(express.static(staticFilesPath));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.tsx'));
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
