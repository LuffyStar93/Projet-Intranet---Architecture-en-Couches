import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginForm } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/Login.scss';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const response = await loginForm(email, password);
            if (response?.token) {
                localStorage.setItem('token', response.token);
                setUser({
                    id: response.user.id,
                    email: response.user.email,
                    isAdmin: response.user.isAdmin
                });
            } else {
                setError("Identifiants invalides");
            }
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            setError("Une erreur est survenue");
        }
    }

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={e => setEmail(e.target.value)} 
                        id="email" 
                        type="email" 
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        onChange={e => setPassword(e.target.value)} 
                        id="password" 
                        type="password" 
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}

