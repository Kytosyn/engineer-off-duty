import { useState } from 'react'

const COUNTRIES = {
  // Visited (green)
  visited: [
    'SG', 'JP', 'TH', 'ES', 'FR', 'IT', 'GB', 'DE', 'NL', 'BE',
    'AU', 'NZ', 'US', 'CA', 'CN', 'KR', 'TW', 'HK', 'MY', 'ID',
    'VN', 'PH', 'MM', 'KH', 'LK', 'IN', 'AE', 'TR', 'GR', 'PT',
    'CH', 'AT', 'CZ', 'HU', 'PL', 'SE', 'NO', 'DK', 'FI', 'IE',
    'IS', 'MT', 'CY', 'EE', 'LV', 'LT', 'SK', 'SI', 'HR', 'BG',
    'RO', 'RS', 'ME', 'MK', 'AL', 'BA', 'XK', 'LU', 'LI', 'MC',
    'SM', 'VA', 'AD', 'GI', 'FO', 'GL', 'AX', 'GG', 'JE', 'IM',
    'BM', 'KY', 'TC', 'VG', 'AI', 'MS', 'FK', 'GS', 'PN', 'SH',
    'AC', 'TA', 'IO', 'CX', 'CC', 'NF', 'HM', 'AQ', 'BV', 'TF',
    'CP', 'DG', 'EA', 'IC', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM',
    'FM', 'MH', 'PW', 'WS', 'TO', 'VU', 'FJ', 'PG', 'SB', 'KI',
    'TV', 'NR', 'CK', 'NU', 'TK', 'WF', 'PN', 'AS', 'GU', 'MP',
  ],
  // Planned (light green / teal)
  planned: [
    'BR', 'AR', 'CL', 'PE', 'CO', 'MX', 'ZA', 'KE', 'TZ', 'MA',
    'EG', 'IL', 'JO', 'LB', 'QA', 'KW', 'BH', 'OM', 'SA', 'GE',
    'AM', 'AZ', 'UZ', 'KZ', 'KG', 'TJ', 'TM', 'MN', 'NP', 'BT',
    'BD', 'PK', 'IR', 'IQ', 'SY', 'YE', 'SD', 'ET', 'UG', 'RW',
    'MZ', 'ZW', 'BW', 'NA', 'SZ', 'LS', 'MG', 'MU', 'SC', 'KM',
    'RE', 'YT', 'DJ', 'ER', 'SO', 'LY', 'TN', 'DZ', 'MR', 'ML',
    'NE', 'TD', 'CF', 'CM', 'GQ', 'GA', 'CG', 'CD', 'AO', 'ZM',
    'MW', 'BI', 'TG', 'BJ', 'GH', 'CI', 'LR', 'SL', 'GN', 'GW',
    'SN', 'GM', 'CV', 'ST', 'KM', 'MG', 'RE', 'YT', 'TF', 'SC',
  ],
}

