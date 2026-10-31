import { useContext } from 'react';
import { UniversityContext } from '../context/UniversityContext';
import type { UniversityConfig } from '../types/university';

export function useUniversityContext() {
  const ctx = useContext(UniversityContext);
  if (!ctx) throw new Error('useUniversityContext must be used inside UniversityProvider');
  return ctx;
}

/** For pages rendered inside the app shell, where a university is guaranteed. */
export function useUniversity(): UniversityConfig {
  const { university } = useUniversityContext();
  if (!university) throw new Error('No university selected');
  return university;
}
