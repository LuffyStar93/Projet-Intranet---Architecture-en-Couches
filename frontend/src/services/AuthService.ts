import axios from "axios";



async function loginForm(email: string,password: string){
        try {
            const requestBody = {email, password}
            const response = await axios.post('http://localhost:9000/api/auth/login', requestBody)
            return response.data;
        } catch (error) {
            throw error;
        }
}

async function verifyToken(token: string){
    try {
        const requestBody = {token}
        const response = await axios.post('http://localhost:9000/api/auth/verify', requestBody)
        return response.data;
    } catch (error) {
        return error;
    }
}


async function logout(){
        localStorage.removeItem('token');
}

export { loginForm, logout, verifyToken };
