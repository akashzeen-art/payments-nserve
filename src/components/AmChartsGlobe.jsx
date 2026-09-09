import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { markets, paymentRoutes } from '../data/paymentRoutes';

const CORRIDOR_IDS = markets.map((m) => m.id);
const COUNTRY_NAMES = Object.fromEntries(markets.map((m) => [m.id, m.name]));
const SANKEY_DATA = paymentRoutes.map((r, i) => ({
  sourceId: r.from,
  targetId: r.to,
  value: 90 + ((i * 37) % 80),
  id: r.id,
}));

const COLORS = {
  ocean: 0xe8eef5,
  landMuted: 0xd0dae8,
  land: 0xbcc8d9,
  landStroke: 0x94a3b8,
  corridor: 0xea580c,
  corridorDeep: 0xc2410c,
  corridorSoft: 0xfdbA74,
  corridorActive: 0xea580c,
  route: 0xea580c,
  routeSoft: 0xf97316,
  bullet: 0xfbbf24,
  node: 0xdc2626,
  nodeStroke: 0xfff7ed,
  sky: 0x0ea5e9,
  text: 0x0f172a,
  muted: 0x64748b,
};

function applyCountryHighlight(series, selected) {
  if (!series) return;
  am5.array.each(series.dataItems, (di) => {
    const id = di.get('id');
    const poly = di.get('mapPolygon');
    if (!poly || !id) return;

    if (CORRIDOR_IDS.includes(id)) {
      if (selected && id === selected) {
        poly.setAll({
          fill: am5.color(COLORS.corridorDeep),
          stroke: am5.color(COLORS.corridorSoft),
          strokeWidth: 1.6,
          strokeOpacity: 1,
        });
      } else if (selected) {
        const connected = SANKEY_DATA.some(
          (r) =>
            (r.sourceId === selected && r.targetId === id) ||
            (r.targetId === selected && r.sourceId === id),
        );
        poly.setAll({
          fill: am5.color(connected ? COLORS.corridor : COLORS.land),
          stroke: am5.color(connected ? COLORS.corridorSoft : COLORS.landStroke),
          strokeWidth: connected ? 1 : 0.35,
          strokeOpacity: connected ? 0.95 : 0.35,
        });
      } else {
        poly.setAll({
          fill: am5.color(COLORS.corridor),
          stroke: am5.color(COLORS.corridorSoft),
          strokeWidth: 0.9,
          strokeOpacity: 0.9,
        });
      }
    } else {
      poly.setAll({
        fill: am5.color(COLORS.landMuted),
        stroke: am5.color(COLORS.landStroke),
        strokeWidth: 0.35,
        strokeOpacity: 0.4,
      });
    }
  });
}

function applyRouteHighlight(sankeySeries, selected) {
  if (!sankeySeries) return;

  am5.array.each(sankeySeries.dataItems, (di) => {
    const sourceId = di.get('sourceId');
    const targetId = di.get('targetId');
    const poly = di.get('mapPolygon');
    if (!poly) return;

    const related =
      !selected || sourceId === selected || targetId === selected;

    poly.setAll({
      fillOpacity: related ? (selected ? 0.92 : 0.72) : 0.08,
      fill: am5.color(related && selected ? COLORS.routeSoft : COLORS.route),
    });

    const bullets = di.bullets;
    if (bullets) {
      am5.array.each(bullets, (bullet) => {
        const sprite = bullet.get('sprite');
        if (sprite && !sprite.isDisposed()) {
          sprite.set('opacity', related ? 1 : 0.05);
        }
      });
    }
  });

  am5.array.each(sankeySeries.nodes.dataItems, (di) => {
    const id = di.get('id');
    const poly = di.get('mapPolygon');
    if (!poly || !id) return;

    const related =
      !selected ||
      id === selected ||
      SANKEY_DATA.some(
        (r) =>
          (r.sourceId === selected && r.targetId === id) ||
          (r.targetId === selected && r.sourceId === id),
      );

    poly.setAll({
      fillOpacity: related ? 1 : 0.15,
      strokeOpacity: related ? 1 : 0.15,
      strokeWidth: selected && id === selected ? 2.5 : 2,
    });
  });
}

