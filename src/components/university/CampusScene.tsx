import { useId } from 'react';
import type { CampusStyle } from '../../types/university';
import { mix } from '../../config/themeTokens';

type Roof = 'flat' | 'spire' | 'gable' | 'dome' | 'clock' | 'battlement' | 'arch' | 'slant';
/** [x, width, height, roof] in a 600×240 canvas, ground at y=210 */
type B = [number, number, number, Roof];

const SKYLINES: Record<CampusStyle, B[]> = {
  gothic: [[40, 70, 70, 'gable'], [120, 60, 95, 'battlement'], [190, 44, 150, 'spire'], [244, 120, 85, 'gable'], [374, 70, 110, 'battlement'], [454, 90, 70, 'gable']],
  romanesque: [[30, 90, 75, 'gable'], [130, 140, 90, 'arch'], [280, 50, 145, 'clock'], [340, 120, 85, 'arch'], [470, 90, 70, 'gable']],
  modern: [[20, 110, 70, 'flat'], [140, 80, 120, 'slant'], [230, 150, 85, 'flat'], [390, 70, 140, 'flat'], [470, 110, 95, 'slant']],
  campus: [[40, 100, 70, 'gable'], [150, 70, 90, 'flat'], [230, 46, 130, 'clock'], [286, 130, 80, 'gable'], [426, 120, 95, 'flat']],
  stone: [[30, 100, 80, 'gable'], [140, 110, 105, 'dome'], [262, 90, 90, 'battlement'], [362, 50, 130, 'spire'], [422, 140, 80, 'gable']],
  coastal: [[60, 120, 70, 'slant'], [190, 90, 95, 'flat'], [290, 140, 75, 'slant'], [440, 90, 100, 'flat']],
  urban: [[10, 60, 150, 'flat'], [76, 90, 110, 'slant'], [172, 70, 180, 'flat'], [248, 120, 90, 'flat'], [374, 60, 165, 'slant'], [440, 80, 120, 'flat'], [526, 64, 140, 'flat']],
  limestone: [[30, 120, 78, 'gable'], [160, 60, 120, 'clock'], [226, 150, 90, 'battlement'], [382, 100, 100, 'dome'], [490, 90, 70, 'gable']],
  tower: [[30, 120, 70, 'flat'], [160, 100, 85, 'flat'], [270, 46, 190, 'flat'], [326, 130, 80, 'slant'], [466, 110, 70, 'flat']],
  generic: [[50, 110, 75, 'gable'], [170, 90, 95, 'flat'], [270, 60, 130, 'clock'], [340, 130, 85, 'gable'], [480, 90, 70, 'flat']],
};

const HAS_TREES: CampusStyle[] = ['gothic', 'campus', 'coastal', 'generic', 'romanesque', 'tower'];

interface Props {
  style: CampusStyle;
  primary: string;
  highlight: string;
  className?: string;
  label?: string;
}

