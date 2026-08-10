import { useState, useCallback } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const VISITED_COUNTRIES = ['EG', 'JP', 'TW', 'TH', 'SG', 'GB', 'FR', 'MY']

function WorldMap({ isOnDuty }) {
  const [tooltip, setTooltip] = useState(null)

  const getCountryColor = useCallback((code) => {
    if (VISITED_COUNTRIES.includes(code)) return '#22c55e'
    return isOnDuty ? '#1e293b' : '#374151'
  }, [isOnDuty])

  const getCountryOpacity = useCallback((code) => {
    if (VISITED_COUNTRIES.includes(code)) return 1
    return 0.4
  }, [])

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [100, 20],
        }}
        width={800}
        height={450}
        className="w-full h-auto"
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = geo.properties.ISO_A2
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(code)}
                    opacity={getCountryOpacity(code)}
                    stroke="#000"
                    strokeWidth={0.5}
                    onMouseEnter={() => {
                      setTooltip({
                        name: geo.properties.name,
                        status: VISITED_COUNTRIES.includes(code) ? 'visited' : 'not yet',
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', opacity: 1, fill: '#4ade80' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md rounded-xl px-4 py-3 text-sm border border-white/20 shadow-2xl z-10">
          <div className="font-bold text-white">{tooltip.name}</div>
          <div className={`text-xs mt-1 flex items-center gap-1 ${
            tooltip.status === 'visited' ? 'text-green-400' : 'text-gray-400'
          }`}>
            {tooltip.status === 'visited' && (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Visited
              </>
            )}
            {tooltip.status === 'not yet' && (
              <>
                <span className="w-2 h-2 rounded-full bg-gray-500 inline-block"></span> Not yet
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-6 justify-center mt-4 pb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></div>
          <span className="text-white/80">Visited ({VISITED_COUNTRIES.length})</span>
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
