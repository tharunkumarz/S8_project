import express from 'express';
import Bus from '../models/Bus';

const router = express.Router();

// GET all bus schedules
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching bus schedules', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// GET a specific bus schedule
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus schedule not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching bus schedule', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// POST new bus schedule
router.post('/', async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating bus schedule', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// PUT update bus schedule
router.put('/:id', async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus schedule not found' });
    }
    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating bus schedule', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Add this route for testing
router.post('/sample', async (req, res) => {
  try {
    const sampleBus = new Bus({
      busNumber: "01",
      departureCity: "Coimbatore",
      departureTime: "6:30 AM",
      returnTime: "6:00 PM",
      stops: ["Saravanampatti", "Avinashi"]
    });
    const savedBus = await sampleBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating sample bus', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default router; 