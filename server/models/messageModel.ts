import mongoose from "mongoose";

interface IMessage {
    _id: string
    room: string,
    sender: string,
    message: string,
}

const messageSchema = new mongoose.Schema<IMessage> ({
    room: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)

export { Message, IMessage }