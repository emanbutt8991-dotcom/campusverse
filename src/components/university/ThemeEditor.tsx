import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ColourInput } from './CustomUniversityForm';
import { useUniversityContext } from '../../hooks/useUniversity';
import { derivePalette } from '../../utils/generateCustomUniversity';
import { isValidHex } from '../../config/themeTokens';
import { useToast } from '../../context/ToastContext';

/** "Edit University Theme" for custom universities. */
export function ThemeEditor({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { university, updateCustomColours } = useUniversityContext();
  const toast = useToast();
  const [primary, setPrimary] = useState(university?.colours.primary ?? '');
  const [secondary, setSecondary] = useState(university?.colours.secondary ?? '');
  if (!university?.isCustom) return null;
  const valid = isValidHex(primary) && isValidHex(secondary);
  const regenerate = () => {
    const p = derivePalette(university.name);
    setPrimary(p.primary);
    setSecondary(p.secondary);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit University Theme"
      description={`Customize colours for ${university.name}. Changes apply instantly across CampusVerse.`}
      icon={<Palette size={20} />}
      footer={
        <>
          <Button variant="secondary" onClick={regenerate}>
            Use generated palette
          </Button>
          <Button
            disabled={!valid}
            onClick={() => {
              updateCustomColours(primary, secondary);
              toast({ title: 'Theme updated', description: 'Your campus colours have been saved on this device.' });
              onClose();
            }}
          >
            Save theme
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <ColourInput label="Primary colour" value={primary} fallback={university.colours.primary} onChange={setPrimary} />
        <ColourInput label="Secondary colour" value={secondary} fallback={university.colours.secondary} onChange={setSecondary} />
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-black/5">
        <div className="p-4" style={{ background: isValidHex(primary) ? primary : university.colours.primary, color: '#fff' }}>
          <p className="font-display text-lg font-bold" style={{ mixBlendMode: 'normal' }}>
            Preview header
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-4">
          <span className="h-3 flex-1 rounded-full" style={{ background: isValidHex(secondary) ? secondary : university.colours.secondary }} />
        </div>
      </div>
      {!valid && <p className="mt-3 text-sm text-rose-700">Enter colours as hex values, e.g. #3355AA.</p>}
    </Modal>
  );
}
