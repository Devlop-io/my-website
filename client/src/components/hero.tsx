import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-50 to-amber-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="font-space-grotesk font-bold text-4xl md:text-6xl text-gray-900 mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Building products that{" "}
            <span className="text-indigo-primary relative">
              spark joy
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-accent rounded"></div>
            </span>
            <br />and solve real problems
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I'm a product builder, creative leader, and startup enthusiast who transforms ideas into meaningful digital experiences. Let's create something amazing together.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-indigo-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-600 transform hover:scale-105 transition-all"
              data-testid="button-view-work"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-indigo-primary border-2 border-indigo-primary px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
              data-testid="button-connect"
            >
              Let's Connect
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
