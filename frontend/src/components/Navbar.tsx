import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/AuthService';
import '../assets/styles/Navbar.scss'
import { useEffect, useState } from 'react';
import intranetLogo from '../assets/intranet.png';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Convertit la valeur de user (objet ou null) en booléen strict (true ou false)
    setIsAuthenticated(!!user);
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => isAuthenticated && navigate('/')}>
        <img src={intranetLogo} alt="Logo Intranet" />
        <span>Intranet</span>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/collaborators')} className="navbar-item">
              Collaborateurs
            </button>
            {user?.isAdmin ? (
              <button onClick={() => navigate('/create-collaborator')} className="navbar-item">
                Ajouter
              </button>
            ) : null}
            <button onClick={() => navigate('/profile')} className="navbar-item profile-btn">
              Profil
            </button>
            <button onClick={handleLogout} className="navbar-item logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="navbar-item">
            Connexion
          </button>
        )}
      </div>
    </nav>
  );
} 