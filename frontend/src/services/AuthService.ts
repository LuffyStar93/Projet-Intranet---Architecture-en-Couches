import axios from "axios";



async function loginForm(email: string,password: string){
        try {
            const requestBody = {email, password}
            console.log("<br Inside loginForm");
            console.log(requestBody);
            const response = await axios.post('http://localhost:9000/api/auth/login', requestBody)
            console.log(response);
            localStorage.setItem('token', response.data.token)
            return response.data.token;
        } catch (error) {
            console.log(error);
        }
}

async function logout(){
        localStorage.removeItem('token');
}

export { loginForm, logout };
