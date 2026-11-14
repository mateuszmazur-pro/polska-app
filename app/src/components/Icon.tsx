import Svg, { Circle, Path } from 'react-native-svg';

export type IconName =
  | 'search' | 'bell' | 'settings' | 'arrowRight' | 'back' | 'person' | 'castle' | 'timeline'
  | 'crown' | 'music' | 'quiz' | 'home' | 'compass' | 'pin' | 'trophy' | 'check'
  | 'chevron' | 'bookmark' | 'share' | 'swords' | 'flag' | 'calendar' | 'bulb'
  | 'route' | 'march' | 'flame' | 'museum' | 'church' | 'houses' | 'hut' | 'play' | 'pause' | 'close' | 'prev' | 'next';

type Props = { name: IconName; size?: number; color: string; strokeWidth?: number };

/** Ikony liniowe (stroke) — ten sam zestaw co w projekcie na kanwie. */
export function Icon({ name, size = 22, color, strokeWidth = 1.8 }: Props) {
  const p = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'search' && (<><Circle cx={11} cy={11} r={7} {...p} /><Path d="M20 20l-3.5-3.5" {...p} /></>)}
      {name === 'bell' && (<><Path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z" {...p} /><Path d="M10 20a2 2 0 004 0" {...p} /></>)}
      {name === 'settings' && (<><Circle cx={12} cy={12} r={3} {...p} /><Path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" {...p} /></>)}
      {name === 'arrowRight' && <Path d="M5 12h14M13 6l6 6-6 6" {...p} />}
      {name === 'back' && <Path d="M15 6l-6 6 6 6" {...p} />}
      {name === 'person' && (<><Circle cx={12} cy={8} r={4} {...p} /><Path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" {...p} /></>)}
      {name === 'castle' && <Path d="M3 21h18M5 21V10l3-2 3 2v11M13 21V6l3-3 3 3v15" {...p} />}
      {name === 'timeline' && (<><Path d="M12 3v18" {...p} /><Circle cx={12} cy={7} r={2} {...p} /><Circle cx={12} cy={17} r={2} {...p} /></>)}
      {name === 'crown' && <Path d="M4 8l4 4 4-7 4 7 4-4-2 11H6z" {...p} />}
      {name === 'music' && (<><Path d="M9 18V6l11-2v12" {...p} /><Circle cx={6.5} cy={18} r={2.5} {...p} /><Circle cx={17.5} cy={16} r={2.5} {...p} /></>)}
      {name === 'quiz' && (<><Circle cx={12} cy={12} r={9} {...p} /><Path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.5M12 17h.01" {...p} /></>)}
      {name === 'home' && <Path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" {...p} />}
      {name === 'compass' && (<><Circle cx={12} cy={12} r={9} {...p} /><Path d="M15.5 8.5l-2 5-5 2 2-5z" {...p} /></>)}
      {name === 'pin' && (<><Path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" {...p} /><Circle cx={12} cy={9} r={2.5} {...p} /></>)}
      {name === 'trophy' && <Path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4" {...p} />}
      {name === 'check' && <Path d="M5 12.5l4.5 4.5L19 7.5" {...p} />}
      {name === 'chevron' && <Path d="M9 6l6 6-6 6" {...p} />}
      {name === 'bookmark' && <Path d="M6 3h12v18l-6-4-6 4z" {...p} />}
      {name === 'share' && <Path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7" {...p} />}
      {name === 'swords' && <Path d="M5 19L19 5M14 5h5v5M5 5l6 6M13 13l6 6M16 19h3v-3" {...p} />}
      {name === 'flag' && <Path d="M5 21V4M5 4h11l-2 4 2 4H5" {...p} />}
      {name === 'calendar' && <Path d="M4 5h16v15H4zM4 10h16M9 3v4M15 3v4" {...p} />}
      {name === 'bulb' && <Path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" {...p} />}
      {name === 'route' && (<><Circle cx={6} cy={18} r={2.2} {...p} /><Circle cx={18} cy={6} r={2.2} {...p} /><Path d="M8 18h7a3 3 0 000-6H9a3 3 0 010-6h7" {...p} /></>)}
      {name === 'march' && (<><Path d="M5 21V4" {...p} /><Path d="M5 4h10l-2 3.5L15 11H5" {...p} /><Path d="M14 21l3-6 3 6" {...p} /></>)}
      {name === 'flame' && <Path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2.5 1.5-4 2.5-5 .3 1.8 1.2 2.8 2.5 3-.5-3 .2-5.5 0-8zM10 21h4" {...p} />}
      {name === 'museum' && <Path d="M3 9l9-5 9 5M4 9h16M6 9v8M10 9v8M14 9v8M18 9v8M3 20h18M4 17h16" {...p} />}
      {name === 'church' && <Path d="M12 2v4M10 4h4M8 21v-9l4-4 4 4v9M4 21v-6l4-3M20 21v-6l-4-3M3 21h18M11 21v-3h2v3" {...p} />}
      {name === 'houses' && <Path d="M3 21V10l4-3 4 3v11M11 21V7l5-4 5 4v14M2 21h20M6 13h2M15 10h2M15 14h2M6 17h2" {...p} />}
      {name === 'hut' && <Path d="M2 12l10-8 10 8M5 10v11h14V10M10 21v-5h4v5M8 13h1M15 13h1" {...p} />}
      {name === 'play' && <Path d="M8 5l11 7-11 7z" {...p} />}
      {name === 'pause' && <Path d="M8 5v14M16 5v14" {...p} />}
      {name === 'close' && <Path d="M6 6l12 12M18 6L6 18" {...p} />}
      {name === 'prev' && <Path d="M6 5v14M18 6l-8 6 8 6z" {...p} />}
      {name === 'next' && <Path d="M18 5v14M6 6l8 6-8 6z" {...p} />}
    </Svg>
  );
}

/** Znak aplikacji: biało-czerwone koło (bez godła, bez obwódki). */
export function Emblem({ size = 40, white, red }: { size?: number; gold?: string; white: string; red: string }) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path d={`M0 ${r} a${r} ${r} 0 0 1 ${size} 0 z`} fill={white} />
      <Path d={`M0 ${r} a${r} ${r} 0 0 0 ${size} 0 z`} fill={red} />
    </Svg>
  );
}
