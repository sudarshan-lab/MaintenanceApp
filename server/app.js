// index.js

const express = require('express');
const cors = require('cors');
const db = require('./Connection');
const MaintenanceRequest = require('./Models/MaintenanceRequests');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/maintenance', async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/maintenance', async (req, res) => {
  try {
    const newRequest = new MaintenanceRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/maintenance/:reqId', async (req, res) => {
  try {
    const { reqId } = req.params;
    const updatedRequest = await MaintenanceRequest.findOneAndUpdate(
      { reqId: parseInt(reqId) },
      req.body,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error('Error updating maintenance request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/maintenance/:reqId', async (req, res) => {
  try {
    const { reqId } = req.params;
    const deletedRequest = await MaintenanceRequest.findOneAndDelete({ reqId: parseInt(reqId) });

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;