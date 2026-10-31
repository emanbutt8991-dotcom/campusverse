import type { UniversityConfig } from '../types/university';
import type { UniversityContent } from './types';
import { mcmaster } from './mcmaster';
import { utoronto } from './utoronto';
import { waterloo } from './waterloo';
import { laurier } from './laurier';
import { mcgill } from './mcgill';
import { ubc } from './ubc';
import { york } from './york';
import { tmu } from './tmu';
import { western } from './western';
import { queens } from './queens';
import { brock } from './brock';
import { buildCustomContent } from './custom';

const CONTENT: Record<string, UniversityContent> = {
  mcmaster,
  utoronto,
  waterloo,
  laurier,
  mcgill,
  ubc,
  york,
  tmu,
  western,
  queens,
  brock,
};

export function getContent(u: UniversityConfig): { content: UniversityContent; isSample: boolean } {
  const c = CONTENT[u.id];
  return c ? { content: c, isSample: false } : { content: buildCustomContent(u), isSample: true };
}
