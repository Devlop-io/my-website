import { type User, type UpsertUser, type Project, type InsertProject, type TimelineItem, type InsertTimelineItem, type Testimonial, type InsertTestimonial, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { readMarkdownFile, readMarkdownDirectory, extractProjectId } from "./markdown-reader";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getTimelineItems(): Promise<TimelineItem[]>;
  createTimelineItem(item: InsertTimelineItem): Promise<TimelineItem>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Content methods for markdown-based content
  getHeroContent(): Promise<any>;
  getAboutContent(): Promise<any>;
  getPassionsContent(): Promise<any>;
  getContactContent(): Promise<any>;
  getProjectsFromMarkdown(): Promise<Project[]>;
  getTimelineFromMarkdown(): Promise<TimelineItem[]>;
  getTestimonialsFromMarkdown(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private timelineItems: Map<string, TimelineItem>;
  private testimonials: Map<string, Testimonial>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.timelineItems = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Projects
    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "AI Writing Assistant",
        description: "An AI-powered writing tool that helps content creators overcome writer's block and maintain their unique voice.",
        fullDescription: "This comprehensive AI writing assistant leverages GPT-4 to help content creators overcome writer's block while maintaining their unique voice and style. The tool includes features like tone analysis, content suggestions, and plagiarism checking.",
        status: "ideas",
        progress: 15,
        technologies: ["GPT-4", "React", "SaaS"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        liveUrl: null,
        githubUrl: null,
        features: ["AI-powered content generation", "Tone and style analysis", "Plagiarism detection", "Content optimization"],
        impact: {},
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "CRM Automation Suite",
        description: "Complete CRM solution with workflow automation, lead scoring, and advanced analytics for growing businesses.",
        fullDescription: "This comprehensive CRM automation suite was designed to help growing businesses streamline their sales processes and improve customer relationships. The platform features advanced workflow automation, intelligent lead scoring, and detailed analytics that provide actionable insights for sales teams.",
        status: "in-progress",
        progress: 65,
        technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Docker"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        features: ["Drag-and-drop workflow builder", "AI-powered lead scoring", "Advanced analytics dashboard", "Email template customization"],
        impact: { "processing": "40% Faster Lead Processing", "conversion": "25% Increased Conversion" },
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "TaskFlow Dashboard",
        description: "Project management tool with real-time collaboration, time tracking, and advanced reporting features.",
        fullDescription: "A comprehensive project management solution that helps teams stay organized and productive. Features real-time collaboration, automated time tracking, and powerful reporting capabilities.",
        status: "launched",
        progress: 100,
        technologies: ["React", "Firebase", "TypeScript"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://taskflow.example.com",
        githubUrl: "https://github.com/taskflow",
        features: ["Real-time collaboration", "Time tracking", "Advanced reporting", "Team management"],
        impact: { "productivity": "35% Increased Productivity", "efficiency": "50% Better Task Management" },
        createdAt: new Date(),
      }
    ];

    sampleProjects.forEach(project => this.projects.set(project.id, project));

    // Timeline items
    const sampleTimelineItems: TimelineItem[] = [
      {
        id: "1",
        title: "Senior Product Manager",
        company: "TechFlow Dynamics",
        period: "2022 - Present",
        description: "Led product strategy for B2B SaaS platform, increasing user engagement by 40% and reducing churn by 25% through data-driven feature prioritization and user research.",
        skills: ["Product Strategy", "User Research", "Data Analytics"],
        order: 1,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Product Marketing Manager",
        company: "GrowthLab Studio",
        period: "2020 - 2022",
        description: "Developed go-to-market strategies for 3 product launches, implemented CRM automation workflows that improved lead qualification by 60%.",
        skills: ["GTM Strategy", "Marketing Automation", "CRM"],
        order: 2,
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "Frontend Developer",
        company: "Pixel Perfect Agency",
        period: "2019 - 2020",
        description: "Built responsive web applications using React and TypeScript, collaborated with designers to create pixel-perfect user interfaces for startup clients.",
        skills: ["React", "TypeScript", "UI/UX"],
        order: 3,
        createdAt: new Date(),
      }
    ];

    sampleTimelineItems.forEach(item => this.timelineItems.set(item.id, item));

    // Testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Sarah Chen",
        role: "VP of Product",
        company: "TechFlow",
        quote: "Intesar has an exceptional ability to bridge technical complexity with user needs. His product thinking consistently leads to features that users actually love and adopt.",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Marcus Rodriguez",
        role: "Founder",
        company: "GrowthLab",
        quote: "Working with Intesar was a game-changer for our startup. His CRM automation expertise helped us scale from chaos to a well-oiled lead generation machine.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Jessica Kim",
        role: "Lead Designer",
        company: "Pixel Perfect",
        quote: "Intesar brings both technical depth and creative vision to every project. His ability to see the big picture while executing on details is remarkable.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      }
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id!);
    if (existingUser) {
      const updatedUser: User = { 
        ...existingUser, 
        ...userData, 
        updatedAt: new Date() 
      };
      this.users.set(userData.id!, updatedUser);
      return updatedUser;
    } else {
      const user: User = { 
        ...userData, 
        id: userData.id!,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(user.id, user);
      return user;
    }
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id, createdAt: new Date() };
    this.projects.set(id, project);
    return project;
  }

  async getTimelineItems(): Promise<TimelineItem[]> {
    return Array.from(this.timelineItems.values()).sort((a, b) => a.order - b.order);
  }

  async createTimelineItem(insertTimelineItem: InsertTimelineItem): Promise<TimelineItem> {
    const id = randomUUID();
    const item: TimelineItem = { ...insertTimelineItem, id, createdAt: new Date() };
    this.timelineItems.set(id, item);
    return item;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: new Date() };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }

  // Content methods for markdown-based content
  async getHeroContent(): Promise<any> {
    const heroContent = await readMarkdownFile('content/hero.md');
    return heroContent?.data || {};
  }

  async getAboutContent(): Promise<any> {
    const aboutContent = await readMarkdownFile('content/about.md');
    return aboutContent?.data || {};
  }

  async getPassionsContent(): Promise<any> {
    const passionsContent = await readMarkdownFile('content/passions.md');
    return passionsContent?.data || {};
  }

  async getContactContent(): Promise<any> {
    const contactContent = await readMarkdownFile('content/contact.md');
    return contactContent?.data || {};
  }

  async getProjectsFromMarkdown(): Promise<Project[]> {
    const projectContents = await readMarkdownDirectory('content/projects');
    
    return projectContents.map((content, index) => {
      const { data, html } = content;
      const filename = `project-${index + 1}`;
      
      return {
        id: extractProjectId(filename),
        title: data.title || "",
        description: data.description || "",
        fullDescription: html || "",
        status: data.status === "Launched" ? "launched" : 
               data.status === "In Progress" ? "in-progress" : "ideas",
        progress: data.progress ?? 0,
        technologies: data.tools ?? [],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        liveUrl: data.demo_link || null,
        githubUrl: data.github_link || null,
        features: [],
        impact: data.impact ? { "result": data.impact } : null,
        createdAt: new Date(),
      } as Project;
    });
  }

  async getTimelineFromMarkdown(): Promise<TimelineItem[]> {
    const timelineContent = await readMarkdownFile('content/timeline.md');
    if (!timelineContent || !timelineContent.data.items) {
      return [];
    }

    return timelineContent.data.items.map((item: any, index: number) => ({
      id: (index + 1).toString(),
      title: item.title,
      company: item.company,
      period: item.period,
      description: item.description,
      skills: item.skills ?? [],
      order: index + 1,
      createdAt: new Date(),
    }));
  }

  async getTestimonialsFromMarkdown(): Promise<Testimonial[]> {
    const testimonialsContent = await readMarkdownFile('content/testimonials.md');
    if (!testimonialsContent || !testimonialsContent.data.testimonials) {
      return [];
    }

    return testimonialsContent.data.testimonials.map((testimonial: any, index: number) => ({
      id: (index + 1).toString(),
      name: testimonial.author,
      role: testimonial.role,
      company: testimonial.company || null,
      quote: testimonial.quote,
      imageUrl: testimonial.imageUrl ?? "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      createdAt: new Date(),
    }));
  }
}

export const storage = new MemStorage();
