import { useEffect } from "react";
import Hero from "@/components/hero";
import BioTeaser from "@/components/bio-teaser";
import Timeline from "@/components/timeline";
import KanbanWall from "@/components/kanban-wall";
import PassionsGrid from "@/components/passions-grid";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('nav');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('shadow-lg');
        } else {
          header.classList.remove('shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="font-inter text-gray-800 overflow-x-hidden">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-space-grotesk font-bold text-xl text-indigo-primary">
            Intesar Husain
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 hover:text-indigo-primary transition-colors"
              data-testid="nav-projects"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-indigo-primary transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-indigo-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <a 
              href="/api/resume"
              className="bg-indigo-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors inline-flex items-center gap-2"
              data-testid="nav-resume"
            >
              <i className="fas fa-download"></i>
              Resume
            </a>
          </div>
          <Button variant="ghost" className="md:hidden" data-testid="mobile-menu-button">
            <i className="fas fa-bars text-xl"></i>
          </Button>
        </div>
      </nav>

      <Hero />
      <BioTeaser />
      <Timeline />
      <KanbanWall />
      <PassionsGrid />
      <Testimonials />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-space-grotesk font-bold text-2xl text-white mb-4">
                Intesar Husain
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Product builder, creative leader, and startup enthusiast passionate about creating digital experiences that spark joy and solve real problems.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="social-linkedin">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="social-twitter">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="social-github">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="social-email">
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-space-grotesk font-semibold text-lg mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Projects</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-space-grotesk font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors">Product Strategy</span></li>
                <li><span className="hover:text-white transition-colors">CRM Automation</span></li>
                <li><span className="hover:text-white transition-colors">Web Development</span></li>
                <li><span className="hover:text-white transition-colors">Consulting</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intesar Husain. Built with passion and lots of coffee ☕</p>
            <p className="mt-2 text-sm">Made with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
