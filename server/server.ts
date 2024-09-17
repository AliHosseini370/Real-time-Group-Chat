import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { Server } from 'socket.io'
import { Message, IMessage } from './models/messageModel'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes'


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true 
    }
})
app.use(express.json())
app.use(cors())
app.use('/api/', userRoutes)

io.on('connection', (socket) => {
    console.log('New User Connected ! : ', socket.id)

    //Handle Joining A Room
    socket.on('joinRoom', ({room}) => {
        socket.join(room)
        console.log(`User ${socket.id} joined room: ${room}`)
    })

    //Handle Incomming Messages
    socket.on('chatMessage', async ({room, message, sender}) => {
        try {
            //Submit Message To The Room
            io.to(room).emit('chatMessage', { message, sender })

            //save message to db
            const newMessage: IMessage = await Message.create({room, message, sender})
        } catch (error: any) {
            console.log({error: error.message})
        }
    })

    //Handle User Disconnect
    socket.on('disconnect', () => {
        console.log('User Disconnected: ', socket.id)
    })
})


mongoose.connect(process.env.MONGO_URI as string)
    .then( () => {
        server.listen(process.env.PORT, () => {
            console.log('Connected TO DB And Listening To Port :',process.env.PORT)
        })
    })
    .catch((error: any) => {
        console.log(error)
    })