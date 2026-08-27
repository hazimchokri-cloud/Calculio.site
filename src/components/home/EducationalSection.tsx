import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface EducationalSectionProps {
  onSelectCalculator?: (id: string) => void;
  onSelectPost?: (slug: string) => void;
  onGoToBlog?: () => void;
}

export const EducationalSection: React.FC<EducationalSectionProps> = ({ 
  onSelectPost,
  onGoToBlog
}) => {
  const { t, blogPosts } = useLanguage();
  // Show a clean set of 3 featured articles
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8FAFC]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            {t('home.eduSectionTitle', 'Calculation Guides')}
          </h2>
          {/* 3px high, 48px wide orange underline */}
          <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-2" />
          <p className="text-sm text-[#475569] mt-1">
            {t('home.eduSectionSubtitle', 'Helpful guides and formulas behind your calculation results.')}
          </p>
        </div>

        {onGoToBlog && (
          <button
            onClick={onGoToBlog}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] hover:underline shrink-0 cursor-pointer"
          >
            <span>{t('blog.allArticles', 'View All Articles')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3 Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (
          <div
            key={post.slug}
            onClick={() => onSelectPost && onSelectPost(post.slug)}
            className="bg-[#FFFFFF] rounded-[12px] p-6 border border-[#E2E8F0] hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Read More Action */}
            <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#F97316] group-hover:text-[#EA580C]">
              <span>{t('blog.readArticle', 'Read Guide')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      {onGoToBlog && (
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={onGoToBlog}
            className="w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-xs font-semibold text-[#0F172A] rounded-xl transition-colors cursor-pointer"
          >
            {t('blog.allArticles', 'View All Articles')}
          </button>
        </div>
      )}
    </section>
  );
};
