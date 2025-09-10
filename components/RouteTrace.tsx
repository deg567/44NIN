"use client"

import { useEffect, useMemo, useState } from 'react'

type Point = { x: number; y: number }

function parseGpx(xmlText: string) {
  const dom = new DOMParser().parseFromString(xmlText, 'application/xml')
  const pts = Array.from(dom.querySelectorAll('trkpt'))
  const coords = pts
    .map((pt) => ({
      lat: parseFloat(pt.getAttribute('lat') || '0'),
      lon: parseFloat(pt.getAttribute('lon') || '0'),
    }))
    .filter((p) => isFinite(p.lat) && isFinite(p.lon))
  if (coords.length < 2) return [] as Point[]
  const minLat = Math.min(...coords.map((p) => p.lat))
  const maxLat = Math.max(...coords.map((p) => p.lat))
  const minLon = Math.min(...coords.map((p) => p.lon))
  const maxLon = Math.max(...coords.map((p) => p.lon))
  const w = Math.max(1e-6, maxLon - minLon)
  const h = Math.max(1e-6, maxLat - minLat)
  const pad = 10
  const boxW = 800 - pad * 2
  const boxH = 450 - pad * 2
  const scale = Math.min(boxW / w, boxH / h)
  // Project lon->x, lat->y (invert y for SVG)
  const toXY = (lon: number, lat: number): Point => ({
    x: pad + (lon - minLon) * scale,
    y: pad + (maxLat - lat) * scale,
  })
  return coords.map((c) => toXY(c.lon, c.lat))
}

export default function RouteTrace({ gpxUrl }: { gpxUrl: string }) {
  const [path, setPath] = useState<string | null>(null)
  const [len, setLen] = useState<number>(0)
  const viewBox = '0 0 800 450'

  useEffect(() => {
    let alive = true
    fetch(gpxUrl)
      .then((r) => r.text())
      .then((txt) => {
        if (!alive) return
        const pts = parseGpx(txt)
        if (!pts.length) return
        const d = pts.map((p, i) => (i === 0 ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)).join(' ')
        setPath(d)
        // Length is approximated later via ref in effect (optional). Keep simple animation via CSS dash
        setLen(1000)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [gpxUrl])

  const base = useMemo(() => ({ stroke: '#E20021', fill: 'none', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' }), [])

  if (!path) return null
  return (
    <div className="mt-6 rounded-lg border bg-white">
      <svg viewBox={viewBox} className="w-full h-auto">
        <rect x="0" y="0" width="800" height="450" fill="#fafafa" />
        <path d={path} {...base} stroke="#ddd" />
        <path d={path} {...base} style={{ strokeDasharray: len, strokeDashoffset: len, animation: 'traceDraw 2.2s ease-out forwards' }} />
      </svg>
      <style>{`@keyframes traceDraw { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  )
}

