import type { ReactElement } from 'react';
import { useCheckAdminToken } from '../hooks/useCheckAdminToken';

export default function AdminRoute({ children }: { children: ReactElement }) {
  useCheckAdminToken();
  return children;
}
