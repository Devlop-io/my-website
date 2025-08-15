import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@shared/schema";

interface ProjectSidebarProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectSidebar({ project, isOpen, onClose }: ProjectSidebarProps) {
  const getProgressColor = (progress: number) => {
    if (progress <= 33) return 'bg-amber-accent';
    if (progress <= 66) return 'bg-indigo-primary';
    return 'bg-progress-green';
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-testid="sidebar-overlay"
          />
          
          {/* Sidebar */}
          <motion.div 
            className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-white shadow-2xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            data-testid="project-sidebar"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-space-grotesk font-bold text-2xl text-gray-900" data-testid="sidebar-title">
                  {project.title}
                </h2>
                <button 
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={onClose}
                  data-testid="button-close-sidebar"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      data-testid="project-image"
                    />
                  )}
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className={`text-sm font-semibold ${
                        project.progress <= 33 ? 'text-amber-600' :
                        project.progress <= 66 ? 'text-indigo-600' :
                        'text-progress-green'
                      }`} data-testid="sidebar-progress">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${getProgressColor(project.progress)} rounded-full h-3 transition-all duration-300`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-600 leading-relaxed" data-testid="sidebar-description">
                    {project.fullDescription}
                  </p>
                </div>
                
                {project.features.length > 0 && (
                  <div>
                    <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start" data-testid={`feature-${index}`}>
                          <i className={`fas fa-check-circle mt-1 mr-3 ${
                            project.progress === 100 ? 'text-progress-green' : 'text-amber-accent'
                          }`}></i>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                        data-testid={`tech-${index}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {Object.keys(project.impact || {}).length > 0 && (
                  <div>
                    <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 mb-4">Impact & Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(project.impact || {}).map(([key, value], index) => (
                        <div key={key} className="text-center p-4 bg-gray-50 rounded-lg" data-testid={`impact-${index}`}>
                          <div className="text-2xl font-bold text-indigo-primary">
                            {value.split(' ')[0]}
                          </div>
                          <div className="text-sm text-gray-600">
                            {value.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-indigo-primary text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-indigo-600 transition-colors"
                      data-testid="button-view-live"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors"
                      data-testid="button-view-code"
                    >
                      <i className="fab fa-github mr-2"></i>
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
