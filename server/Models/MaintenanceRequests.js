

const mongoose = require('mongoose');
const Counter = require('./Counter');

const maintenanceRequestSchema = new mongoose.Schema({
    reqId: { type: Number, unique: true },
    room: { type: String, required: true },
    by: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    date: { type: Date, default: Date.now }
});


maintenanceRequestSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'maintenanceReqId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }  
        );
        doc.reqId = counter.seq;
    }
    next();
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
