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
  value: 80 + ((i * 37) % 90),
}));

const COLORS = {
  landMuted: 0xc5d0de,
  land: 0xb8c5d6,
  slate: 0x94a3b8,
  corridorFill: 0xb45309,
  corridorActive: 0xdc2626,
  accentSoft: 0xf97316,
  warm: 0xfed7aa,
};

function applyHighlight(series, selected) {
  if (!series) return;
  am5.array.each(series.dataItems, (di) => {
    const id = di.get('id');
    const poly = di.get('mapPolygon');
    if (!poly || !id) return;

    if (CORRIDOR_IDS.includes(id)) {
      if (selected && id === selected) {
        poly.setAll({
          fill: am5.color(COLORS.corridorActive),
          stroke: am5.color(COLORS.warm),
          strokeWidth: 1.2,
          strokeOpacity: 1,
        });
      } else if (selected) {
        const connected = SANKEY_DATA.some(
          (r) =>
            (r.sourceId === selected && r.targetId === id) ||
            (r.targetId === selected && r.sourceId === id),
        );
        poly.setAll({
          fill: am5.color(connected ? COLORS.corridorFill : COLORS.land),
          stroke: am5.color(COLORS.slate),
          strokeWidth: 0.4,
          strokeOpacity: connected ? 0.9 : 0.4,
        });
      } else {
        poly.setAll({
          fill: am5.color(COLORS.corridorFill),
          stroke: am5.color(COLORS.accentSoft),
          strokeWidth: 0.7,
          strokeOpacity: 0.85,
        });
      }
    } else {
      poly.setAll({
        fill: am5.color(COLORS.landMuted),
        stroke: am5.color(COLORS.slate),
        strokeWidth: 0.4,
        strokeOpacity: 0.45,
      });
    }
  });
}

export default function AmChartsGlobe({ selectedId = null, onSelect }) {
  const hostRef = useRef(null);
  const polygonSeriesRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedId);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    selectedRef.current = selectedId;
    applyHighlight(polygonSeriesRef.current, selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const root = am5.Root.new(hostRef.current);
    if (root._logo) root._logo.dispose();

    const nserveTheme = am5.Theme.new(root);
    nserveTheme.rule('InterfaceColors').setAll({
      primaryButton: am5.color(0xea580c),
      primaryButtonHover: am5.color(0xdc2626),
      primaryButtonDown: am5.color(0x9a3412),
      primaryButtonActive: am5.color(0xf97316),
      primaryButtonText: am5.color(0xffffff),
      secondaryButton: am5.color(0xe2e8f0),
      secondaryButtonHover: am5.color(0xcbd5e1),
      secondaryButtonDown: am5.color(0x94a3b8),
      secondaryButtonText: am5.color(0x0f172a),
      background: am5.color(0xf5f7fb),
      text: am5.color(0x0f172a),
      alternativeText: am5.color(0x64748b),
      grid: am5.color(0xcbd5e1),
    });
    root.setThemes([am5themes_Animated.new(root), nserveTheme]);

    root.container.set(
      'background',
      am5.Rectangle.new(root, {
        fill: am5.color(0xf5f7fb),
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.25,
          maxOpacity: 0.04,
          colors: [am5.color(0x0f172a)],
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
        zoomLevel: 1.55,
        minZoomLevel: 1.55,
        maxZoomLevel: 1.55,
        paddingBottom: 48,
      }),
    );

    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdbe4ef),
      fillOpacity: 0,
      strokeOpacity: 0,
    });
    bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0x94a3b8),
      strokeOpacity: 0.28,
      strokeWidth: 0.5,
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
      stroke: am5.color(COLORS.slate),
      strokeWidth: 0.4,
      strokeOpacity: 0.55,
      tooltipText: '{name}',
      interactive: true,
      cursorOverStyle: 'pointer',
    });
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(COLORS.accentSoft),
    });
    polygonSeries.events.on('datavalidated', () => {
      applyHighlight(polygonSeries, selectedRef.current);
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
        maxWidth: 2.4,
        controlPointDistance: 0.42,
        resolution: 56,
        nodePadding: 0.28,
      }),
    );
    sankeySeries.mapPolygons.template.setAll({
      fill: am5.color(0xea580c),
      fillOpacity: 0.7,
      strokeOpacity: 0,
      tooltipText: '{sourceNode.name} → {targetNode.name}',
    });
    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: am5.color(COLORS.corridorActive),
      stroke: am5.color(0xffedd5),
      strokeWidth: 1.5,
      fillOpacity: 0.95,
      strokeOpacity: 1,
      tooltipText: '{name}',
    });
    sankeySeries.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Circle.new(root, {
          radius: 2.4,
          fill: am5.color(0xfbbf24),
          stroke: am5.color(0xffffff),
          strokeWidth: 0.6,
          opacity: 0.95,
          visible: false,
        }),
      }),
    );
    sankeySeries.data.setAll(SANKEY_DATA);
    sankeySeries.events.on('datavalidated', () => {
      am5.array.each(sankeySeries.nodes.dataItems, (di) => {
        const id = di.get('id');
        if (id && COUNTRY_NAMES[id]) di.set('name', COUNTRY_NAMES[id]);
      });
      am5.array.each(sankeySeries.dataItems, (dataItem) => {
        const bullets = dataItem.bullets;
        if (!bullets) return;
        am5.array.each(bullets, (bullet) => {
          const randomDur = 2800 + Math.random() * 3200;
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

    const titleCont = chart.children.push(
      am5.Container.new(root, {
        layout: root.verticalLayout,
        x: am5.p50,
        centerX: am5.p50,
        y: am5.p100,
        centerY: am5.p100,
        position: 'absolute',
        paddingBottom: 12,
      }),
    );
    titleCont.children.push(
      am5.Label.new(root, {
        text: 'nSERVE Payment Corridors',
        fontSize: 15,
        fontWeight: '600',
        fill: am5.color(0x0f172a),
        x: am5.p50,
        centerX: am5.p50,
      }),
    );
    titleCont.children.push(
      am5.Label.new(root, {
        text: 'Connecting people, payments & processes across borders',
        fontSize: 11,
        fill: am5.color(0x64748b),
        x: am5.p50,
        centerX: am5.p50,
      }),
    );

    chart.appear(1000, 100);

    return () => {
      root.dispose();
      polygonSeriesRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="w-full h-[480px] sm:h-[560px] lg:h-[620px] bg-[#F5F7FB]"
      role="img"
      aria-label="nSERVE global payment corridor map"
    />
  );
}

