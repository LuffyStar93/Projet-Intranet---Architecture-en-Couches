import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.scss';
import { loginForm } from '../services/AuthService';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [isLoginError, setError] = useState(false)
    

    const handleSubmit = async (e:any) => {
        e.preventDefault() // Prevent form from reloading the page
        try {
        console.log(email, password);
        const token = await loginForm(email, password);
        if(token){
            localStorage.setItem('token', token);
            navigate('/');
        }else{
            setError(!isLoginError)
            navigate('/login');
        }
        }catch (err) {
            console.log("Login error:", err);
        }
    }

  return (
    <>
     <h1>Login</h1>
    {isLoginError? <div className='isLoginError'><p>Identifiant ou mots de passe incorrect</p></div>: ''}
     <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input onChange={e => {setEmail(e.target.value)}} id="email" type="email" />
        <label htmlFor="password">Password</label>
        <input onChange={e => {setPassword(e.target.value)}} id="password" type="password" />
        <button type="submit">LOG IN</button>
     </form>
    </>
  )
}

export default Login

