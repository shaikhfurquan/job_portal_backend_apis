import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000


//routes
app.get('/', (req, res)=>{
    res.json({
        messsage : "Welcome"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})