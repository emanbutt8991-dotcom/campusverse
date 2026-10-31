import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

const base =
  'w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 focus:ring-uni-primary/15 focus:border-uni-primary';

interface Wrap {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  srOnlyLabel?: boolean;
}

function FieldWrap({ id, label, error, hint, optional, srOnlyLabel, children }: Wrap & { id: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={srOnlyLabel ? 'sr-only' : 'mb-1.5 block text-sm font-semibold text-slate-800'}>
        {label} {optional && <span className="font-normal text-slate-500">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1 text-xs font-medium text-rose-700" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({ label, error, hint, optional, srOnlyLabel, className = '', ...rest }: Wrap & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} error={error} hint={hint} optional={optional} srOnlyLabel={srOnlyLabel}>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${base} h-11 ${error ? 'border-rose-400' : 'border-slate-200'} ${className}`} {...rest} />
    </FieldWrap>
  );
}

export function SelectField({ label, error, hint, optional, srOnlyLabel, children, className = '', ...rest }: Wrap & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} error={error} hint={hint} optional={optional} srOnlyLabel={srOnlyLabel}>
      <select id={id} aria-invalid={!!error} className={`${base} h-11 ${error ? 'border-rose-400' : 'border-slate-200'} ${className}`} {...rest}>
        {children}
      </select>
    </FieldWrap>
  );
}

export function TextArea({ label, error, hint, optional, srOnlyLabel, className = '', ...rest }: Wrap & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} error={error} hint={hint} optional={optional} srOnlyLabel={srOnlyLabel}>
      <textarea id={id} aria-invalid={!!error} className={`${base} min-h-[96px] py-2.5 ${error ? 'border-rose-400' : 'border-slate-200'} ${className}`} {...rest} />
    </FieldWrap>
  );
}

/** Toggleable pill used for filters and tag pickers. */
export function Chip({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: ReactNode; icon?: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition ${
        active ? 'border-uni-primary bg-uni-primary text-uni-onprimary shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-uni-primary/40 hover:bg-uni-soft'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