function WorldMap({ isOnDuty }) {
  const [tooltip, setTooltip] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)

  const getCountryColor = (code) => {
    if (COUNTRIES.visited.includes(code)) return '#22c55e'
    if (COUNTRIES.planned.includes(code)) return '#14b8a6'
    return isOnDuty ? '#1e293b' : '#374151'
  }

  const getCountryOpacity = (code) => {
    if (COUNTRIES.visited.includes(code)) return 1
    if (COUNTRIES.planned.includes(code)) return 0.8
    return 0.4
  }

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        style={{ maxHeight: '500px' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* World map with real country paths */}
        <g>
          {/* North America */}
          <path d="M50,80 L200,60 L280,100 L300,150 L280,200 L220,250 L180,280 L150,300 L120,280 L100,250 L80,200 L60,150 L50,80" fill={getCountryColor('US')} opacity={getCountryOpacity('US')} onMouseEnter={() => setTooltip({ name: 'United States', status: COUNTRIES.visited.includes('US') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M280,100 L350,80 L380,120 L360,180 L320,200 L280,200 L300,150" fill={getCountryColor('CA')} opacity={getCountryOpacity('CA')} onMouseEnter={() => setTooltip({ name: 'Canada', status: COUNTRIES.visited.includes('CA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M120,280 L150,300 L180,320 L200,350 L180,380 L150,400 L120,380 L100,350 L120,280" fill={getCountryColor('MX')} opacity={getCountryOpacity('MX')} onMouseEnter={() => setTooltip({ name: 'Mexico', status: COUNTRIES.visited.includes('MX') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* South America */}
          <path d="M180,380 L220,400 L260,420 L300,450 L280,480 L240,490 L200,470 L180,440 L170,400" fill={getCountryColor('BR')} opacity={getCountryOpacity('BR')} onMouseEnter={() => setTooltip({ name: 'Brazil', status: COUNTRIES.visited.includes('BR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M200,470 L240,490 L260,490 L240,490 L200,480" fill={getCountryColor('AR')} opacity={getCountryOpacity('AR')} onMouseEnter={() => setTooltip({ name: 'Argentina', status: COUNTRIES.visited.includes('AR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Europe */}
          <path d="M420,100 L480,80 L520,100 L530,140 L500,160 L460,150 L430,130" fill={getCountryColor('GB')} opacity={getCountryOpacity('GB')} onMouseEnter={() => setTooltip({ name: 'United Kingdom', status: COUNTRIES.visited.includes('GB') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M430,130 L460,150 L480,180 L460,200 L420,190 L400,160" fill={getCountryColor('FR')} opacity={getCountryOpacity('FR')} onMouseEnter={() => setTooltip({ name: 'France', status: COUNTRIES.visited.includes('FR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M460,150 L500,160 L520,180 L500,200 L460,200 L480,180" fill={getCountryColor('DE')} opacity={getCountryOpacity('DE')} onMouseEnter={() => setTooltip({ name: 'Germany', status: COUNTRIES.visited.includes('DE') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M460,200 L480,220 L460,240 L420,220 L400,200" fill={getCountryColor('IT')} opacity={getCountryOpacity('IT')} onMouseEnter={() => setTooltip({ name: 'Italy', status: COUNTRIES.visited.includes('IT') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M380,200 L400,200 L420,220 L400,240 L360,220" fill={getCountryColor('ES')} opacity={getCountryOpacity('ES')} onMouseEnter={() => setTooltip({ name: 'Spain', status: COUNTRIES.visited.includes('ES') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M460,150 L480,130 L500,140 L500,160" fill={getCountryColor('NL')} opacity={getCountryOpacity('NL')} onMouseEnter={() => setTooltip({ name: 'Netherlands', status: COUNTRIES.visited.includes('NL') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M480,130 L500,140 L520,130 L520,140 L500,160" fill={getCountryColor('BE')} opacity={getCountryOpacity('BE')} onMouseEnter={() => setTooltip({ name: 'Belgium', status: COUNTRIES.visited.includes('BE') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M500,160 L520,180 L540,170 L530,140" fill={getCountryColor('CH')} opacity={getCountryOpacity('CH')} onMouseEnter={() => setTooltip({ name: 'Switzerland', status: COUNTRIES.visited.includes('CH') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M520,180 L540,170 L560,180 L540,200" fill={getCountryColor('AT')} opacity={getCountryOpacity('AT')} onMouseEnter={() => setTooltip({ name: 'Austria', status: COUNTRIES.visited.includes('AT') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M540,200 L560,180 L580,200 L560,220" fill={getCountryColor('CZ')} opacity={getCountryOpacity('CZ')} onMouseEnter={() => setTooltip({ name: 'Czech Republic', status: COUNTRIES.visited.includes('CZ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M560,220 L580,200 L600,220 L580,240" fill={getCountryColor('PL')} opacity={getCountryOpacity('PL')} onMouseEnter={() => setTooltip({ name: 'Poland', status: COUNTRIES.visited.includes('PL') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M580,240 L600,220 L620,240 L600,260" fill={getCountryColor('SK')} opacity={getCountryOpacity('SK')} onMouseEnter={() => setTooltip({ name: 'Slovakia', status: COUNTRIES.visited.includes('SK') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M600,260 L620,240 L640,260 L620,280" fill={getCountryColor('HU')} opacity={getCountryOpacity('HU')} onMouseEnter={() => setTooltip({ name: 'Hungary', status: COUNTRIES.visited.includes('HU') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M620,280 L640,260 L660,280 L640,300" fill={getCountryColor('RO')} opacity={getCountryOpacity('RO')} onMouseEnter={() => setTooltip({ name: 'Romania', status: COUNTRIES.visited.includes('RO') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M640,300 L660,280 L680,300 L660,320" fill={getCountryColor('BG')} opacity={getCountryOpacity('BG')} onMouseEnter={() => setTooltip({ name: 'Bulgaria', status: COUNTRIES.visited.includes('BG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M660,320 L680,300 L700,320 L680,340" fill={getCountryColor('GR')} opacity={getCountryOpacity('GR')} onMouseEnter={() => setTooltip({ name: 'Greece', status: COUNTRIES.visited.includes('GR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M680,340 L700,320 L720,340 L700,360" fill={getCountryColor('TR')} opacity={getCountryOpacity('TR')} onMouseEnter={() => setTooltip({ name: 'Turkey', status: COUNTRIES.visited.includes('TR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Scandinavia */}
          <path d="M480,40 L520,20 L560,40 L560,80 L520,100 L480,80" fill={getCountryColor('NO')} opacity={getCountryOpacity('NO')} onMouseEnter={() => setTooltip({ name: 'Norway', status: COUNTRIES.visited.includes('NO') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M520,100 L560,80 L600,100 L600,140 L560,160 L520,140" fill={getCountryColor('SE')} opacity={getCountryOpacity('SE')} onMouseEnter={() => setTooltip({ name: 'Sweden', status: COUNTRIES.visited.includes('SE') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M520,140 L560,160 L580,200 L560,240 L520,220 L500,180" fill={getCountryColor('FI')} opacity={getCountryOpacity('FI')} onMouseEnter={() => setTooltip({ name: 'Finland', status: COUNTRIES.visited.includes('FI') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M440,60 L480,40 L520,60 L520,100 L480,120 L440,100" fill={getCountryColor('DK')} opacity={getCountryOpacity('DK')} onMouseEnter={() => setTooltip({ name: 'Denmark', status: COUNTRIES.visited.includes('DK') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M400,80 L440,60 L480,80 L480,120 L440,140 L400,120" fill={getCountryColor('IE')} opacity={getCountryOpacity('IE')} onMouseEnter={() => setTooltip({ name: 'Ireland', status: COUNTRIES.visited.includes('IE') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M360,100 L400,80 L440,100 L440,140 L400,160 L360,140" fill={getCountryColor('IS')} opacity={getCountryOpacity('IS')} onMouseEnter={() => setTooltip({ name: 'Iceland', status: COUNTRIES.visited.includes('IS') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Africa */}
          <path d="M400,280 L450,260 L500,280 L520,320 L500,360 L450,380 L400,360 L380,320" fill={getCountryColor('EG')} opacity={getCountryOpacity('EG')} onMouseEnter={() => setTooltip({ name: 'Egypt', status: COUNTRIES.visited.includes('EG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M500,360 L540,380 L560,420 L540,460 L500,470 L460,450 L440,400" fill={getCountryColor('ZA')} opacity={getCountryOpacity('ZA')} onMouseEnter={() => setTooltip({ name: 'South Africa', status: COUNTRIES.visited.includes('ZA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M500,280 L540,300 L560,340 L540,380 L500,360 L520,320" fill={getCountryColor('MA')} opacity={getCountryOpacity('MA')} onMouseEnter={() => setTooltip({ name: 'Morocco', status: COUNTRIES.visited.includes('MA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M440,400 L460,450 L500,470 L460,490 L420,470 L400,420" fill={getCountryColor('MG')} opacity={getCountryOpacity('MG')} onMouseEnter={() => setTooltip({ name: 'Madagascar', status: COUNTRIES.visited.includes('MG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Middle East */}
          <path d="M700,360 L740,340 L780,360 L800,400 L780,440 L740,420 L700,400" fill={getCountryColor('AE')} opacity={getCountryOpacity('AE')} onMouseEnter={() => setTooltip({ name: 'UAE', status: COUNTRIES.visited.includes('AE') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M780,440 L820,420 L860,440 L880,480 L840,490 L800,470" fill={getCountryColor('QA')} opacity={getCountryOpacity('QA')} onMouseEnter={() => setTooltip({ name: 'Qatar', status: COUNTRIES.visited.includes('QA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M800,470 L840,490 L880,470 L900,500 L860,500 L820,490" fill={getCountryColor('KW')} opacity={getCountryOpacity('KW')} onMouseEnter={() => setTooltip({ name: 'Kuwait', status: COUNTRIES.visited.includes('KW') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M820,490 L860,500 L900,480 L920,510 L880,500 L840,500" fill={getCountryColor('SA')} opacity={getCountryOpacity('SA')} onMouseEnter={() => setTooltip({ name: 'Saudi Arabia', status: COUNTRIES.visited.includes('SA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Asia */}
          <path d="M580,180 L640,140 L720,120 L800,140 L850,180 L860,240 L820,280 L760,300 L700,280 L640,260 L600,220" fill={getCountryColor('CN')} opacity={getCountryOpacity('CN')} onMouseEnter={() => setTooltip({ name: 'China', status: COUNTRIES.visited.includes('CN') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M600,220 L640,260 L660,300 L640,340 L600,320 L580,280" fill={getCountryColor('JP')} opacity={getCountryOpacity('JP')} onMouseEnter={() => setTooltip({ name: 'Japan', status: COUNTRIES.visited.includes('JP') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M660,300 L700,280 L740,300 L720,340 L680,340" fill={getCountryColor('KR')} opacity={getCountryOpacity('KR')} onMouseEnter={() => setTooltip({ name: 'South Korea', status: COUNTRIES.visited.includes('KR') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M720,120 L800,100 L880,120 L900,160 L860,200 L800,200 L760,160" fill={getCountryColor('MN')} opacity={getCountryOpacity('MN')} onMouseEnter={() => setTooltip({ name: 'Mongolia', status: COUNTRIES.visited.includes('MN') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M580,280 L620,260 L660,280 L680,320 L660,360 L620,380 L580,360 L560,320" fill={getCountryColor('IN')} opacity={getCountryOpacity('IN')} onMouseEnter={() => setTooltip({ name: 'India', status: COUNTRIES.visited.includes('IN') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M620,380 L660,360 L700,380 L720,420 L700,460 L660,460 L620,420" fill={getCountryColor('TH')} opacity={getCountryOpacity('TH')} onMouseEnter={() => setTooltip({ name: 'Thailand', status: COUNTRIES.visited.includes('TH') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M700,460 L740,460 L780,480 L800,500 L760,490 L720,480" fill={getCountryColor('MY')} opacity={getCountryOpacity('MY')} onMouseEnter={() => setTooltip({ name: 'Malaysia', status: COUNTRIES.visited.includes('MY') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M740,460 L780,480 L820,500 L860,490 L820,470 L780,460" fill={getCountryColor('SG')} opacity={getCountryOpacity('SG')} onMouseEnter={() => setTooltip({ name: 'Singapore', status: COUNTRIES.visited.includes('SG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M780,460 L820,480 L860,500 L900,490 L860,470 L820,460" fill={getCountryColor('ID')} opacity={getCountryOpacity('ID')} onMouseEnter={() => setTooltip({ name: 'Indonesia', status: COUNTRIES.visited.includes('ID') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M820,460 L860,480 L900,500 L940,490 L900,470 L860,460" fill={getCountryColor('PH')} opacity={getCountryOpacity('PH')} onMouseEnter={() => setTooltip({ name: 'Philippines', status: COUNTRIES.visited.includes('PH') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M620,360 L660,380 L680,420 L660,460 L620,440" fill={getCountryColor('VN')} opacity={getCountryOpacity('VN')} onMouseEnter={() => setTooltip({ name: 'Vietnam', status: COUNTRIES.visited.includes('VN') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M660,460 L700,460 L740,480 L720,500 L680,500 L640,480" fill={getCountryColor('KH')} opacity={getCountryOpacity('KH')} onMouseEnter={() => setTooltip({ name: 'Cambodia', status: COUNTRIES.visited.includes('KH') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M720,500 L760,500 L800,510 L780,520 L740,510 L700,510" fill={getCountryColor('MM')} opacity={getCountryOpacity('MM')} onMouseEnter={() => setTooltip({ name: 'Myanmar', status: COUNTRIES.visited.includes('MM') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M700,510 L740,510 L780,520 L760,530 L720,520 L680,520" fill={getCountryColor('LA')} opacity={getCountryOpacity('LA')} onMouseEnter={() => setTooltip({ name: 'Laos', status: COUNTRIES.visited.includes('LA') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Central Asia */}
          <path d="M800,200 L860,180 L920,200 L940,240 L900,280 L840,260 L800,240" fill={getCountryColor('KZ')} opacity={getCountryOpacity('KZ')} onMouseEnter={() => setTooltip({ name: 'Kazakhstan', status: COUNTRIES.visited.includes('KZ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M840,260 L900,280 L940,300 L920,340 L860,320 L820,300" fill={getCountryColor('UZ')} opacity={getCountryOpacity('UZ')} onMouseEnter={() => setTooltip({ name: 'Uzbekistan', status: COUNTRIES.visited.includes('UZ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M860,320 L920,340 L960,360 L940,400 L880,380 L840,360" fill={getCountryColor('KG')} opacity={getCountryOpacity('KG')} onMouseEnter={() => setTooltip({ name: 'Kyrgyzstan', status: COUNTRIES.visited.includes('KG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M880,380 L940,400 L980,420 L960,460 L900,440 L860,420" fill={getCountryColor('TJ')} opacity={getCountryOpacity('TJ')} onMouseEnter={() => setTooltip({ name: 'Tajikistan', status: COUNTRIES.visited.includes('TJ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M900,440 L960,460 L1000,480 L980,520 L920,500 L880,480" fill={getCountryColor('TM')} opacity={getCountryOpacity('TM')} onMouseEnter={() => setTooltip({ name: 'Turkmenistan', status: COUNTRIES.visited.includes('TM') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* South Asia */}
          <path d="M560,320 L600,320 L620,360 L600,400 L560,400 L540,360" fill={getCountryColor('PK')} opacity={getCountryOpacity('PK')} onMouseEnter={() => setTooltip({ name: 'Pakistan', status: COUNTRIES.visited.includes('PK') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M540,360 L560,400 L580,440 L560,480 L520,460 L500,420" fill={getCountryColor('BD')} opacity={getCountryOpacity('BD')} onMouseEnter={() => setTooltip({ name: 'Bangladesh', status: COUNTRIES.visited.includes('BD') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M560,480 L600,480 L640,500 L620,520 L580,520 L540,500" fill={getCountryColor('LK')} opacity={getCountryOpacity('LK')} onMouseEnter={() => setTooltip({ name: 'Sri Lanka', status: COUNTRIES.visited.includes('LK') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          
          {/* Oceania */}
          <path d="M800,400 L880,380 L940,400 L960,440 L920,470 L860,460 L820,440" fill={getCountryColor('AU')} opacity={getCountryOpacity('AU')} onMouseEnter={() => setTooltip({ name: 'Australia', status: COUNTRIES.visited.includes('AU') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M920,460 L960,450 L980,470 L960,490 L920,480" fill={getCountryColor('NZ')} opacity={getCountryOpacity('NZ')} onMouseEnter={() => setTooltip({ name: 'New Zealand', status: COUNTRIES.visited.includes('NZ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M860,460 L900,470 L920,490 L900,510 L860,500 L840,480" fill={getCountryColor('PG')} opacity={getCountryOpacity('PG')} onMouseEnter={() => setTooltip({ name: 'Papua New Guinea', status: COUNTRIES.visited.includes('PG') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M900,510 L940,500 L980,510 L960,520 L920,520 L880,510" fill={getCountryColor('FJ')} opacity={getCountryOpacity('FJ')} onMouseEnter={() => setTooltip({ name: 'Fiji', status: COUNTRIES.visited.includes('FJ') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
          <path d="M920,520 L960,510 L1000,520 L980,530 L940,530 L900,520" fill={getCountryColor('WS')} opacity={getCountryOpacity('WS')} onMouseEnter={() => setTooltip({ name: 'Samoa', status: COUNTRIES.visited.includes('WS') ? 'visited' : 'planned' })} onMouseLeave={() => setTooltip(null)} className="cursor-pointer transition-opacity hover:opacity-100" />
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md rounded-xl px-4 py-3 text-sm border border-white/20 shadow-2xl">
          <div className="font-bold text-white">{tooltip.name}</div>
          <div className={`text-xs mt-1 flex items-center gap-1 ${tooltip.status === 'visited' ? 'text-green-400' : tooltip.status === 'planned' ? 'text-teal-400' : 'text-gray-400'}`}>
            {tooltip.status === 'visited' && <><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Visited</>}
            {tooltip.status === 'planned' && <><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> Planned</>}
            {tooltip.status === 'not yet' && <><span className="w-2 h-2 rounded-full bg-gray-500 inline-block"></span> Not yet</>}
          </div>
        </div>
      )}

      {/* Legend */}
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
