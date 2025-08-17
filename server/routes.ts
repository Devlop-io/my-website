import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
