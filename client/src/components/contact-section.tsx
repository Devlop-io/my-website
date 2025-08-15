import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { InsertContact } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const handleResumeDownload = () => {
    // Track the download
    console.log('Resume download tracked');
    window.open('/api/resume', '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-space-grotesk font-bold text-4xl mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-indigo-100 leading-relaxed">
            Whether you're looking for a product builder, CRM automation expert, or creative collaborator, I'd love to hear about your project. Let's turn your ideas into reality.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-space-grotesk font-semibold text-2xl mb-6">Send a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-amber-accent focus:border-transparent"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-amber-accent focus:border-transparent"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger 
                            className="bg-white/20 border-white/30 text-white focus:ring-2 focus:ring-amber-accent focus:border-transparent"
                            data-testid="select-project-type"
                          >
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product-strategy">Product Strategy</SelectItem>
                          <SelectItem value="crm-automation">CRM Automation</SelectItem>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell me about your project..."
                          className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-amber-accent focus:border-transparent resize-none"
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-amber-accent text-gray-900 py-4 px-8 rounded-lg font-semibold hover:bg-amber-300 transform hover:scale-105 transition-all duration-200"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Quick Options */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h3 className="font-space-grotesk font-semibold text-xl mb-4">
                <i className="fas fa-calendar text-amber-accent mr-3"></i>
                Schedule a Call
              </h3>
              <p className="text-indigo-100 mb-4 leading-relaxed">
                Prefer to chat directly? Book a 30-minute call to discuss your project and see if we're a good fit.
              </p>
              <Button 
                className="bg-white text-indigo-900 hover:bg-indigo-50"
                data-testid="button-schedule-call"
              >
                Book a Call
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h3 className="font-space-grotesk font-semibold text-xl mb-4">
                <i className="fas fa-download text-amber-accent mr-3"></i>
                Download Resume
              </h3>
              <p className="text-indigo-100 mb-4 leading-relaxed">
                Want to see my full experience? Download my detailed resume with case studies and achievements.
              </p>
              <Button 
                onClick={handleResumeDownload}
                className="bg-amber-accent text-gray-900 hover:bg-amber-300"
                data-testid="button-download-resume"
              >
                <i className="fas fa-file-pdf mr-2"></i>
                Get Resume
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h3 className="font-space-grotesk font-semibold text-xl mb-4">
                <i className="fas fa-handshake text-amber-accent mr-3"></i>
                Let's Connect
              </h3>
              <p className="text-indigo-100 mb-4 leading-relaxed">
                Follow my journey and connect with me on social platforms for insights, updates, and behind-the-scenes content.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-amber-accent transition-colors" data-testid="social-linkedin">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
                <a href="#" className="text-white hover:text-amber-accent transition-colors" data-testid="social-twitter">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-white hover:text-amber-accent transition-colors" data-testid="social-github">
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a href="#" className="text-white hover:text-amber-accent transition-colors" data-testid="social-dribbble">
                  <i className="fab fa-dribbble text-2xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
