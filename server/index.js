const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./mongodb/connect.js');
const userRoutes = require('./routes/user.routes.js');
const productRoutes = require('./routes/product.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const companyRoutes = require('./routes/company.routes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})

app.use(express.static(path.join(__dirname, '../client/src')));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.tsx"));
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
