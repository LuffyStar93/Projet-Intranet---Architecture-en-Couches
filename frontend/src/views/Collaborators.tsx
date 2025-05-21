import { useEffect, useState } from 'react';
import '../assets/styles/Collaborators.scss';
import { showAll } from '../services/CollaboratorsService';

export interface CollaboratorData {
  id: number;
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: string;
  birthdate: string;
  city: string;
  country: string;
  photo: string;
  category: string;
  isAdmin: boolean;
}

function Collaborators() {
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showAll();
        if (data) setCollaborators(data);
      } catch (error) {
        console.error('Failed to fetch collaborators', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Collaborators</h1>

      {collaborators.map((collaborator) => (
        <div key={collaborator.id}>
          <p>{collaborator.firstname}</p>
        </div>
      ))}
    </>
  );
}

export default Collaborators;
