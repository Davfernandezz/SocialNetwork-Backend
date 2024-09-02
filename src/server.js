import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import { dbConnection } from './database/db.js';
import router from './router.js';

const app = express();

//CORS
app.use(cors())

app.use(express.json())

const PORT = process.env.PORT

app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});

app.use('/api', router)

dbConnection()
    .then(() => {
        console.log('Database Connected');
        app.listen(PORT, () => {
            console.log(`Server running ${PORT}`);
        });
    })
    .catch(error => {
        console.log('Error conecction database: ' + error.message);
    })