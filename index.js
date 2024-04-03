import express from 'express';
const app = express();
import connectDB from "./db/connect.js";
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import passwordResetRouter from './routes/reset-password.js';
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import authenticationMiddleware from './middlewares/authentication.js';
import dotenv from 'dotenv';

dotenv.config();

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Mern Task Manager..");
    //res.json({message: `Connected to server 👍`});
})

app.use('/auth', authRouter);
app.use('/tasks', authenticationMiddleware, taskRouter);
app.use('/account', passwordResetRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5555

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
    console.log(`server is running on port ${port}...
    🚀@ http://localhost:${port}`)})
    } catch (error) {
        console.log(error)
    }
}
start()



/* 
 import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(8000, ()=> {
    console.log('app is running on port 8000')
})  */