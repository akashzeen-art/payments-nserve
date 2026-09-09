import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!video) return undefined;
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && closeRef.current) {
        e.preventDefault();
        closeRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${video.name}`}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
              aria-label="Close video"
            >
              <X size={16} />
            </button>
            <div className="aspect-video bg-slate-900">
              <video
                key={video.videoUrl}
                src={video.videoUrl}
                controls
                playsInline
                autoPlay
                muted
                className="w-full h-full object-cover"
                aria-label={`Testimonial from ${video.name}`}
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-slate-900 font-medium mb-2 leading-relaxed">&ldquo;{video.quote}&rdquo;</p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span aria-hidden="true">{video.country}</span>
                <span aria-hidden="true">·</span>
                <span>{video.name}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {video.title}, {video.company}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