export default function AmChartsGlobe({ selectedId = null, onSelect }) {
  const hostRef = useRef(null);
  const polygonSeriesRef = useRef(null);
  const sankeySeriesRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedId);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    selectedRef.current = selectedId;
    applyCountryHighlight(polygonSeriesRef.current, selectedId);
    applyRouteHighlight(sankeySeriesRef.current, selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const root = am5.Root.new(hostRef.current);
    if (root._logo) root._logo.dispose();

    const nserveTheme = am5.Theme.new(root);
    nserveTheme.rule('InterfaceColors').setAll({
      primaryButton: am5.color(0xea580c),
      primaryButtonHover: am5.color(0xc2410c),
      primaryButtonDown: am5.color(0x9a3412),
      primaryButtonActive: am5.color(0xf97316),
      primaryButtonText: am5.color(0xffffff),
      secondaryButton: am5.color(0xe2e8f0),
      secondaryButtonHover: am5.color(0xcbd5e1),
      secondaryButtonDown: am5.color(0x94a3b8),
      secondaryButtonText: am5.color(0x0f172a),
      background: am5.color(0xf5f7fb),
      text: am5.color(COLORS.text),
      alternativeText: am5.color(COLORS.muted),
      grid: am5.color(0xcbd5e1),
    });
    root.setThemes([am5themes_Animated.new(root), nserveTheme]);

    // Soft ocean field
    root.container.set(
      'background',
      am5.Rectangle.new(root, {
        fill: am5.color(COLORS.ocean),
        fillGradient: am5.LinearGradient.new(root, {
          rotation: 160,
          stops: [
            { color: am5.color(0xf8fafc) },
            { color: am5.color(0xe8eef5) },
            { color: am5.color(0xdce6f0) },
          ],
        }),
      }),
    );

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelX: 'none',
        wheelY: 'none',
        pinchZoom: false,
        projection: am5map.geoMercator(),
        rotationX: 0,
        rotationY: 0,
        zoomLevel: 1.58,
        minZoomLevel: 1.58,
        maxZoomLevel: 1.58,
        paddingTop: 20,
        paddingBottom: 28,
        paddingLeft: 8,
        paddingRight: 8,
      }),
    );

    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xd5e0ec),
      fillOpacity: 0.35,
      strokeOpacity: 0,
    });
    bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0x94a3b8),
      strokeOpacity: 0.18,
      strokeWidth: 0.45,
    });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      }),
    );
    polygonSeriesRef.current = polygonSeries;

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(COLORS.landMuted),
      stroke: am5.color(COLORS.landStroke),
      strokeWidth: 0.35,
      strokeOpacity: 0.45,
      tooltipText: '{name}',
      interactive: true,
      cursorOverStyle: 'pointer',
    });

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(COLORS.corridorSoft),
      stroke: am5.color(COLORS.corridor),
      strokeWidth: 0.8,
    });

    polygonSeries.set(
      'tooltip',
      am5.Tooltip.new(root, {
        getFillFromSprite: false,
        autoTextColor: false,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }),
    );
    polygonSeries.get('tooltip').get('background').setAll({
      fill: am5.color(0xffffff),
      fillOpacity: 0.96,
      stroke: am5.color(0xe2e8f0),
      strokeWidth: 1,
      shadowColor: am5.color(0x0f172a),
      shadowBlur: 16,
      shadowOpacity: 0.12,
      cornerRadius: 8,
    });
    polygonSeries.get('tooltip').label.setAll({
      fill: am5.color(COLORS.text),
      fontSize: 12,
      fontWeight: '600',
    });

    polygonSeries.events.on('datavalidated', () => {
      applyCountryHighlight(polygonSeries, selectedRef.current);
    });

    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      const id = ev.target.dataItem?.get('id');
      if (!id || !CORRIDOR_IDS.includes(id)) return;
      const next = selectedRef.current === id ? null : id;
      onSelectRef.current?.(next);
    });

    const sankeySeries = chart.series.push(
      am5map.MapSankeySeries.new(root, {
        polygonSeries,
        maxWidth: 2.8,
        controlPointDistance: 0.45,
        resolution: 64,
        nodePadding: 0.3,
      }),
    );
    sankeySeriesRef.current = sankeySeries;

    sankeySeries.mapPolygons.template.setAll({
      fill: am5.color(COLORS.route),
      fillOpacity: 0.72,
      strokeOpacity: 0,
      tooltipText: '{sourceNode.name} → {targetNode.name}',
    });

    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: am5.color(COLORS.node),
      stroke: am5.color(COLORS.nodeStroke),
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      tooltipText: '{name}',
    });

    // Outer halo nodes for market presence
    sankeySeries.nodes.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 7,
          fill: am5.color(COLORS.corridor),
          fillOpacity: 0.18,
          strokeOpacity: 0,
        }),
      }),
    );

    sankeySeries.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Circle.new(root, {
          radius: 2.6,
          fill: am5.color(COLORS.bullet),
          stroke: am5.color(0xffffff),
          strokeWidth: 0.8,
          opacity: 0.95,
          visible: false,
          shadowColor: am5.color(COLORS.bullet),
          shadowBlur: 8,
          shadowOpacity: 0.55,
        }),
      }),
    );

    sankeySeries.set(
      'tooltip',
      am5.Tooltip.new(root, {
        getFillFromSprite: false,
        autoTextColor: false,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }),
    );
    sankeySeries.get('tooltip').get('background').setAll({
      fill: am5.color(0x0f172a),
      fillOpacity: 0.92,
      strokeOpacity: 0,
      cornerRadius: 8,
    });
    sankeySeries.get('tooltip').label.setAll({
      fill: am5.color(0xffffff),
      fontSize: 12,
      fontWeight: '500',
    });

    sankeySeries.data.setAll(SANKEY_DATA);

    sankeySeries.events.on('datavalidated', () => {
      am5.array.each(sankeySeries.nodes.dataItems, (di) => {
        const id = di.get('id');
        if (id && COUNTRY_NAMES[id]) di.set('name', COUNTRY_NAMES[id]);
      });

      applyRouteHighlight(sankeySeries, selectedRef.current);

      am5.array.each(sankeySeries.dataItems, (dataItem) => {
        const bullets = dataItem.bullets;
        if (!bullets) return;
        am5.array.each(bullets, (bullet) => {
          const randomDur = 2600 + Math.random() * 3000;
          const delay = Math.random() * randomDur;
          window.setTimeout(() => {
            const sprite = bullet.get('sprite');
            if (sprite && !sprite.isDisposed()) sprite.set('visible', true);
            if (!bullet.isDisposed()) {
              bullet.animate({
                key: 'locationX',
                from: 0,
                to: 1,
                duration: randomDur,
                easing: am5.ease.linear,
                loops: Infinity,
              });
            }
          }, delay);
        });
      });
    });

    // Caption lives in React overlay — keep map canvas clean
    chart.appear(1100, 80);

    return () => {
      root.dispose();
      polygonSeriesRef.current = null;
      sankeySeriesRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] bg-[#E8EEF5]">
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 38%, transparent 42%, rgba(232,238,245,0.45) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        ref={hostRef}
        className="relative z-0 w-full h-full"
        role="img"
        aria-label="nSERVE global payment corridor map"
      />

      {/* Legend — bottom-right so it never clashes with Explore markets */}
      <div className="pointer-events-none absolute bottom-5 right-4 sm:right-5 z-[2]">
        <div className="flex flex-col gap-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-2.5 shadow-[0_12px_30px_-16px_rgba(15,23,42,0.35)]">
          <p className="px-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Legend
          </p>
          <div className="inline-flex items-center gap-2 px-1 py-0.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-orange-600 shrink-0" />
            <span className="text-[11px] font-medium text-slate-600">Corridor market</span>
          </div>
          <div className="inline-flex items-center gap-2 px-1 py-0.5">
            <span className="h-0.5 w-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 shrink-0" />
            <span className="text-[11px] font-medium text-slate-600">Payment route</span>
          </div>
          <div className="inline-flex items-center gap-2 px-1 py-0.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-amber-400/50 animate-ping" />
              <span className="relative rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
            <span className="text-[11px] font-medium text-slate-600">Live flow</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-4 left-4 sm:left-5 z-[2] hidden sm:block">
        <div className="rounded-xl bg-white/85 backdrop-blur-md border border-slate-200/80 px-3 py-2 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-800 tracking-tight">
            nSERVE Payment Corridors
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Click a market to focus routes
          </p>
        </div>
      </div>
    </div>
  );
}
