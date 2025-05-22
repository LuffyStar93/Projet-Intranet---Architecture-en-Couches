import { useEffect, useState } from 'react';
import '../assets/styles/Collaborators.scss';
import { showAll, deleteCollaborator } from '../services/CollaboratorsService';
import { useNavigate } from 'react-router-dom';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';

function Collaborators() {
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);

  const fetchData = async () => {
    try {
      const data = await showAll();
      if (data) setCollaborators(data);
    } catch (error) {
      console.error('Failed to fetch collaborators', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCollaborator(id);
      // Mise à jour de la liste après suppression
      setCollaborators(collaborators.filter(collab => collab.id !== id));
    } catch (error) {
      console.error('Failed to delete collaborator', error);
    }
  };

  return (
    <>
      <h1>Collaborators</h1>

      {collaborators.map((collaborator) => (
        <div key={collaborator.id}>
          <p>{collaborator.firstname}</p>

          <button onClick={() => navigate(`/update-collaborator`, { state: { collaboratorId: collaborator.id } })}>Modifier</button>
          <button onClick={() => collaborator.id && handleDelete(collaborator.id)}>Supprimer</button>
        </div>
      ))}
    </>
  );
}

export default Collaborators;
