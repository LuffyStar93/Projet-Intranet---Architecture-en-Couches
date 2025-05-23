import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Collaborators.scss';
import { useAuth } from '../context/AuthContext';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';
import { deleteCollaborator, showAll } from '../services/CollaboratorsService';
import FilterSearch from '../components/FilterSearch';

function Collaborators() {
  // Hook pour récupérer les informations de l'utilisateur connecté
  const { user } = useAuth();
  const navigate = useNavigate();

  // États pour gérer la liste des collaborateurs
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);
  const [filteredCollaborators, setFilteredCollaborators] = useState<CollaboratorData[]>([]);

  /**
   * Calcule l'âge d'un collaborateur à partir de sa date de naissance
   * @param birthdate - Date de naissance du collaborateur
   * @returns L'âge calculé en années
   */
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const fetchData = async () => {
    try {
      const data = await showAll();
      if (data) {
        setCollaborators(data);
        setFilteredCollaborators(data);
      }
    } catch (error) {
      console.error('Failed to fetch collaborators', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Gère la suppression d'un collaborateur
   * @param id - ID du collaborateur à supprimer
   */
  const handleDelete = async (id: number) => {
    // Demander confirmation avant de supprimer
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce collaborateur ?');

    if (isConfirmed) {
      try {
        await deleteCollaborator(id);
        // Met à jour les deux listes après la suppression
        setCollaborators(collaborators.filter(collab => collab.id !== id));
        setFilteredCollaborators(filteredCollaborators.filter(collab => collab.id !== id));
      } catch (error) {
        console.error('Failed to delete collaborator', error);
        alert('Erreur lors de la suppression du collaborateur.'); // Ajouter un message d'erreur
      }
    }
  };

  return (
    <div className="collaborators-container">
      <h1>Collaborateurs</h1>
      
      <FilterSearch 
        collaborators={collaborators} 
        onFilterChange={setFilteredCollaborators} 
      />

      <div className="collaborators-grid">
        {filteredCollaborators.map((collaborator) => (
          <div key={collaborator.id} className="collaborator-card">
            <img 
              src={collaborator.photo || 'https://via.placeholder.com/100'} 
              alt={`${collaborator.firstname} ${collaborator.lastname}`}
              className="collaborator-photo"
            />
            <div className="card-content-wrapper">
              <div className="card-header">
                <div className="collaborator-info">
                  <h2>{collaborator.firstname} {collaborator.lastname}</h2>
                  <p>{collaborator.category}</p>
                </div>
                {/* Boutons d'action pour les administrateurs */}
                {user?.isAdmin ? (
                  <div className="admin-actions">
                    <button 
                      className="edit-button"
                      onClick={() => navigate(`/update-collaborator`, { state: { collaboratorId: collaborator.id } })}
                    >
                      Modifier
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => collaborator.id && handleDelete(collaborator.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="card-content">
                <div className="info-grid">
                  <div className="info-label">Âge:</div>
                  <div className="info-value">{calculateAge(collaborator.birthdate)} ans</div>
                  
                  <div className="info-label">Ville:</div>
                  <div className="info-value">{collaborator.city}</div>
                  
                  <div className="info-label">Pays:</div>
                  <div className="info-value">{collaborator.country}</div>
                  
                  <div className="info-label">Email:</div>
                  <div className="info-value truncate">{collaborator.email}</div>
                  
                  <div className="info-label">Téléphone:</div>
                  <div className="info-value">{collaborator.phone}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collaborators;

