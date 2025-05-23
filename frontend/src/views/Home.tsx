import { useEffect, useState } from 'react';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';
import { showRandom } from '../services/CollaboratorsService';
import '../assets/styles/Collaborators.scss';

function Home() {
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

  const handleRandomClick = async () => {
    try {
      const data = await showRandom();
      if (data) setCollaborator(data);
    } catch (error) {
      console.error('Failed to fetch a random collaborator', error);
    }
  };

  return (
    <div className="collaborator-container collaborators-container">
      <h1>Collaborateur du jour</h1>

      {collaborator && (
        <div className="collaborator-card">
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
      )}
      <button onClick={handleRandomClick} className="random-button">
        Changer de collaborateur
      </button>
    </div>
  );
}

export default Home;
