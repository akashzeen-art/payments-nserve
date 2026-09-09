import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { currencies } from '../data/currencies';

function createDotIcon(active) {
  return L.divIcon({
    className: '',
    html: `<div class="map-marker-dot${active ? '' : ' dim'}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

/** Approximate a gently arched corridor between two lat/lng points. */
function corridorPositions(from, to, steps = 36) {
  const [lat1, lng1] = from;
  const [lat2, lng2] = to;
  const lift = Math.max(Math.abs(lng2 - lng1), Math.abs(lat2 - lat1)) * 0.22 + 4;
  const midLat = (lat1 + lat2) / 2 + lift;
  const midLng = (lng1 + lng2) / 2;
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
    const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
    pts.push([lat, lng]);
  }
  return pts;
}

function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (!markers?.length) return;
    const bounds = L.latLngBounds(markers.map((m) => m.coords));
    map.fitBounds(bounds.pad(0.4), { animate: false, maxZoom: 3 });
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);
    const t = setTimeout(onResize, 120);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [map, markers]);
  return null;
}

export default function LeafletWorldMap({ markers, routes, highlight, onMarkerSelect }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const polylines = useMemo(
    () =>
      routes.map((route) => {
        const active = !highlight || route.active.some((c) => highlight.includes(c));
        return {
          id: route.id,
          positions: corridorPositions(route.fromCoords, route.toCoords),
          active,
        };
      }),
    [routes, highlight],
  );

  if (!ready) {
    return <div className="h-full w-full bg-[#E8EEF5]" />;
  }

  return (
    <MapContainer
      center={[20, 20]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      className="h-full w-full"
      style={{ background: '#E8EEF5' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <FitBounds markers={markers} />

      {polylines.map((line) => (
        <Polyline
          key={line.id}
          positions={line.positions}
          pathOptions={{
            color: line.active ? '#EA580C' : '#cbd5e1',
            weight: line.active ? 2.25 : 1.25,
            opacity: line.active ? 0.9 : 0.35,
            dashArray: '8 7',
            className: line.active ? 'route-dash' : undefined,
            lineCap: 'round',
          }}
        />
      ))}

      {markers.map((marker) => {
        const active = !highlight || marker.currencies.some((c) => highlight.includes(c));
        const currencyMeta = currencies.find((c) => marker.currencies.includes(c.code));
        return (
          <Marker
            key={marker.id}
            position={marker.coords}
            icon={createDotIcon(active)}
            opacity={active ? 1 : 0.4}
            eventHandlers={{
              click: () => onMarkerSelect?.(marker),
            }}
            title={`${marker.label}${currencyMeta ? ` · ${currencyMeta.code}` : ''}`}
          />
        );
      })}
    </MapContainer>
  );
}
