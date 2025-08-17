import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface MarkdownContent {
  data: any;
  content: string;
  html: string;
}

export async function readMarkdownFile(filePath: string): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContent = await fs.readFile(fullPath, 'utf-8');
    const { data, content } = matter(fileContent);
    const html = await marked(content);
    
    return { data, content, html };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

export async function readMarkdownDirectory(dirPath: string): Promise<MarkdownContent[]> {
  try {
    const fullPath = path.join(process.cwd(), dirPath);
    const files = await fs.readdir(fullPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const contents = await Promise.all(
      markdownFiles.map(async (file) => {
        const content = await readMarkdownFile(path.join(dirPath, file));
        return content;
      })
    );
    
    return contents.filter(Boolean) as MarkdownContent[];
  } catch (error) {
    console.error(`Error reading markdown directory ${dirPath}:`, error);
    return [];
  }
}

export function extractProjectId(filename: string): string {
  return filename.replace('.md', '').replace(/[^a-zA-Z0-9]/g, '-');
}