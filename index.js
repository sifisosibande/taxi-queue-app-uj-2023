import express from "express";
import { joinQueue, leaveQueue, joinTaxiQueue, queueLength, taxiQueueLength, taxiDepart } from './taxi.sql.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 4015;

app.post('/api/passenger/join', async (req, res) => {
    await joinQueue();
    res.json({ message: 'Passenger joined queue' });
});

app.post('/api/passenger/leave', async (req, res) => {
    await leaveQueue();
    res.json({ message: 'Passenger left queue' });
});

app.post('/api/taxi/join', async (req, res) => {
    await joinTaxiQueue();
    res.json({ message: 'Taxi joined queue' });
});

app.post('/api/taxi/depart', async (req, res) => {
    const success = await taxiDepart();
    if (success) {
        res.json({ message: 'Taxi departed from queue' });
    } else {
        res.status(400).json({ error: 'Insufficient passengers for taxi departure' });
    }
});

app.get('/api/passenger/queue', async (req, res) => {
    const count = await queueLength();
    res.json({ queueCount: count });
});

app.get('/api/taxi/queue', async (req, res) => {
    const count = await taxiQueueLength();
    res.json({ queueCount: count });
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`));
