// server.js - simple express API to serve static files & sample APIs
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// configure DB using env vars or defaults
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'hotelmanagement',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// helper to get connection
async function query(q, params){
  const conn = await mysql.createPool(dbConfig);
  const [rows] = await conn.query(q, params);
  return rows;
}

// GET metrics
app.get('/api/metrics', async (req, res) => {
  try {
    const totalRoomsRow = await query('SELECT COUNT(*) as c FROM rooms');
    const availableRoomsRow = await query("SELECT COUNT(*) as c FROM rooms WHERE status='available'");
    const occupiedRoomsRow = await query("SELECT COUNT(*) as c FROM rooms WHERE status='occupied'");
    const hkCountRow = await query('SELECT COUNT(*) as c FROM housekeeping_tasks');
    const hkPendingRow = await query("SELECT COUNT(*) as c FROM housekeeping_tasks WHERE status='pending' OR status='in_progress'");
    const checkinsToday = await query("SELECT COUNT(*) as c FROM reservations WHERE checkin = CURDATE()");
    const vipArrivals = await query("SELECT COUNT(*) as c FROM reservations WHERE checkin = CURDATE() AND is_vip = 1");

    // simple occupancy rate
    const total = totalRoomsRow[0].c || 0;
    const occupied = occupiedRoomsRow[0].c || 0;
    const occupancy_rate = total>0 ? Math.round((occupied/total)*100) : 0;

    res.json({
      total_rooms: total,
      available_rooms: availableRoomsRow[0].c,
      occupancy_rate,
      occupancy_change: '+5%',   // placeholder - calculate from historic data if available
      housekeeping_count: hkCountRow[0].c,
      housekeeping_pending: hkPendingRow[0].c,
      checkins_today: checkinsToday[0].c,
      vip_arrivals: vipArrivals[0].c
    });
  } catch (err) { console.error(err); res.status(500).json({error:'db error'}); }
});

// GET tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const rows = await query(
      `SELECT hk.id, hk.title, hk.notes, hk.priority, hk.status, r.number as room_number, u.name as assigned_name
       FROM housekeeping_tasks hk
       LEFT JOIN rooms r ON hk.room_id = r.id
       LEFT JOIN users u ON hk.assigned_to = u.id
       ORDER BY hk.created_at DESC`
    );
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({error:'db error'}); }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port', port));
