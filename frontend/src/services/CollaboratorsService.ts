import axios from "axios";

async function showAll(){
    try {
        const response = await axios.get('http://localhost:9000/api/collaborators/',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        console.log(response.data.data.collaborators);
        return response.data.data.collaborators;
    } catch (error) {
        console.log(error);
    }
}

export { showAll };
