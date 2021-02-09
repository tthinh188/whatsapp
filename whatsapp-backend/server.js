// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import Cors from 'cors';
// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1152775",
    key: "855fdfb3f2c5722bc233",
    secret: "a14ec2fd5f97570d74c3",
    cluster: "us2",
    useTLS: true
  });

// middleware
app.use(express.json());

app.use(Cors());

// Db config
const connection_URL = 'mongodb+srv://admin:zAevEq4JofonF2V9@cluster0.thgp8.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connection");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("changing occurs: ",change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                sender: messageDetails.sender
            });
        }
        else{
            console.log("error trigger pusher");
        }
    })

   
});
// 

// api routes 
app.get('/', (req,res) => res.status(200).send('hello word'));

app.get('/messages/sync', (req,res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`Listening to localhost:${port}`));