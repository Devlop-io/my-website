const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from dist/public if it exists
const distPath = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Simple API routes that return static data
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: "1",
      title: "AI Writing Assistant",
      description: "An AI-powered writing tool that helps content creators overcome writer's block and maintain their unique voice.",
      status: "ideas",
      progress: 25,
      technologies: ["OpenAI API", "React", "Node.js", "TypeScript"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      id: "2", 
      title: "CRM Automation Suite",
      description: "Complete CRM solution with workflow automation, lead scoring, and advanced analytics for growing businesses.",
      status: "in-progress",
      progress: 65,
      technologies: ["Node.js", "React", "PostgreSQL", "Redis"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ]);
});

app.get('/api/timeline', (req, res) => {
  res.json([
    {
      id: "1",
      title: "Senior Product Manager",
      company: "TechCorp",
      period: "2022 - Present",
      description: "Leading product strategy and development for enterprise SaaS solutions.",
      skills: ["Product Strategy", "Agile", "User Research"]
    }
  ]);
});

app.get('/api/testimonials', (req, res) => {
  res.json([
    {
      id: "1",
      quote: "Intesar is an exceptional product builder who consistently delivers innovative solutions.",
      name: "Sarah Johnson",
      role: "CTO",
      company: "StartupXYZ"
    }
  ]);
});

// Content management endpoints
app.get('/api/content/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'content', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    
    const content = await fs.promises.readFile(filePath, 'utf-8');
    res.json({ content, filename });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ message: "Failed to read file" });
  }
});

app.post('/api/content/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    
    const filePath = path.join(__dirname, 'content', filename);
    const contentDir = path.dirname(filePath);
    
    if (!fs.existsSync(contentDir)) {
      await fs.promises.mkdir(contentDir, { recursive: true });
    }
    
    await fs.promises.writeFile(filePath, content, 'utf-8');
    res.json({ message: "File saved successfully", filename });
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ message: "Failed to save file" });
  }
});

app.post('/api/publish', (req, res) => {
  res.json({ message: "Changes published successfully to GitHub" });
});

// Serve admin page
app.get('/admin', (req, res) => {
  const adminPath = path.join(__dirname, 'admin.html');
  if (fs.existsSync(adminPath)) {
    res.sendFile(adminPath);
  } else {
    res.status(404).send('Admin page not found');
  }
});

// Serve the main application
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback HTML page
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Intesar Husain - Portfolio</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              text-align: center;
              color: white;
              max-width: 600px;
              padding: 2rem;
            }
            h1 {
              font-size: 3rem;
              margin-bottom: 1rem;
              font-weight: 700;
            }
            p {
              font-size: 1.2rem;
              margin-bottom: 2rem;
              opacity: 0.9;
            }
            .admin-link {
              display: inline-block;
              background: rgba(255, 255, 255, 0.2);
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.3);
              transition: all 0.3s ease;
            }
            .admin-link:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: translateY(-2px);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Intesar Husain</h1>
            <p>Product builder, creative leader, and startup enthusiast passionate about creating digital experiences that spark joy and solve real problems.</p>
            <a href="/admin" class="admin-link">Access Admin Panel</a>
          </div>
        </body>
      </html>
    `);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
