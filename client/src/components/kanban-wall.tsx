import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import ProjectSidebar from "./project-sidebar";

export default function KanbanWall() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const getProgressColor = (progress: number) => {
    if (progress <= 33) return 'bg-amber-accent';
    if (progress <= 66) return 'bg-indigo-primary';
    return 'bg-progress-green';
  };

  const getCardGradient = (status: string) => {
    switch (status) {
      case 'ideas':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200';
      case 'in-progress':
        return 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200';
      case 'launched':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getColumnIcon = (status: string) => {
    switch (status) {
      case 'ideas':
        return 'fas fa-lightbulb text-amber-accent';
      case 'in-progress':
        return 'fas fa-cog text-indigo-primary';
      case 'launched':
        return 'fas fa-rocket text-progress-green';
      default:
        return 'fas fa-circle text-gray-400';
    }
  };

  const getColumnTitle = (status: string) => {
    switch (status) {
      case 'ideas':
        return 'Ideas';
      case 'in-progress':
        return 'In Progress';
      case 'launched':
        return 'Launched';
      default:
        return status;
    }
  };

  const groupedProjects = projects?.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = [];
    }
    acc[project.status].push(project);
    return acc;
  }, {} as Record<string, Project[]>) || {};

  const columns = ['ideas', 'in-progress', 'launched'];

  if (isLoading) {
    return (
      <section id="projects" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-4">
              My Project Journey
            </h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                  <div className="h-8 bg-gray-300 rounded mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space-grotesk font-bold text-3xl text-gray-900 mb-4">
            My Project Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From spark of inspiration to shipped product—here's how my ideas evolve into reality
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
            {columns.map((status) => (
              <div key={status} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-space-grotesk font-semibold text-xl text-gray-900 flex items-center">
                    <i className={`${getColumnIcon(status)} mr-2`}></i>
                    {getColumnTitle(status)}
                  </h3>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === 'ideas' ? 'bg-amber-100 text-amber-700' :
                      status === 'in-progress' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-green-100 text-green-700'
                    }`}
                    data-testid={`column-count-${status}`}
                  >
                    {groupedProjects[status]?.length || 0}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {groupedProjects[status]?.map((project, index) => (
                    <motion.div 
                      key={project.id}
                      className={`${getCardGradient(project.status)} p-6 rounded-xl border cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
                      onClick={() => setSelectedProject(project)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      data-testid={`project-card-${project.id}`}
                    >
                      <h4 className="font-space-grotesk font-semibold text-lg text-gray-900 mb-3" data-testid={`project-title-${project.id}`}>
                        {project.title}
                      </h4>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className={`text-sm font-medium ${
                            project.progress <= 33 ? 'text-amber-600' :
                            project.progress <= 66 ? 'text-indigo-600' :
                            'text-progress-green'
                          }`} data-testid={`project-progress-${project.id}`}>
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className={`${getProgressColor(project.progress)} rounded-full h-2 transition-all duration-300`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed" data-testid={`project-description-${project.id}`}>
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className={`px-2 py-1 bg-white rounded-md text-xs font-medium ${
                              project.status === 'ideas' ? 'text-amber-700' :
                              project.status === 'in-progress' ? 'text-indigo-700' :
                              'text-green-700'
                            }`}
                            data-testid={`project-tech-${project.id}-${techIndex}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )) || (
                    <div className="text-center text-gray-400 py-8">
                      <i className="fas fa-inbox text-2xl mb-2"></i>
                      <p>No projects in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ProjectSidebar 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
