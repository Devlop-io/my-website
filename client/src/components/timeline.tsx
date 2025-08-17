import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { TimelineItem } from "@shared/schema";

export default function Timeline() {
  const { data: timelineItems, isLoading } = useQuery<TimelineItem[]>({
    queryKey: ['/api/timeline'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-bg">
        <div className="container mx-auto px-4">
          <h2 className="font-space-grotesk font-bold text-3xl text-center text-gray-900 mb-12">
            My Journey
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-40 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getTimelineColor = (index: number) => {
    const colors = ['bg-indigo-primary', 'bg-amber-accent', 'bg-progress-green'];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 bg-gray-bg">
      <div className="container mx-auto px-4">
        <h2 className="font-space-grotesk font-bold text-3xl text-center text-gray-900 mb-12">
          My Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
            
            {timelineItems?.map((item, index) => (
              <motion.div 
                key={item.id}
                className="relative pl-20 pb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`timeline-item-${index}`}
              >
                <div className={`absolute left-6 w-4 h-4 ${getTimelineColor(index)} rounded-full border-4 border-white shadow-lg`}></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-space-grotesk font-semibold text-xl text-gray-900" data-testid={`timeline-title-${index}`}>
                      {item.title}
                    </h3>
                    <span className="text-indigo-primary font-medium" data-testid={`timeline-period-${index}`}>
                      {item.period}
                    </span>
                  </div>
                  <div className="text-amber-accent font-medium mb-3" data-testid={`timeline-company-${index}`}>
                    {item.company}
                  </div>
                  <p className="text-gray-600 leading-relaxed" data-testid={`timeline-description-${index}`}>
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        data-testid={`timeline-skill-${index}-${skillIndex}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
