import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/AuthService'; // adapte selon ton projet

export const useCheckAdminToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await verifyToken(token);
        if (response?.valid && response.user?.isAdmin) {
          console.log('✅ Admin authentifié');
          console.log(response.user);
        } else {
          navigate('/'); // ou '/login' selon ton app
        }
      } catch (error) {
        console.error('Erreur lors de la vérification admin :', error);
        navigate('/login');
      }
    };

    checkAdminToken();
  }, [navigate]);
};
