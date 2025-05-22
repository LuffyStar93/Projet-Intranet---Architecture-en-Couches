import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Collaborators.scss';
import { useCheckToken } from '../hooks/useCheckToken';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';
import { deleteCollaborator, showAll } from '../services/CollaboratorsService';

function Collaborators() {
  useCheckToken();
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
