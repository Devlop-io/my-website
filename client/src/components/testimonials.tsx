import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-4">
              Kind Words from Colleagues
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100',
      'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100',
      'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100',
    ];
    return gradients[index % gradients.length];
  };

  const getQuoteColor = (index: number) => {
    const colors = ['text-indigo-300', 'text-amber-300', 'text-green-300'];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-4">
            Kind Words from Colleagues
          </h2>
          <p className="text-lg text-gray-600">
            What peers and managers have said about working with me
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials?.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className={`${getGradient(index)} p-8 rounded-2xl border`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`testimonial-card-${index}`}
            >
              <div className={`${getQuoteColor(index)} text-4xl mb-4`}>"</div>
              <p className="text-gray-700 leading-relaxed mb-6" data-testid={`testimonial-quote-${index}`}>
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                {testimonial.imageUrl && (
                  <img 
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    data-testid={`testimonial-image-${index}`}
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900" data-testid={`testimonial-name-${index}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600" data-testid={`testimonial-role-${index}`}>
                    {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          )) || (
            <div className="col-span-3 text-center text-gray-500">
              <p>No testimonials available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
