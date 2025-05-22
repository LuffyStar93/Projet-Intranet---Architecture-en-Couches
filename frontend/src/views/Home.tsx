import { useEffect, useState } from 'react';
import '../assets/styles/Home.scss';
import { useCheckToken } from '../hooks/useCheckToken';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';
import { showRandom } from '../services/CollaboratorsService';


function Home() {
  useCheckToken();
 
  const [collaborator, setCollaborator] = useState<CollaboratorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showRandom();
        if (data) setCollaborator(data);
      } catch (error) {
        console.error('Failed to fetch a random collaborator', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     <h1>Collaborator random</h1>

      {collaborator && (
      <div>
        <p>{collaborator.firstname}</p>
      </div>
      )}

    </>
  )
}

export default Home
