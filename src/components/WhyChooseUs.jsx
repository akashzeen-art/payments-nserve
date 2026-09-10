import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  HandCoins,
  Lock,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const connections = [
  {
    want: {
      title: 'Money security',
      desc: 'Capital protected at every stage of the corridor journey.',
      icon: Wallet,
    },
    why: {
      title: '100% insured deal',
      desc: 'Every transaction structured with full deal insurance.',
      icon: ShieldCheck,
    },
  },
  {
    want: {
      title: 'Secured platform',
      desc: 'A trusted environment for cross-border payment coordination.',
      icon: Lock,
    },
    why: {
      title: 'Licensed escrow backup',
      desc: 'Back-up finances as per deposits through a licensed escrow account.',
      icon: BadgeCheck,
    },
  },
  {
    want: {
      title: 'Assurance',
      desc: 'Confidence that process, compliance and outcomes stay aligned.',
      icon: Shield,
    },
    why: {
      title: 'Flexible charges',
      desc: 'Clear, adaptable commercial terms shaped around your corridor needs.',
      icon: HandCoins,
    },
  },
  {
    want: {
      title: 'Timely revert / update',
      desc: 'Fast visibility when status changes across stakeholders.',
      icon: Timer,
    },
    why: {
      title: 'Works within time frame',
      desc: 'Execution and updates kept inside agreed operating windows.',
      icon: Clock3,
    },
  },
  {
    want: {
      title: 'Known working channels',
      desc: 'Predictable rails and partners you can rely on repeatedly.',
      icon: Route,
    },
    why: {
      title: 'Customisation of model',
      desc: 'Corridor models tailored to your markets, currencies and process.',
      icon: Sparkles,
    },
  },
];

const CARD_W = 360;
const CARD_GAP = 48;
const COPIES = 4;

