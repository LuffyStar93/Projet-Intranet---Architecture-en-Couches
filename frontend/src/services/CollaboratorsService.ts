import axios from "axios";
import type { CollaboratorData } from "../interfaces/CollaboratorData.interface";

async function showAll(){
    try {
        const response = await axios.get('http://localhost:9000/api/collaborators/',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return response.data.data.collaborators;
    } catch (error) {
        throw error
    }
}

async function showRandom(){
    try {
        const response = await axios.get('http://localhost:9000/api/collaborators/random',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        return response.data.data.collaborator;
    } catch (error) {
        throw error
    }
}

async function showMe(){
    try {
        const response = await axios.get('http://localhost:9000/api/auth/me',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        
        return response.data;
    } catch (error) {
        throw error
    }
}

async function getById(id: number) {
    try {
        const response = await axios.get(`http://localhost:9000/api/collaborators/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return response.data.data.collaborator;
    } catch (error) {
        throw error;
    }
}

async function createCollaborator(data: CollaboratorData) {
    try {

        const response = await axios.post(`http://localhost:9000/api/collaborators/`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function updateCollaborator(id: number, data: CollaboratorData) {
    try {
        // Si le mot de passe est vide, on le retire des données à envoyer
        const dataToSend = { ...data };
        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        const response = await axios.patch(`http://localhost:9000/api/collaborators/${id}`, dataToSend, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return response.data;
    } catch (error) {

        throw error;
    }
}

async function updateMe(data: CollaboratorData) {
    try {
        // Si le mot de passe est vide, on le retire des données à envoyer
        const dataToSend = { ...data };
        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        const response = await axios.patch(`http://localhost:9000/api/auth/me`, dataToSend, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return response.data;
    } catch (error) {

        throw error;
    }
}

async function deleteCollaborator(id: number) {
    try {
        const response = await axios.delete(`http://localhost:9000/api/collaborators/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { showAll, showRandom, showMe, getById, createCollaborator, updateMe, updateCollaborator, deleteCollaborator };
