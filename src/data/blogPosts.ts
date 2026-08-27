import { BlogPost } from '../types';
import { BLOG_AUTHORS } from './blogAuthors';
import { FINANCE_POSTS } from './blog/financePosts';
import { HEALTH_FITNESS_POSTS } from './blog/healthFitnessPosts';
import { MATH_POSTS } from './blog/mathPosts';
import { CONVERSIONS_POSTS } from './blog/conversionsPosts';
import { REAL_ESTATE_POSTS } from './blog/realEstatePosts';
import { BUSINESS_POSTS } from './blog/businessPosts';
import { EDUCATION_GENERAL_POSTS } from './blog/educationGeneralPosts';

export { BLOG_AUTHORS };

export const BLOG_POSTS: BlogPost[] = [
  ...FINANCE_POSTS,
  ...HEALTH_FITNESS_POSTS,
  ...MATH_POSTS,
  ...CONVERSIONS_POSTS,
  ...REAL_ESTATE_POSTS,
  ...BUSINESS_POSTS,
  ...EDUCATION_GENERAL_POSTS
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug);
};

export const getRelatedBlogPosts = (currentPost: BlogPost, limit = 3): BlogPost[] => {
  if (currentPost.relatedBlogSlugs && currentPost.relatedBlogSlugs.length > 0) {
    const explicitRelated = BLOG_POSTS.filter(p => currentPost.relatedBlogSlugs?.includes(p.slug));
    if (explicitRelated.length >= limit) return explicitRelated.slice(0, limit);
  }
  return BLOG_POSTS.filter(p => p.slug !== currentPost.slug && p.category === currentPost.category).slice(0, limit);
};
