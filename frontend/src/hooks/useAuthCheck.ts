import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/AuthService';
import { useAuth } from '../context/AuthContext'; // Corrected path

/**
 * Custom hook to check authentication status and user role.
 * Redirects based on the result.
 *
 * @param requiredRole - Optional. The role required to access the route ('admin').
 * @param redirectPath - The path to redirect to if the check fails.
 */
export const useAuthCheck = (requiredRole?: 'admin', redirectPath = '/login') => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth(); // Utilisez le contexte AuthContext

  useEffect(() => {
    // Si le contexte est encore en chargement, ne rien faire encore
    if (loading) {
      return;
    }

    // Vérifier si l'utilisateur est authentifié
    if (!user) {
      navigate(redirectPath, { replace: true });
      return;
    }

    // Si un rôle spécifique est requis, vérifier le rôle de l'utilisateur
    if (requiredRole === 'admin' && !user.isAdmin) {
      // Rediriger vers la page d'accueil si pas admin (ou une autre page appropriée)
      navigate('/', { replace: true });
      return;
    }

    // Si tout est bon, ne rien faire (l'enfant sera rendu)

  }, [user, loading, requiredRole, redirectPath, navigate]);
}; 