import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    sender: Boolean
});

export default mongoose.model('messagecontents', whatsappSchema)