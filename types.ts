export interface ConfigFormState {
  title: string;
  tagline: string;
  url: string;
  baseUrl: string;
  organizationName: string;
  projectName: string;
  preset: 'classic' | 'facebook';
  theme: 'light' | 'dark' | 'custom';
}

export enum AppView {
  WIZARD = 'WIZARD',
  CONFIGURATOR = 'CONFIGURATOR',
  AI_ASSISTANT = 'AI_ASSISTANT',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isStreaming?: boolean;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  command?: string;
  details?: string[];
}