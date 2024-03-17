import dotenv from "dotenv"
dotenv.config()
import express from "express";
import path from "path";
import session from 'express-session';
import rateLimit from "express-rate-limit";
import cors from 'cors';
import DB from "./config/db";
import { Server } from 'socket.io';
import crypto from 'crypto';
import multer from 'multer';
import fs from 'fs';
const port = process.env.PORT
const app = express();
const store = new session.MemoryStore()

//Connect to db
DB()

// Session
const secret = crypto.randomBytes(32).toString('hex');
const SessionInfos = {
    secret,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    saveUninitialized: false,
    store
}
app.use(session(SessionInfos))

// Limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour
    max: 500 * 100 * 100 
});

app.use(limiter);

// Multer
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, './appImages/')
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const remove = (fileName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, './appImages/', fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Middleware
app.use((req: any, res: any, next: any): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    let sess = req.session.sessionInfos ? req.session.sessionInfos._id : req.session.sessionInfos; 

    console.log("-".repeat(50) + "\n"
                + "Methode : " + req.method + "\n"
                + "URL : " + req.url + "\n"
                + "Session : " + sess + "\n"
                + "-".repeat(50) + "\n")
    next();
});

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/appImages', express.static(path.join(__dirname, 'appImages')));

app.use("/utilisateurs", require("./routes/utilisateurs.routes"));
app.use("/communautes", require("./routes/communautes.routes"));
app.use('/chatRooms', require('./routes/chatRooms.routes'));
app.use("/chats", require("./routes/chats.routes"));
app.use("/categories", require("./routes/categories.routes"));
app.use("/materiels", require("./routes/materiels.routes"));
app.use("/services", require("./routes/services.routes"));
app.use('/session', (req: any, res: any): void => {
    try{
        if (req.session.sessionInfos) {
            res.status(200).json({ loggedIn: true, userId: req.session.sessionInfos});
          } else {
            res.status(401).json({ loggedIn: false, userId: null});
          }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.use('/logout', (req: any, res: any): void => {
    if(req.session.sessionInfos){
        req.session.destroy();
        res.sendStatus(200).json({ loggedIn: false, userId: null});
    } else {
        res.sendStatus(401);
    }
})
app.post('/uploadImg', upload.single('file'), (req, res) => {
  res.sendStatus(200);
});
app.delete('/deleteImg/:file', async (req: any, res: any) => {
    try {
        const fileName = req.params.file;
        await remove(fileName);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Cors
const corsOptions = {
    origin: "http:localhost:8081",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Server
const server = app.listen(port);

// Socket.io
const io = new Server(server, {
    cors: {
        credentials: true
    }
});

io.on('connection', (socket: any): void => {
    // Messagerie
    socket.on('joinRoom', (room: any): void => {
        socket.join(room);
        socket.emit('roomJoined', (room))
    })

    socket.on('isWriting', (data: string) => {
        socket.broadcast.emit('showWriting', (data))
    })

    socket.on('message', (room: any, message: any): void => {
        io.to(room).emit('messageReceived');
    })

    // Profil
    socket.on('updateUser', (): void => {
        socket.emit('userUpdated');
        console.log("User updated")
    })

    socket.on('search', (search: string): void => {
        console.log("Search : " + search);
        socket.emit('searchResult', (search));
    })
})

export default app;