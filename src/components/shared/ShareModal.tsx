import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Mail, 
  Smartphone,
  ExternalLink,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';
import { useLanguage } from '../../i18n/LanguageContext';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url?: string;
  category?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  url,
  category
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Dynamically resolve current page URL
  const resolvedUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://calculio.site');
  const defaultDesc = description || 'Free, accurate calculation tool and mathematical breakdown on Calculio.';
  const shareTitle = `${title} | Calculio`;
  const shareText = `${title} – ${defaultDesc}`;

  // Detect native share capability
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  // Keyboard Escape listener, Focus Management & Scroll Lock
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setCopyError(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus close button on mount for screen readers & keyboard navigation
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      const success = await copyToClipboard(resolvedUrl);
      if (success) {
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2500);
      } else {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 3500);
      }
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: resolvedUrl
        });
      } catch (err: any) {
        // Ignore AbortError when user dismisses the system share sheet
        if (err?.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    }
  };

  // Social sharing channels configuration
  const shareChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      bgColor: 'bg-[#25D366] hover:bg-[#20bd5a]',
      textColor: 'text-white',
      borderColor: 'border-[#25D366]',
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.777.98-.953 1.18-.175.2-.351.225-.652.075-.3-.15-1.267-.467-2.413-1.488-.893-.796-1.496-1.78-1.672-2.08-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.93-2.241-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.526.075-.802.376-.276.3-1.054 1.03-1.054 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.126 3.246 5.15 4.553.72.31 1.282.495 1.72.634.723.23 1.381.197 1.901.12.579-.087 1.782-.728 2.033-1.43.25-.703.25-1.305.175-1.43-.075-.126-.276-.2-.577-.351zM12.05 2C6.52 2 2.037 6.48 2.037 12c0 1.97.575 3.81 1.573 5.37L2 22l4.807-1.558A9.94 9.94 0 0 0 12.05 22c5.53 0 10.013-4.48 10.013-10S17.58 2 12.05 2zm0 18.232c-1.634 0-3.146-.474-4.42-1.29l-.317-.202-3.284 1.063 1.085-3.2-.22-.35A8.188 8.188 0 0 1 3.86 12c0-4.516 3.673-8.19 8.19-8.19 4.516 0 8.19 3.674 8.19 8.19 0 4.516-3.674 8.232-8.19 8.232z"/>
        </svg>
      ),
      action: () => {
        const text = `${title} – ${defaultDesc}\n\nCheck it out here: ${resolvedUrl}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      bgColor: 'bg-[#1877F2] hover:bg-[#166fe5]',
      textColor: 'text-white',
      borderColor: 'border-[#1877F2]',
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resolvedUrl)}`, '_blank', 'width=620,height=580,noopener,noreferrer');
      }
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      bgColor: 'bg-[#0F172A] hover:bg-[#020617]',
      textColor: 'text-white',
      borderColor: 'border-[#0F172A]',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        const text = `${title} on Calculio`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resolvedUrl)}`, '_blank', 'width=620,height=480,noopener,noreferrer');
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      bgColor: 'bg-[#0A66C2] hover:bg-[#095196]',
      textColor: 'text-white',
      borderColor: 'border-[#0A66C2]',
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolvedUrl)}`, '_blank', 'width=620,height=580,noopener,noreferrer');
      }
    },
    {
      id: 'email',
      name: 'Email',
      bgColor: 'bg-[#EA4335] hover:bg-[#d93025]',
      textColor: 'text-white',
      borderColor: 'border-[#EA4335]',
      icon: <Mail className="w-5 h-5 shrink-0" />,
      action: () => {
        const subject = `${title} | Calculio`;
        const body = `Hi,\n\nI thought you might find this calculator on Calculio useful:\n\n${title}\n${defaultDesc}\n\nLink: ${resolvedUrl}\n\nCalculio – Free, transparent calculation tools.`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="share-modal-title" className="text-base sm:text-lg font-bold text-[#0F172A]">
                {t('share.modalTitle', 'Share This Page')}
              </h2>
              <p id="share-modal-desc" className="text-xs text-[#64748B]">
                {t('share.modalSubtitle', 'Share this calculator or educational guide with colleagues, friends, or clients')}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('common.close', 'Close')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0]/60 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Resource Preview Card */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            {category && (
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-md border border-[#F97316]/20">
                {category}
              </span>
            )}
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] line-clamp-1">
              {title}
            </h3>
            {defaultDesc && (
              <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                {defaultDesc}
              </p>
            )}
            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-[#64748B] truncate">
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#94A3B8]" />
              <span className="truncate">{resolvedUrl}</span>
            </div>
          </div>

          {/* Social Platforms Grid */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
              {t('share.choosePlatform', 'Share via Platform')}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {shareChannels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={channel.action}
                  className={`min-h-[46px] flex items-center gap-2.5 p-3 rounded-2xl ${channel.bgColor} ${channel.textColor} font-bold text-xs sm:text-sm transition-all transform active:scale-95 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]`}
                  aria-label={`Share on ${channel.name}`}
                >
                  {channel.icon}
                  <span className="truncate">{channel.name}</span>
                </button>
              ))}

              {/* Native Device Share Button (if supported by device) */}
              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="min-h-[46px] flex items-center gap-2.5 p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#F97316]/10 text-[#0F172A] hover:text-[#F97316] border border-[#E2E8F0] hover:border-[#F97316]/30 font-bold text-xs sm:text-sm transition-all transform active:scale-95 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]"
                  aria-label="Share via device options menu"
                >
                  <Smartphone className="w-5 h-5 text-[#F97316] shrink-0" />
                  <span className="truncate">{t('share.more', 'More Options')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Copy Direct Link Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="share-copy-url-input" className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {t('share.directLink', 'Direct Page Link')}
              </label>
              {copied && (
                <span className="text-xs font-bold text-[#10B981] flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Link copied!</span>
                </span>
              )}
              {copyError && (
                <span className="text-xs font-bold text-[#EF4444] flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Could not copy link automatically</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="share-copy-url-input"
                  type="text"
                  readOnly
                  value={resolvedUrl}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full h-11 px-3.5 font-mono text-xs text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:bg-[#FFFFFF] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] select-all transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className={`min-h-[44px] h-11 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316] ${
                  copied 
                    ? 'bg-[#10B981] text-white border border-[#10B981]' 
                    : 'bg-[#F97316] hover:bg-[#EA580C] text-white border border-[#F97316]'
                }`}
                aria-label={copied ? 'Link copied' : 'Copy page link'}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Calculio • Free mathematical and calculation platform</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-[#0F172A] hover:text-[#F97316] transition-colors cursor-pointer"
          >
            {t('common.close', 'Done')}
          </button>
        </div>

      </div>
    </div>
  );
};
