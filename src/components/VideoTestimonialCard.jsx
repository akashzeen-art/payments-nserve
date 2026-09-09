import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideoTestimonialCard({ testimonial, onClick }) {
  const [hovered, setHovered] = useState(false);

  const activate = () => onClick(testimonial);

  return (
    <motion.article
      className="relative rounded-2xl overflow-hidden cursor-pointer group border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-500/40"
      style={{ aspectRatio: '4/5' }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={activate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          }
        }}
        className="absolute inset-0 w-full h-full text-left"
        aria-label={`Play testimonial from ${testimonial.name}`}
      >
        <img
          src={testimonial.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/55 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center"
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          <p className="text-white text-sm leading-relaxed mb-3 line-clamp-3">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {testimonial.name[0]}
            </div>
            <div>
              <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                {testimonial.name}
                <span aria-hidden="true">{testimonial.country}</span>
              </div>
              <div className="text-slate-300 text-xs">
                {testimonial.title} · {testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