/** Original illustrated campus skyline, tinted per university. Used as a local fallback when no licensed photo is supplied. */
export function CampusScene({ style, primary, highlight, className = '', label }: Props) {
  const id = useId().replace(/:/g, '');
  const skyTop = mix(primary, '#000000', 0.35);
  const skyBottom = mix(primary, highlight, 0.25);
  const far = mix(primary, '#ffffff', 0.35);
  const near = mix(primary, '#ffffff', 0.88);
  const window = mix(highlight, '#ffffff', 0.15);
  const ground = mix(primary, '#000000', 0.15);

  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMax slice" className={className} role="img" aria-label={label ?? 'Illustrated campus skyline'}>
      <defs>
        <linearGradient id={`sky${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill={`url(#sky${id})`} />
      <circle cx="500" cy="58" r="30" fill={highlight} opacity=".85" />
      <circle cx="500" cy="58" r="46" fill={highlight} opacity=".15" />
      {[60, 140, 330, 410].map((x, i) => (
        <circle key={x} cx={x} cy={30 + (i % 2) * 22} r="1.6" fill="#fff" opacity=".7" />
      ))}

      {(style === 'coastal' || style === 'stone') && (
        <path d={style === 'coastal' ? 'M0 150 L70 90 L130 130 L210 60 L290 125 L360 80 L450 140 L520 95 L600 130 V210 H0Z' : 'M0 170 C120 110 240 100 330 125 C420 150 500 120 600 140 V210 H0Z'} fill={far} opacity=".55" />
      )}
      {style === 'coastal' && <path d="M210 60 l18 18 -12 -2 -8 8 -10 -10z M360 80 l14 14 -10 -2 -6 6 -8 -8z" fill="#fff" opacity=".75" />}
      {style === 'tower' && <path d="M0 180 L180 165 L200 150 L600 145 V210 H0Z" fill={far} opacity=".45" />}

      {SKYLINES[style].map(([x, w, ht, roof], i) => {
        const y = 210 - ht;
        const fill = i % 2 ? near : mix(near, primary, 0.08);
        return (
          <g key={i}>
            <Roofed x={x} y={y} w={w} roof={roof} fill={fill} accent={highlight} />
            <rect x={x} y={y} width={w} height={ht} fill={fill} />
            {Array.from({ length: Math.max(1, Math.floor((ht - 20) / 22)) }).map((_, r) =>
              Array.from({ length: Math.max(1, Math.floor((w - 12) / 18)) }).map((__, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={x + 9 + c * 18}
                  y={y + 12 + r * 22}
                  width={roof === 'arch' || roof === 'gable' ? 8 : 9}
                  height={12}
                  rx={roof === 'arch' || roof === 'battlement' || roof === 'spire' ? 4 : 1}
                  fill={(r + c + i) % 3 === 0 ? window : mix(primary, '#ffffff', 0.55)}
                  opacity={(r + c + i) % 3 === 0 ? 0.95 : 0.45}
                />
              )),
            )}
          </g>
        );
      })}

      {(style === 'coastal' || style === 'limestone') && (
        <g>
          <rect x="0" y="210" width="600" height="30" fill={mix(primary, '#5bc0eb', 0.55)} />
          {[30, 160, 300, 450].map((x) => (
            <path key={x} d={`M${x} 222 q10 -5 20 0 t20 0`} stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
          ))}
        </g>
      )}
      {style !== 'coastal' && style !== 'limestone' && <rect x="0" y="208" width="600" height="32" fill={ground} />}

      {HAS_TREES.includes(style) &&
        [12, 108, 236, 420, 560].map((x, i) =>
          style === 'coastal' ? (
            <path key={x} d={`M${x} 212 l14 -46 14 46z M${x + 6} 190 l8 -26 8 26z`} fill={mix(primary, '#14532d', 0.6)} />
          ) : (
            <g key={x}>
              <rect x={x + 9} y={196} width="4" height="14" fill={mix(primary, '#3f2d1d', 0.6)} />
              <circle cx={x + 11} cy={188 - (i % 2) * 4} r={13 + (i % 3) * 2} fill={mix(highlight, '#166534', 0.55)} opacity=".95" />
            </g>
          ),
        )}
    </svg>
  );
}

function Roofed({ x, y, w, roof, fill, accent }: { x: number; y: number; w: number; roof: Roof; fill: string; accent: string }) {
  const cx = x + w / 2;
  switch (roof) {
    case 'gable':
      return <path d={`M${x - 4} ${y} L${cx} ${y - w * 0.28} L${x + w + 4} ${y}Z`} fill={fill} />;
    case 'spire':
      return (
        <g>
          <path d={`M${x} ${y} L${cx} ${y - 70} L${x + w} ${y}Z`} fill={fill} />
          <circle cx={cx} cy={y - 74} r="3" fill={accent} />
        </g>
      );
    case 'dome':
      return (
        <g>
          <path d={`M${x + 8} ${y} A${w / 2 - 8} ${w / 2 - 8} 0 0 1 ${x + w - 8} ${y}Z`} fill={fill} />
          <rect x={cx - 1.5} y={y - w / 2 - 6} width="3" height="12" fill={accent} />
        </g>
      );
    case 'clock':
      return (
        <g>
          <path d={`M${x - 2} ${y} L${cx} ${y - 28} L${x + w + 2} ${y}Z`} fill={fill} />
          <circle cx={cx} cy={y + 18} r={Math.min(12, w / 3)} fill="#fff" stroke={accent} strokeWidth="3" />
          <path d={`M${cx} ${y + 18} v-7 M${cx} ${y + 18} h5`} stroke="#334155" strokeWidth="1.6" />
        </g>
      );
    case 'battlement':
      return (
        <g fill={fill}>
          {Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
            <rect key={i} x={x + i * 12} y={y - 8} width="7" height="8" />
          ))}
        </g>
      );
    case 'arch':
      return <path d={`M${x} ${y} L${x + 12} ${y - 14} H${x + w - 12} L${x + w} ${y}Z`} fill={fill} />;
    case 'slant':
      return <path d={`M${x} ${y} L${x + w} ${y - 18} V${y}Z`} fill={fill} />;
    default:
      return <rect x={x + w * 0.3} y={y - 6} width={w * 0.2} height="6" fill={fill} />;
  }
}
