import type { ReactNode } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
  icon?: ReactNode;
}

export function ConfirmDialog({ open, title, description, confirmLabel, onConfirm, onCancel, children, icon }: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      size="sm"
      icon={icon}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} data-autofocus>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
      <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
        Prototype notice: this is a simulated action. No real student is contacted and nothing is reserved or paid for.
      </p>
    </Modal>
  );
}
