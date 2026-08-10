import { useState } from 'react'

const DEFAULT_VISITED = []
const DEFAULT_PLANNED = []

function WorldMap({ isOnDuty, visited = DEFAULT_VISITED, planned = DEFAULT_PLANNED }) {
  const [tooltip, setTooltip] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)

  const allCountries = [
    { code: 'US', name: 'United States', d: 'M50,80 L200,60 L280,100 L300,150 L280,200 L220,250 L180,280 L150,300 L120,280 L100,250 L80,200 L60,150 L50,80' },
    { code: 'CA', name: 'Canada', d: 'M280,100 L350,80 L380,120 L360,180 L320,200 L280,200 L300,150' },
    { code: 'MX', name: 'Mexico', d: 'M120,280 L150,300 L180,320 L200,350 L180,380 L150,400 L120,380 L100,350 L120,280' },
    { code: 'BR', name: 'Brazil', d: 'M180,380 L220,400 L260,420 L300,450 L280,480 L240,490 L200,470 L180,440 L170,400' },
    { code: 'AR', name: 'Argentina', d: 'M200,470 L240,490 L260,490 L240,490 L200,480' },
    { code: 'GB', name: 'United Kingdom', d: 'M420,100 L480,80 L520,100 L530,140 L500,160 L460,150 L430,130' },
    { code: 'FR', name: 'France', d: 'M430,130 L460,150 L480,180 L460,200 L420,190 L400,160' },
    { code: 'DE', name: 'Germany', d: 'M460,150 L500,160 L520,180 L500,200 L460,200 L480,180' },
    { code: 'IT', name: 'Italy', d: 'M460,200 L480,220 L460,240 L420,220 L400,200' },
    { code: 'ES', name: 'Spain', d: 'M380,200 L400,200 L420,220 L400,240 L360,220' },
    { code: 'NL', name: 'Netherlands', d: 'M460,150 L480,130 L500,140 L500,160' },
    { code: 'BE', name: 'Belgium', d: 'M480,130 L500,140 L520,130 L520,140 L500,160' },
    { code: 'CH', name: 'Switzerland', d: 'M500,160 L520,180 L540,170 L530,140' },
    { code: 'AT', name: 'Austria', d: 'M520,180 L540,170 L560,180 L540,200' },
    { code: 'CZ', name: 'Czech Republic', d: 'M540,200 L560,180 L580,200 L560,220' },
    { code: 'PL', name: 'Poland', d: 'M560,220 L580,200 L600,220 L580,240' },
    { code: 'SK', name: 'Slovakia', d: 'M580,240 L600,220 L620,240 L600,260' },
    { code: 'HU', name: 'Hungary', d: 'M600,260 L620,240 L640,260 L620,280' },
    { code: 'RO', name: 'Romania', d: 'M620,280 L640,260 L660,280 L640,300' },
    { code: 'BG', name: 'Bulgaria', d: 'M640,300 L660,280 L680,300 L660,320' },
    { code: 'GR', name: 'Greece', d: 'M660,320 L680,300 L700,320 L680,340' },
    { code: 'TR', name: 'Turkey', d: 'M680,340 L700,320 L720,340 L700,360' },
    { code: 'NO', name: 'Norway', d: 'M480,40 L520,20 L560,40 L560,80 L520,100 L480,80' },
    { code: 'SE', name: 'Sweden', d: 'M520,100 L560,80 L600,100 L600,140 L560,160 L520,140' },
    { code: 'FI', name: 'Finland', d: 'M520,140 L560,160 L580,200 L560,240 L520,220 L500,180' },
    { code: 'DK', name: 'Denmark', d: 'M440,60 L480,40 L520,60 L520,100 L480,120 L440,100' },
    { code: 'IE', name: 'Ireland', d: 'M400,80 L440,60 L480,80 L480,120 L440,140 L400,120' },
    { code: 'IS', name: 'Iceland', d: 'M360,100 L400,80 L440,100 L440,140 L400,160 L360,140' },
    { code: 'PT', name: 'Portugal', d: 'M340,200 L360,200 L380,220 L360,240 L340,220' },
    { code: 'EG', name: 'Egypt', d: 'M400,280 L450,260 L500,280 L520,320 L500,360 L450,380 L400,360 L380,320' },
    { code: 'ZA', name: 'South Africa', d: 'M500,360 L540,380 L560,420 L540,460 L500,470 L460,450 L440,400' },
    { code: 'MA', name: 'Morocco', d: 'M500,280 L540,300 L560,340 L540,380 L500,360 L520,320' },
    { code: 'NG', name: 'Nigeria', d: 'M420,360 L460,340 L500,360 L520,400 L500,440 L460,440 L420,400' },
    { code: 'KE', name: 'Kenya', d: 'M500,440 L540,420 L580,440 L560,480 L520,480 L480,460' },
    { code: 'MG', name: 'Madagascar', d: 'M560,480 L580,460 L600,480 L580,500 L560,500' },
    { code: 'AE', name: 'UAE', d: 'M700,360 L740,340 L780,360 L800,400 L780,440 L740,420 L700,400' },
    { code: 'QA', name: 'Qatar', d: 'M780,440 L820,420 L860,440 L880,480 L840,490 L800,470' },
    { code: 'SA', name: 'Saudi Arabia', d: 'M820,490 L860,500 L900,480 L920,510 L880,500 L840,500' },
    { code: 'IQ', name: 'Iraq', d: 'M740,300 L780,280 L820,300 L840,340 L800,360 L760,340' },
    { code: 'IR', name: 'Iran', d: 'M780,280 L820,260 L860,280 L880,320 L840,340 L800,320' },
    { code: 'CN', name: 'China', d: 'M580,180 L640,140 L720,120 L800,140 L850,180 L860,240 L820,280 L760,300 L700,280 L640,260 L600,220' },
    { code: 'JP', name: 'Japan', d: 'M600,220 L640,260 L660,300 L640,340 L600,320 L580,280' },
    { code: 'KR', name: 'South Korea', d: 'M660,300 L700,280 L740,300 L720,340 L680,340' },
    { code: 'IN', name: 'India', d: 'M580,280 L620,260 L660,280 L680,320 L660,360 L620,380 L580,360 L560,320' },
    { code: 'TH', name: 'Thailand', d: 'M620,380 L660,360 L700,380 L720,420 L700,460 L660,460 L620,420' },
    { code: 'MY', name: 'Malaysia', d: 'M700,460 L740,460 L780,480 L800,500 L760,490 L720,480' },
    { code: 'SG', name: 'Singapore', d: 'M740,460 L780,480 L820,500 L860,490 L820,470 L780,460' },
    { code: 'ID', name: 'Indonesia', d: 'M780,460 L820,480 L860,500 L900,490 L860,470 L820,460' },
    { code: 'PH', name: 'Philippines', d: 'M820,460 L860,480 L900,500 L940,490 L900,470 L860,460' },
    { code: 'VN', name: 'Vietnam', d: 'M620,360 L660,380 L680,420 L660,460 L620,440' },
    { code: 'AU', name: 'Australia', d: 'M800,400 L880,380 L940,400 L960,440 L920,470 L860,460 L820,440' },
    { code: 'NZ', name: 'New Zealand', d: 'M920,460 L960,450 L980,470 L960,490 L920,480' },
    { code: 'PG', name: 'Papua New Guinea', d: 'M860,460 L900,470 L920,490 L900,510 L860,500 L840,480' },
    { code: 'FJ', name: 'Fiji', d: 'M900,510 L940,500 L980,510 L960,520 L920,520 L880,510' },
    { code: 'RU', name: 'Russia', d: 'M480,40 L600,20 L800,20 L900,60 L920,120 L880,160 L800,180 L720,160 L640,140 L580,120 L520,80 L480,60' },
  ]

  const getCountryColor = (code) => {
    if (visited.includes(code)) return '#22c55e'
    if (planned.includes(code)) return '#14b8a6'
    return isOnDuty ? '#1e293b' : '#374151'
  }

  const getCountryOpacity = (code) => {
    if (visited.includes(code)) return 1
    if (planned.includes(code)) return 0.8
    return 0.4
  }

  const getCountryStatus = (code) => {
    if (visited.includes(code)) return 'visited'
    if (planned.includes(code)) return 'planned'
    return 'not yet'
  }

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1000 500" className="w-full h-auto" style={{ maxHeight: '500px' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g>
          {allCountries.map(country => (
            <path
              key={country.code}
              d={country.d}
              fill={getCountryColor(country.code)}
              opacity={getCountryOpacity(country.code)}
              onMouseEnter={() => setTooltip({ name: country.name, status: getCountryStatus(country.code) })}
              onMouseLeave={() => setTooltip(null)}
              onMouseMove={(e) => setHoveredCountry({ x: e.clientX, y: e.clientY })}
              className="cursor-pointer transition-opacity hover:opacity-100"
            />
          ))}
        </g>
      </svg>

      {tooltip && (
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md rounded-xl px-4 py-3 text-sm border border-white/20 shadow-2xl">
          <div className="font-bold text-white">{tooltip.name}</div>
          <div className={`text-xs mt-1 flex items-center gap-1 ${
            tooltip.status === 'visited' ? 'text-green-400' : 
            tooltip.status === 'planned' ? 'text-teal-400' : 'text-gray-400'
          }`}>
            {tooltip.status === 'visited' && <><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Visited</>}
            {tooltip.status === 'planned' && <><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> Planned</>}
            {tooltip.status === 'not yet' && <><span className="w-2 h-2 rounded-full bg-gray-500 inline-block"></span> Not yet</>}
          </div>
        </div>
      )}

      <div className="flex gap-6 justify-center mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></div>
          <span className="text-white/80">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-teal-500 shadow-lg shadow-teal-500/30"></div>
          <span className="text-white/80">Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-700"></div>
          <span className="text-white/80">Not yet</span>
        </div>
      </div>
    </div>
  )
}

export default WorldMap
