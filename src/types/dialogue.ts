export type DialogueStep = 'welcome' | 'mood' | 'location' | 'size' | 'style' | 'reveal' | 'contact';

export interface UserPreferences {
  mood?: 'calm' | 'vibrant' | 'minimal';
  location?: 'home' | 'office' | 'gift' | 'cafe';
  size?: 'small' | 'medium' | 'large';
  style?: 'warm' | 'industrial' | 'minimal';
}

export interface DialogueMessage {
  text: string;
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  mood: string;
  location: string;
  size: string;
  style: string;
  available: boolean;
  priceRange?: string;
}