function StreamCard({ item, index }) {
  const WantIcon = item.want.icon;
  const WhyIcon = item.why.icon;
  const num = String((index % connections.length) + 1).padStart(2, '0');

  return (
    <div className="why-card-wrapper" data-index={index}>
      {/* Before scanner — What you want */}
      <div className="why-card why-card-normal">
        <div className="why-card-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55">
              {num} · Connected value
            </span>
            <span className="text-[10px] font-semibold tracking-wide uppercase text-sky-300/90">
              What you want?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
              <WantIcon size={18} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold text-white leading-snug tracking-tight">
                {item.want.title}
              </p>
              <p className="mt-2 text-[13px] text-white/75 leading-relaxed whitespace-normal">
                {item.want.desc}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] text-white/45">
            <span className="h-px flex-1 bg-white/15" />
            Pass scanner to see why us
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </div>
      </div>

      {/* After scanner — Why choose us */}
      <div className="why-card why-card-reveal">
        <div className="why-card-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-orange-300/90">
              {num} · Why Us!
            </span>
            <span className="text-[10px] font-semibold tracking-wide uppercase text-orange-200/80">
              Why choose us
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/35">
              <WhyIcon size={18} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold text-white leading-snug tracking-tight">
                {item.why.title}
              </p>
              <p className="mt-2 text-[13px] text-white/80 leading-relaxed whitespace-normal">
                {item.why.desc}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <p className="text-[11px] text-sky-200/70 leading-snug whitespace-normal">
              You need <span className="text-white font-semibold">{item.want.title}</span>
              {' — '}nSERVE delivers it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 space-y-4">
      {connections.map((row) => {
        const WantIcon = row.want.icon;
        const WhyIcon = row.why.icon;
        return (
          <div
            key={row.want.title}
            className="grid sm:grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
                <WantIcon size={18} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-sky-600 mb-0.5">What you want?</p>
                <p className="font-display font-bold text-slate-900">{row.want.title}</p>
                <p className="text-sm text-slate-600 mt-1">{row.want.desc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white">
                <WhyIcon size={18} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-orange-600 mb-0.5">Why we?</p>
                <p className="font-display font-bold text-slate-900">{row.why.title}</p>
                <p className="text-sm text-slate-600 mt-1">{row.why.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function WhyChooseUs() {
  const streamRef = useRef(null);
  const lineRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    position: 0,
    velocity: 90,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastMouseX: 0,
    mouseVelocity: 0,
    lastTime: 0,
    friction: 0.96,
    minVelocity: 40,
    lineWidth: 0,
    containerWidth: 0,
  });
  const particlesRef = useRef([]);
  const scanningRef = useRef(false);
  const glowRef = useRef(1);
  const rafRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const deck = Array.from({ length: COPIES }, () => connections).flat();

  const measure = useCallback(() => {
    const s = stateRef.current;
    const line = lineRef.current;
    const stream = streamRef.current;
    if (!line || !stream) return;
    s.containerWidth = stream.offsetWidth;
    s.lineWidth = (CARD_W + CARD_GAP) * line.children.length;
  }, []);

  const updateClipping = useCallback(() => {
    const wrappers = lineRef.current?.querySelectorAll('.why-card-wrapper');
    if (!wrappers) return;

    const scannerX = window.innerWidth / 2;
    const half = 5;
    const left = scannerX - half;
    const right = scannerX + half;
    let scanning = false;

    wrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const normal = wrapper.querySelector('.why-card-normal');
      const reveal = wrapper.querySelector('.why-card-reveal');
      if (!normal || !reveal) return;

      if (rect.left < right && rect.right > left) {
        scanning = true;
        const intersectL = Math.max(left - rect.left, 0);
        const intersectR = Math.min(right - rect.left, rect.width);
        normal.style.setProperty('--clip-right', `${(intersectL / rect.width) * 100}%`);
        reveal.style.setProperty('--clip-left', `${(intersectR / rect.width) * 100}%`);

        if (!wrapper.hasAttribute('data-scanned') && intersectL > 0) {
          wrapper.setAttribute('data-scanned', 'true');
          const flash = document.createElement('div');
          flash.className = 'why-scan-effect';
          wrapper.appendChild(flash);
          setTimeout(() => flash.remove(), 550);
        }
      } else {
        if (rect.right < left) {
          normal.style.setProperty('--clip-right', '100%');
          reveal.style.setProperty('--clip-left', '100%');
        } else {
          normal.style.setProperty('--clip-right', '0%');
          reveal.style.setProperty('--clip-left', '0%');
        }
        wrapper.removeAttribute('data-scanned');
      }
    });

    scanningRef.current = scanning;
  }, []);

  const applyTransform = useCallback(() => {
    const s = stateRef.current;
    const line = lineRef.current;
    if (!line) return;

    if (s.position < -s.lineWidth) s.position = s.containerWidth;
    else if (s.position > s.containerWidth) s.position = -s.lineWidth;

    line.style.transform = `translate3d(${s.position}px, 0, 0)`;
    updateClipping();
  }, [updateClipping]);

  // Particle scanner (canvas 2d — brand orange/sky, no Three.js)
  useEffect(() => {
    if (reducedMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    const h = 300;
    let count = 0;
    const particles = [];
    particlesRef.current = particles;

    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 16;
    gradientCanvas.height = 16;
    const gctx = gradientCanvas.getContext('2d');
    const half = 8;
    const g = gctx.createRadialGradient(half, half, 0, half, half, half);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(251,146,60,0.85)');
    g.addColorStop(0.7, 'rgba(14,165,233,0.35)');
    g.addColorStop(1, 'transparent');
    gctx.fillStyle = g;
    gctx.beginPath();
    gctx.arc(half, half, half, 0, Math.PI * 2);
    gctx.fill();

    const resize = () => {
      w = window.innerWidth;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const makeParticle = () => {
      const barX = w / 2;
      return {
        x: barX + (Math.random() - 0.5) * 4,
        y: Math.random() * h,
        vx: 0.25 + Math.random() * 0.9,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.5 + Math.random() * 0.7,
        alpha: 0.55 + Math.random() * 0.4,
        decay: 0.008 + Math.random() * 0.02,
        life: 1,
        time: 0,
        twinkle: 0.03 + Math.random() * 0.05,
      };
    };

    for (let i = 0; i < 180; i++) {
      particles[++count] = makeParticle();
    }

    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      const scanning = scanningRef.current;
      const targetGlow = scanning ? 2.6 : 1;
      glowRef.current += (targetGlow - glowRef.current) * 0.06;
      const glow = glowRef.current;
      const maxP = scanning ? 900 : 220;
      const fadeZone = scanning ? 40 : 55;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      // Light bar
      ctx.globalCompositeOperation = 'lighter';
      const barX = w / 2;
      const lineW = 3;

      const core = ctx.createLinearGradient(barX - lineW / 2, 0, barX + lineW / 2, 0);
      core.addColorStop(0, 'rgba(255,255,255,0)');
      core.addColorStop(0.5, `rgba(255,255,255,${0.95 * glow})`);
      core.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.roundRect(barX - lineW / 2, 0, lineW, h, 12);
      ctx.fill();

      const glow1 = ctx.createLinearGradient(barX - 10, 0, barX + 10, 0);
      glow1.addColorStop(0, 'rgba(234,88,12,0)');
      glow1.addColorStop(0.5, `rgba(251,146,60,${0.55 * glow})`);
      glow1.addColorStop(1, 'rgba(234,88,12,0)');
      ctx.globalAlpha = scanning ? 0.95 : 0.7;
      ctx.fillStyle = glow1;
      ctx.beginPath();
      ctx.roundRect(barX - 10, 0, 20, h, 18);
      ctx.fill();

      const glow2 = ctx.createLinearGradient(barX - 22, 0, barX + 22, 0);
      glow2.addColorStop(0, 'rgba(14,165,233,0)');
      glow2.addColorStop(0.5, `rgba(56,189,248,${0.28 * glow})`);
      glow2.addColorStop(1, 'rgba(14,165,233,0)');
      ctx.globalAlpha = scanning ? 0.75 : 0.45;
      ctx.fillStyle = glow2;
      ctx.beginPath();
      ctx.roundRect(barX - 22, 0, 44, h, 24);
      ctx.fill();

      // Vertical fade mask
      ctx.globalCompositeOperation = 'destination-in';
      const vg = ctx.createLinearGradient(0, 0, 0, h);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(fadeZone / h, 'rgba(0,0,0,1)');
      vg.addColorStop(1 - fadeZone / h, 'rgba(0,0,0,1)');
      vg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1; i <= count; i++) {
        const p = particles[i];
        if (!p) continue;
        p.x += p.vx * (scanning ? 1.35 : 1);
        p.y += p.vy;
        p.time += 1;
        p.life -= p.decay;
        p.alpha = Math.max(0, Math.min(1, p.life + Math.sin(p.time * p.twinkle) * 0.12));

        if (p.x > w + 20 || p.life <= 0) {
          Object.assign(p, makeParticle());
        }

        let fade = 1;
        if (p.y < fadeZone) fade = p.y / fadeZone;
        else if (p.y > h - fadeZone) fade = (h - p.y) / fadeZone;
        fade = Math.max(0, Math.min(1, fade));

        ctx.globalAlpha = p.alpha * fade;
        ctx.drawImage(gradientCanvas, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }

      if (Math.random() < (scanning ? 0.9 : 0.35) && count < maxP) {
        particles[++count] = makeParticle();
      }
      if (count > maxP + 80) {
        const excess = Math.min(12, count - maxP);
        for (let i = 0; i < excess; i++) delete particles[count - i];
        count -= excess;
      }
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  // Card stream animation + drag
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const s = stateRef.current;
    const line = lineRef.current;
    if (!line) return undefined;

    measure();
    s.position = s.containerWidth * 0.15;
    s.lastTime = performance.now();
    applyTransform();

    const onResize = () => {
      measure();
      applyTransform();
    };
    window.addEventListener('resize', onResize);

    const startDrag = (clientX) => {
      s.isDragging = true;
      s.isAnimating = false;
      s.lastMouseX = clientX;
      s.mouseVelocity = 0;
      line.classList.add('dragging');
    };

    const onDrag = (clientX) => {
      if (!s.isDragging) return;
      const dx = clientX - s.lastMouseX;
      s.position += dx;
      s.mouseVelocity = dx * 60;
      s.lastMouseX = clientX;
      applyTransform();
    };

    const endDrag = () => {
      if (!s.isDragging) return;
      s.isDragging = false;
      line.classList.remove('dragging');
      if (Math.abs(s.mouseVelocity) > s.minVelocity) {
        s.velocity = Math.abs(s.mouseVelocity);
        s.direction = s.mouseVelocity > 0 ? 1 : -1;
      } else {
        s.velocity = 90;
      }
      s.isAnimating = true;
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX);
    };
    const onMouseMove = (e) => onDrag(e.clientX);
    const onTouchStart = (e) => {
      if (e.touches[0]) startDrag(e.touches[0].clientX);
    };
    const onTouchMove = (e) => {
      if (e.touches[0]) onDrag(e.touches[0].clientX);
    };
    const onWheel = (e) => {
      e.preventDefault();
      s.position += e.deltaY > 0 ? 24 : -24;
      applyTransform();
    };

    line.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', endDrag);
    line.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', endDrag);
    line.addEventListener('wheel', onWheel, { passive: false });

    const tick = (now) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - s.lastTime) / 1000);
      s.lastTime = now;

      if (s.isAnimating && !s.isDragging) {
        if (s.velocity > s.minVelocity) s.velocity *= s.friction;
        else s.velocity = Math.max(s.minVelocity, s.velocity);
        s.position += s.velocity * s.direction * dt;
        applyTransform();
      } else {
        updateClipping();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      line.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', endDrag);
      line.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', endDrag);
      line.removeEventListener('wheel', onWheel);
    };
  }, [reducedMotion, measure, applyTransform, updateClipping]);

  return (
    <section
      id="why-us"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20"
      aria-label="Why Us"
    >
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 0%, rgba(14,165,233,0.1), transparent 45%), radial-gradient(ellipse at 80% 10%, rgba(234,88,12,0.1), transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 text-center mb-10 sm:mb-12">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-orange-700 text-xs font-semibold tracking-[0.16em] uppercase mb-5"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <Sparkles size={13} />
          Connected value
        </motion.p>
        <motion.h2
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06, ease }}
        >
          Why Us!
        </motion.h2>
        <motion.p
          className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12, ease }}
        >
          What you want and why we deliver — scanned into one clear operating model.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-7"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white text-xs font-semibold tracking-wide uppercase px-4 py-2 shadow-lg shadow-sky-600/25">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
            What you want?
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm">
            <ArrowRight size={14} className="hidden sm:inline" />
            connected to
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-600 text-white text-xs font-semibold tracking-wide uppercase px-4 py-2 shadow-lg shadow-orange-600/25">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            Why we?
          </span>
        </motion.div>
      </div>

      {reducedMotion ? (
        <StaticFallback />
      ) : (
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="why-stream-band">
            <div className="why-stream-container" ref={streamRef}>
              <canvas id="whyScannerCanvas" ref={canvasRef} className="why-scanner-canvas" aria-hidden="true" />
              <div className="why-card-stream">
                <div className="why-card-line" ref={lineRef}>
                  {deck.map((item, i) => (
                    <StreamCard key={`${item.want.title}-${i}`} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
