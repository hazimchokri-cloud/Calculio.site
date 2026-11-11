import { BlogAuthor } from '../types';

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  sarahJenkins: {
    name: 'Dr. Sarah Jenkins, CFA',
    role: 'Senior Financial Analyst & Quantitative Modeler',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    bio: 'Former Wall Street quantitative analyst with over 14 years of experience specializing in fixed-income mathematics, amortization algorithms, and personal wealth modeling.',
    credentials: 'PhD in Financial Mathematics, CFA Charterholder'
  },
  marcusVance: {
    name: 'Marcus Vance, MS, CSCS',
    role: 'Exercise Physiologist & Nutritional Scientist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    bio: 'Clinical exercise physiologist and researcher focused on body composition metrics, metabolic expenditure formulas, and cardiovascular performance indexing.',
    credentials: 'MS in Kinesiology, Certified Strength & Conditioning Specialist'
  },
  elenaRostova: {
    name: 'Elena Rostova, MS',
    role: 'Applied Mathematics & Engineering Specialist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    bio: 'STEM educator and physics researcher passionate about making complex mathematical proofs, dimensional analysis, and algebraic algorithms intuitive for everyone.',
    credentials: 'MS in Applied Physics & Computational Mathematics'
  },
  davidSterling: {
    name: 'David Sterling, CFP®',
    role: 'Wealth Strategy Director & Retirement Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    bio: 'Certified Financial Planner with 18+ years advising families and business owners on tax-advantaged retirement withdrawals, compound growth horizons, and risk modeling.',
    credentials: 'Certified Financial Planner (CFP®), MBA in Finance'
  },
  calculioEditorial: {
    name: 'Calculio Editorial Team',
    role: 'Financial Education & Research Unit',
    avatar: '/favicon.ico',
    bio: 'The Calculio Editorial Team is composed of financial analysts, math educators, and technology specialists dedicated to providing accurate, accessible, and verified financial tools and educational resources.',
    credentials: 'Verified Academic & Professional Source'
  }
};
