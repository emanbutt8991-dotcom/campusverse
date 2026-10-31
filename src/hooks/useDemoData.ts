import { useContext } from 'react';
import { DemoContext } from '../context/DemoContext';

export function useDemoData() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemoData must be used inside DemoProvider');
  return ctx;
}
