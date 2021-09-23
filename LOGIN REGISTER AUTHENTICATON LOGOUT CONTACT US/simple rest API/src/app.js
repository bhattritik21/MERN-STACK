const express = require('express');
const env = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;
// const bodyParser = require('body-parser');
require('./db');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//environment variable or you can say constants
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8pl1w.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
//     {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     }
// ).then(() => {
//     console.log('Database connected');
// });

// app.use(bodyParser());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});