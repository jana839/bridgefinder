export type SkillLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Player {
  id: string;
  name: string;
  email: string;
  location: string;
  date: string;
  time: string;
  level: SkillLevel;
  notes?: string;
  createdAt: Date;
}
