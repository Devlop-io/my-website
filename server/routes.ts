import type { Express } from "express";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ObjectStorageService } from "./objectStorage";
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function registerRoutes(app: Express): Promise<void> {
  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Content file management routes
  app.get('/api/content/:filename', async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(process.cwd(), 'content', filename);
      const content = await fs.readFile(filePath, 'utf-8');
      res.json({ content, filename });
    } catch (error) {
      console.error("Error reading file:", error);
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

      const filePath = path.join(process.cwd(), 'content', filename);
      await fs.writeFile(filePath, content, 'utf-8');
      
      res.json({ message: "File saved successfully", filename });
    } catch (error) {
      console.error("Error writing file:", error);
      res.status(500).json({ message: "Failed to save file" });
    }
  });

  // GitHub sync endpoint
  app.post('/api/publish', async (req, res) => {
    try {
      const { message = "Update content via admin panel" } = req.body;
      
      // Add all changes to git
      await execAsync('git add .');
      
      // Commit changes
      await execAsync(`git commit -m "${message}"`);
      
      // Push to GitHub
      await execAsync('git push origin main');
      
      res.json({ message: "Changes published successfully to GitHub" });
    } catch (error) {
      console.error("Error publishing to GitHub:", error);
      res.status(500).json({ message: "Failed to publish changes" });
    }
  });

  // Object storage routes for image uploads
  app.post("/api/objects/upload", isAuthenticated, async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    res.json({ uploadURL });
  });

  app.put("/api/projects/:id/image", isAuthenticated, async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }

    const userId = (req.user as any)?.claims?.sub;

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: userId,
          visibility: "public",
        },
      );

      // Here you would update the project's imageUrl in the markdown file
      // For now, we'll just return the normalized path
      res.status(200).json({
        objectPath: objectPath,
      });
    } catch (error) {
      console.error("Error setting project image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve uploaded objects
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error downloading object:", error);
      return res.status(500).json({ error: "Error downloading object" });
    }
  });
  // Get all projects (with option to use markdown source)
  app.get("/api/projects", async (req, res) => {
    try {
      const useMarkdown = req.query.source === 'markdown';
      const projects = useMarkdown ? 
        await storage.getProjectsFromMarkdown() : 
        await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get timeline items (with option to use markdown source)
  app.get("/api/timeline", async (req, res) => {
    try {
      const useMarkdown = req.query.source === 'markdown';
      const items = useMarkdown ? 
        await storage.getTimelineFromMarkdown() : 
        await storage.getTimelineItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline items" });
    }
  });

  // Get testimonials (with option to use markdown source)
  app.get("/api/testimonials", async (req, res) => {
    try {
      const useMarkdown = req.query.source === 'markdown';
      const testimonials = useMarkdown ? 
        await storage.getTestimonialsFromMarkdown() : 
        await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Contact form submitted successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get hero content
  app.get("/api/content/hero", async (req, res) => {
    try {
      const content = await storage.getHeroContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hero content" });
    }
  });

  // Get about content
  app.get("/api/content/about", async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch about content" });
    }
  });

  // Get passions content
  app.get("/api/content/passions", async (req, res) => {
    try {
      const content = await storage.getPassionsContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch passions content" });
    }
  });

  // Get contact content
  app.get("/api/content/contact", async (req, res) => {
    try {
      const content = await storage.getContactContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact content" });
    }
  });

  // Resume download endpoint
  app.get("/api/resume", async (req, res) => {
    try {
      // In a real implementation, this would serve the actual PDF file
      // For now, we'll return a redirect to a sample PDF
      res.redirect("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
    } catch (error) {
      res.status(500).json({ message: "Failed to download resume" });
    }
  });

}
