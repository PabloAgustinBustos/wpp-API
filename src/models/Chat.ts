import mongoose, { SchemaTypes } from "mongoose";


const Chat = new mongoose.Schema({
  id: {
    type: SchemaTypes.UUID,
    default: () => new mongoose.Types.UUID(),
  },

  participants: [SchemaTypes.String],

  lastMessage: new mongoose.Schema({
    message: String,
    author: String,
  })
})

export default mongoose.model("Chat", Chat, "chats");