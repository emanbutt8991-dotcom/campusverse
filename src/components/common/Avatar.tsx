import { initials } from '../../utils/format';
import { hashString } from '../../utils/seed';

const PALETTE = ['#F97316', '#0EA5E9', '#8B5CF6', '#10B981', '#EC4899', '#EAB308', '#14B8A6', '#6366F1', '#EF4444', '#84CC16'];

export function Avatar({ name, size = 40, ring = false }: { name: string; size?: number; ring?: boolean }) {
  const isMe = name === 'Alex Morgan';
  const bg = PALETTE[hashString(name) % PALETTE.length];
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-full font-bold text-white ${ring ? 'ring-2 ring-white' : ''} ${isMe ? 'bg-uni-primary text-uni-onprimary' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.38, background: isMe ? undefined : `linear-gradient(135deg, ${bg}, ${bg}cc)` }}
    >
      {initials(name)}
    </span>
  );
}
