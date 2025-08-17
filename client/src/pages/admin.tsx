import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObjectUploader } from "@/components/ObjectUploader";
import { apiRequest } from "@/lib/queryClient";
import type { UploadResult } from "@uppy/core";
import { LogOut, FileText, Image, User, MessageSquare, Calendar, FolderOpen, Lock, Save, Upload, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FileEditorProps {
  filename: string;
  content: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

function FileEditor({ filename, content, onSave, onClose }: FileEditorProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedContent);
      toast({
        title: "File saved",
        description: `${filename} has been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Editing {filename}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-hidden">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-full min-h-[400px] font-mono text-sm resize-none"
            placeholder="Enter your markdown content here..."
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [editingFile, setEditingFile] = useState<{ filename: string; content: string } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Khulja sim sim") {
      setIsAuthenticated(true);
      setShowError(false);
      toast({
        title: "Access granted",
        description: "Welcome to the admin panel!",
      });
    } else {
      setShowError(true);
      toast({
        title: "Access denied",
        description: "You're dumb go check the code for the password",
        variant: "destructive",
      });
    }
  };

  const handleEditFile = async (filename: string) => {
    try {
      const response = await apiRequest(`/api/content/${filename}`, "GET");
      setEditingFile({ filename, content: response.content });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load file content.",
        variant: "destructive",
      });
    }
  };

  const handleSaveFile = async (content: string) => {
    if (!editingFile) return;
    
    try {
      await apiRequest(`/api/content/${editingFile.filename}`, "POST", { content });
      setEditingFile(null);
    } catch (error) {
      throw error;
    }
  };

  const handlePublishChanges = async () => {
    setIsPublishing(true);
    try {
      const message = prompt("Enter a commit message (optional):") || "Update content via admin panel";
      await apiRequest("/api/publish", "POST", { message });
      toast({
        title: "Published!",
        description: "Changes have been successfully published to GitHub.",
      });
    } catch (error) {
      toast({
        title: "Publish failed",
        description: "Failed to publish changes to GitHub. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Password overlay
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter the password to access the admin panel
            </p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            
            {showError && (
              <div className="text-red-500 text-sm text-center">
                You're dumb go check the code for the password
              </div>
            )}
            
            <Button type="submit" className="w-full">
              Access Admin Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const handleGetUploadParameters = async () => {
    const response = await apiRequest("/api/objects/upload", "POST") as any;
    return {
      method: "PUT" as const,
      url: response.uploadURL,
    };
  };

  const handleImageUploadComplete = (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      toast({
        title: "Image uploaded successfully",
        description: `${uploadedFile.name} has been uploaded.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Portfolio Admin
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4" />
                <span>Admin User</span>
              </div>
            </div>
            <Button 
              onClick={handlePublishChanges} 
              disabled={isPublishing}
              className="flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              {isPublishing ? "Publishing..." : "Publish Changes"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Media
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Content Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Edit hero section, about page, and other site content using markdown files.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => handleEditFile("hero.md")}>
                    Edit hero.md
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Add, edit, and manage your portfolio projects with images and descriptions.
                  </p>
                  <Button size="sm" variant="outline" onClick={() => handleEditFile("projects/ai-writing-assistant.md")}>
                    Edit Projects
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Media Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Upload images and other media files for your projects and content.
                  </p>
                  <ObjectUploader
                    maxNumberOfFiles={5}
                    maxFileSize={10485760}
                    onGetUploadParameters={handleGetUploadParameters}
                    onComplete={handleImageUploadComplete}
                    buttonClassName="w-full"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Upload Media
                  </ObjectUploader>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">Hero Section</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Edit the main headline and call-to-action text
                      </p>
                      <Button size="sm" variant="outline" onClick={() => handleEditFile("hero.md")}>
                        Edit hero.md
                      </Button>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">About Section</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Update your bio and professional summary
                      </p>
                      <Button size="sm" variant="outline" onClick={() => handleEditFile("about.md")}>
                        Edit about.md
                      </Button>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">Passions</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Update your interests and passions
                      </p>
                      <Button size="sm" variant="outline" onClick={() => handleEditFile("passions.md")}>
                        Edit passions.md
                      </Button>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">Contact</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Update contact information and form settings
                      </p>
                      <Button size="sm" variant="outline" onClick={() => handleEditFile("contact.md")}>
                        Edit contact.md
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Projects are managed through markdown files in the content/projects directory. 
                  Each project has its own .md file with metadata and description.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button size="sm" variant="outline" onClick={() => handleEditFile("projects/ai-writing-assistant.md")}>
                      Edit AI Writing Assistant
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditFile("projects/crm-automation.md")}>
                      Edit CRM Automation
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditFile("projects/onboarding-optimization.md")}>
                      Edit Onboarding Optimization
                    </Button>
                  </div>
                  <ObjectUploader
                    maxNumberOfFiles={1}
                    maxFileSize={10485760}
                    onGetUploadParameters={handleGetUploadParameters}
                    onComplete={handleImageUploadComplete}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Upload Project Image
                  </ObjectUploader>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Timeline items are managed through the timeline.md file. 
                  Edit the file to add or modify career milestones.
                </p>
                <Button size="sm" variant="outline" onClick={() => handleEditFile("timeline.md")}>
                  Edit timeline.md
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Testimonials are managed through the testimonials.md file. 
                  Add client feedback and recommendations.
                </p>
                <Button size="sm" variant="outline" onClick={() => handleEditFile("testimonials.md")}>
                  Edit testimonials.md
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload and manage images, documents, and other media files for your portfolio.
                  </p>
                  <ObjectUploader
                    maxNumberOfFiles={10}
                    maxFileSize={50485760} // 50MB for larger files
                    onGetUploadParameters={handleGetUploadParameters}
                    onComplete={handleImageUploadComplete}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Upload Multiple Files
                  </ObjectUploader>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* File Editor Modal */}
      {editingFile && (
        <FileEditor
          filename={editingFile.filename}
          content={editingFile.content}
          onSave={handleSaveFile}
          onClose={() => setEditingFile(null)}
        />
      )}
    </div>
  );
}