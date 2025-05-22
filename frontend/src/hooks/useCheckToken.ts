import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../services/AuthService'; // adapte le chemin si besoin

export const useCheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await verifyToken(token);
        if (response?.valid) {
          console.log('✅ Token valide');
          console.log(response.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);
};
