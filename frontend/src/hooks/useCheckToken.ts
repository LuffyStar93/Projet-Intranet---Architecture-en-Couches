import { useAuthCheck } from './useAuthCheck';

export const useCheckToken = () => {
  useAuthCheck(); // Utilise useAuthCheck sans rôle requis, redirection par défaut vers /login
};
