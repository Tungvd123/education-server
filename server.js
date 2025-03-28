
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Server Node.js đã chạy thành công!');
});

app.post('/api/register', (req, res) => {
    const newData = req.body;
    let existing = [];
    if (fs.existsSync('data.json')) {
        existing = JSON.parse(fs.readFileSync('data.json'));
    }
    existing.push(newData);
    fs.writeFileSync('data.json', JSON.stringify(existing, null, 2));
    res.json({ message: '✅ Dữ liệu đã được lưu thành công!' });
});

app.get('/api/registrations', (req, res) => {
    let data = [];
    if (fs.existsSync('data.json')) {
        data = JSON.parse(fs.readFileSync('data.json'));
    }
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
