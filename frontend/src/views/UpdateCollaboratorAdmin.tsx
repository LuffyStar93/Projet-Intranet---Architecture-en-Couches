import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../assets/styles/UpdateCollaborator.scss'
import type { CollaboratorWithConfirm } from '../components/FormulaireUpdate'
import FormulaireUpdate from '../components/FormulaireUpdate'
import { useCheckAdminToken } from '../hooks/useCheckAdminToken'
import { getById, updateCollaborator } from '../services/CollaboratorsService'

function UpdateCollaboratorAdmin() {
  useCheckAdminToken();
  const navigate = useNavigate();
  // useLocation nous permet d'accéder à l'objet location qui contient les informations de navigation
  // location.state contient les données passées via navigate() dans le composant parent
  const location = useLocation();
  // On récupère l'ID du collaborateur depuis le state de la navigation
  // Le ?. est l'opérateur de chaînage optionnel qui évite une erreur si state est undefined
  const collaboratorId = location.state?.collaboratorId;
  const [collaborator, setCollaborator] = useState<CollaboratorWithConfirm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Formate une date ISO en format YYYY-MM-DD pour l'input de type date
   * @param dateString - La date au format ISO (ex: "2024-03-20T00:00:00.000Z")
   * @returns La date au format YYYY-MM-DD ou une chaîne vide en cas d'erreur
   */
  const formatDateForInput = (dateString: string): string => {
    if (!dateString?.trim()) {
      console.warn('Date vide ou non définie');
      return '';
    }
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        console.error('Date invalide:', dateString);
        return '';
      }

      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Erreur de formatage de la date:', e);
      return '';
    }
  };

  useEffect(() => {
    const fetchCollaborator = async () => {
      try {
        // Vérification de la présence de l'ID dans le state
        if (!collaboratorId) {
          throw new Error('ID du collaborateur non fourni');
        }
        const data = await getById(collaboratorId);
        setCollaborator({
          ...data,
          birthdate: formatDateForInput(data.birthdate),
          confirmPassword: '' // Ajout du champ confirmPassword requis par le formulaire
        });
      } catch (err) {
        setError('Erreur lors du chargement du collaborateur');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborator();
  }, [collaboratorId]);

  const handleSubmit = async (data: CollaboratorWithConfirm) => {
    try {
      // Vérification de la présence de l'ID avant la mise à jour
      if (!collaboratorId) {
        throw new Error('ID du collaborateur non fourni');
      }

      // Formatage de la date avant l'envoi
      const formattedData = {
        ...data,
        birthdate: formatDateForInput(data.birthdate)
      };

      // Suppression du champ confirmPassword avant l'envoi
      const { confirmPassword, ...dataToSend } = formattedData;
      
      await updateCollaborator(collaboratorId, dataToSend);
      alert('Mise à jour réussie');
      // Redirection vers la liste des collaborateurs après la mise à jour
      navigate('/collaborators');
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!collaborator) {
    return <div>Aucun collaborateur trouvé</div>;
  }

  return (
    <div className="update-collaborator-container">
      <h1>Modifier le collaborateur</h1>
      <FormulaireUpdate 
        initialData={collaborator}
        onSubmit={handleSubmit}
        canEditAdmin={true}
        isCreate={false}
      />
    </div>
  )
}

export default UpdateCollaboratorAdmin