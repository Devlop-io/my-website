import { motion } from "framer-motion";
import { PASSIONS } from "@/lib/constants";

export default function PassionsGrid() {
  return (
    <section className="py-16 bg-gray-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-4">
            What Lights Me Up ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The passions and strengths that fuel my work and drive my curiosity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PASSIONS.map((passion, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`passion-card-${index}`}
            >
              <div className="text-3xl mb-4" data-testid={`passion-icon-${index}`}>
                {passion.icon}
              </div>
              <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 mb-3" data-testid={`passion-title-${index}`}>
                {passion.title}
              </h3>
              <p className="text-gray-600 leading-relaxed" data-testid={`passion-description-${index}`}>
                {passion.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
