import { motion } from "framer-motion";

export default function BioTeaser() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-6">
              Hey, I'm Intesar 👋
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              I'm a product-minded builder with a passion for creating digital experiences that feel both intuitive and delightful. With a background in CRM automation and marketing technology, I bridge the gap between technical possibility and user needs.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              When I'm not building products, you'll find me exploring new frameworks, mentoring fellow developers, or diving into the latest startup trends. I believe the best products come from empathy, experimentation, and a healthy dose of curiosity.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-space-grotesk font-bold text-2xl text-indigo-primary" data-testid="stat-projects">15+</div>
                <div className="text-sm text-gray-600">Projects Shipped</div>
              </div>
              <div>
                <div className="font-space-grotesk font-bold text-2xl text-indigo-primary" data-testid="stat-experience">5</div>
                <div className="text-sm text-gray-600">Years Building</div>
              </div>
              <div>
                <div className="font-space-grotesk font-bold text-2xl text-indigo-primary" data-testid="stat-startups">3</div>
                <div className="text-sm text-gray-600">Startups Joined</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Intesar Husain - Product Builder" 
              className="rounded-2xl shadow-lg w-full h-auto"
              data-testid="img-profile"
            />
            <div className="absolute -bottom-6 -right-6 bg-amber-accent text-white p-4 rounded-full shadow-lg">
              <i className="fas fa-lightbulb text-2xl"></i>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
