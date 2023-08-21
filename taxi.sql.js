import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPromise = sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});

export async function joinQueue() {
    const db = await dbPromise;
    await db.run('INSERT INTO passenger_queue DEFAULT VALUES');
}

export async function leaveQueue() {
    const db = await dbPromise;
    await db.run('DELETE FROM passenger_queue WHERE id = (SELECT id FROM passenger_queue LIMIT 1)');
}

export async function joinTaxiQueue() {
    const db = await dbPromise;
    await db.run('INSERT INTO taxi_queue DEFAULT VALUES');
}

export async function queueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT COUNT(*) as count FROM passenger_queue');
    return result.count;
}

export async function taxiQueueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT COUNT(*) as count FROM taxi_queue');
    return result.count;
}

export async function taxiDepart() {
    const db = await dbPromise;
    const passengers = await db.get('SELECT COUNT(*) as count FROM passenger_queue');
    
    if (passengers.count >= 12) {
        await db.run('DELETE FROM passenger_queue LIMIT 12');
        await db.run('DELETE FROM taxi_queue LIMIT 1');
        return true;
    } else {
        return false;
    }
}
