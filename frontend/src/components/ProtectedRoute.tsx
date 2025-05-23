import type { ReactElement } from 'react';
import { useCheckToken } from '../hooks/useCheckToken';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  useCheckToken();
  return children;
}