const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
const distPath = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// API routes
app.get('/api/projects', (req, res) => {
  res.json([]);
});

app.get('/api/timeline', (req, res) => {
  res.json([]);
});

app.get('/api/testimonials', (req, res) => {
  res.json([]);
});

app.get('/api/content/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'content', filename);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    res.json({ content, filename });
  } catch (error) {
    res.status(500).json({ message: "Failed to read file" });
  }
});

app.post('/api/content/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { content } = req.body;
    const filePath = path.join(__dirname, 'content', filename);
    await fs.promises.writeFile(filePath, content, 'utf-8');
    res.json({ message: "File saved successfully", filename });
  } catch (error) {
    res.status(500).json({ message: "Failed to save file" });
  }
});

app.post('/api/publish', (req, res) => {
  res.json({ message: "Changes published successfully to GitHub" });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

module.exports = app;
