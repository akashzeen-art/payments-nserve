import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { markets, paymentRoutes } from '../data/paymentRoutes';

const CORRIDOR_IDS = markets.map((m) => m.id);
const SANKEY_DATA = paymentRoutes.map((r, i) => ({
  sourceId: r.from,
  targetId: r.to,
  value: 90 + i * 20,
}));

const ease = [0.22, 1, 0.36, 1];

const STATUS_LINES = [
  'Mapping corridors',
  'Connecting currencies',
  'Aligning stakeholders',
  'Ready to serve',
];

/**
 * Full-screen globe preloader — amCharts orthographic globe with corridor flows.
 */
export default function GlobePreloader({ onDone, durationMs = 3400 }) {
  const hostRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const root = am5.Root.new(hostRef.current);
    if (root._logo) root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    root.container.set(
      'background',
      am5.Rectangle.new(root, {
        fill: am5.color(0xf5f7fb),
      }),
    );

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        rotationX: -18,
        rotationY: -6,
        zoomLevel: 1.05,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }),
    );

    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdbe4ef),
      fillOpacity: 1,
      strokeOpacity: 0,
    });
    bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0x94a3b8),
      strokeOpacity: 0.22,
      strokeWidth: 0.5,
    });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xc5d0de),
      stroke: am5.color(0x94a3b8),
      strokeWidth: 0.4,
      strokeOpacity: 0.5,
    });

    polygonSeries.events.on('datavalidated', () => {
      am5.array.each(polygonSeries.dataItems, (di) => {
        const id = di.get('id');
        const poly = di.get('mapPolygon');
        if (!poly || !id) return;
        if (CORRIDOR_IDS.includes(id)) {
          poly.setAll({
            fill: am5.color(0xb45309),
            stroke: am5.color(0xf97316),
            strokeWidth: 0.8,
            strokeOpacity: 0.9,
          });
        }
      });
    });

    const sankeySeries = chart.series.push(
      am5map.MapSankeySeries.new(root, {
        polygonSeries,
        controlPointDistance: 0.4,
        resolution: 48,
        nodePadding: 0.25,
      }),
    );

    sankeySeries.mapPolygons.template.setAll({
      fill: am5.color(0xea580c),
      fillOpacity: 0.78,
      strokeOpacity: 0,
    });

    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: am5.color(0xdc2626),
      stroke: am5.color(0xffedd5),
      strokeWidth: 1.4,
      fillOpacity: 0.95,
    });

    sankeySeries.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Circle.new(root, {
          radius: 2.4,
          fill: am5.color(0xfbbf24),
          stroke: am5.color(0xffffff),
          strokeWidth: 0.5,
          visible: false,
        }),
      }),
    );

    sankeySeries.data.setAll(SANKEY_DATA);

    sankeySeries.events.on('datavalidated', () => {
      am5.array.each(sankeySeries.dataItems, (dataItem) => {
        const bullets = dataItem.bullets;
        if (!bullets) return;
        am5.array.each(bullets, (bullet) => {
          const dur = 2400 + Math.random() * 2600;
          window.setTimeout(() => {
            const sprite = bullet.get('sprite');
            if (sprite && !sprite.isDisposed()) sprite.set('visible', true);
            if (!bullet.isDisposed()) {
              bullet.animate({
                key: 'locationX',
                from: 0,
                to: 1,
                duration: dur,
                easing: am5.ease.linear,
                loops: Infinity,
              });
            }
          }, Math.random() * dur);
        });
      });
    });

    chart.animate({
      key: 'rotationX',
      from: -18,
      to: -18 + 360,
      duration: 90000,
      loops: Infinity,
      easing: am5.ease.linear,
    });

    chart.appear(900, 60);

    return () => root.dispose();
  }, []);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const t = Math.min((now - start) / durationMs, 1);
      // Ease-out progress for a more premium feel
      const eased = 1 - (1 - t) ** 2.2;
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs]);

  useEffect(() => {
    const step = durationMs / STATUS_LINES.length;
    const timers = STATUS_LINES.map((_, i) =>
      window.setTimeout(() => setStatusIndex(i), Math.min(step * i, durationMs - 120)),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [durationMs]);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#F5F7FB] flex flex-col overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.85, ease }}
          aria-label="Loading nSERVE"
          aria-live="polite"
          role="status"
        >
          {/* Atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 50% 42%, rgba(14,165,233,0.12), transparent 52%), radial-gradient(ellipse at 20% 80%, rgba(234,88,12,0.1), transparent 42%), radial-gradient(ellipse at 80% 18%, rgba(245,158,11,0.08), transparent 40%)',
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 z-[1] grid-bg opacity-30" aria-hidden="true" />

          {/* Soft vignette so globe reads as the centerpiece */}
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 35%, rgba(245,247,251,0.55) 72%, rgba(245,247,251,0.92) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Globe canvas */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease }}
          >
            <div ref={hostRef} className="w-full h-full" />
          </motion.div>

          {/* Brand + progress overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
            {/* Top brand lockup */}
            <motion.div
              className="flex items-center justify-center gap-3 pt-10 sm:pt-12"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              <img
                src="/nservelogo.png"
                alt=""
                className="h-10 sm:h-12 w-auto object-contain"
                aria-hidden="true"
              />
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                nSERVE
              </span>
            </motion.div>

            {/* Spacer pushes bottom UI down; globe stays centered */}
            <div className="flex-1" />

            {/* Bottom status panel */}
            <motion.div
              className="px-6 pb-12 sm:pb-16 flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease }}
            >
              <div className="text-center space-y-2">
                <p className="font-display text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                  Connecting across borders
                </p>
                <div className="h-5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={STATUS_LINES[statusIndex]}
                      className="text-sm text-slate-500 tracking-wide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      {STATUS_LINES[statusIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full max-w-[16rem] space-y-2">
                <div className="relative h-1 rounded-full bg-slate-200/90 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400"
                    style={{ width: `${progress}%` }}
                  />
                  <motion.div
                    className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ left: ['-20%', '120%'] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  <span>Loading</span>
                  <span className="tabular-nums text-orange-600/90 font-semibold">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Corridor hint dots */}
              <div className="flex items-center gap-2 pt-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-orange-500"
                    animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
