import { useAuthCheck } from './useAuthCheck';

export const useCheckAdminToken = () => {
  // Utilise useAuthCheck avec le rôle 'admin' et redirection vers la page d'accueil en cas d'échec
  useAuthCheck('admin', '/');
};
