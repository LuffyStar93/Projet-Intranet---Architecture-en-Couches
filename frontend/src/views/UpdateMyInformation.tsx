import { useEffect, useState } from 'react'
import '../assets/styles/UpdateCollaborator.scss'
import type { CollaboratorWithConfirm } from '../components/FormulaireUpdate'
import FormulaireUpdate from '../components/FormulaireUpdate'
import { useCheckToken } from '../hooks/useCheckToken'
import { showMe, updateCollaborator } from '../services/CollaboratorsService'

function UpdateMyInformation() {
  useCheckToken();

  const [collaborator, setCollaborator] = useState<CollaboratorWithConfirm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour formater la date ISO en YYYY-MM-DD
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      // Conversion de la date ISO en Date
      const date = new Date(dateString);
      
      // Vérification que la date est valide
      if (isNaN(date.getTime())) {
        console.error('Date invalide:', dateString);
        return '';
      }

      // Formatage en YYYY-MM-DD
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Erreur de formatage de la date:', e);
      return '';
    }
  };

  useEffect(() => {
    const fetchMyInformation = async () => {
      try {
        const data = await showMe();
        setCollaborator({
          ...data,
          birthdate: formatDateForInput(data.birthdate),
          confirmPassword: '' // Ajout du champ confirmPassword requis par le formulaire
        });
      } catch (err) {
        setError('Erreur lors du chargement de vos informations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInformation();
  }, []);

  const handleSubmit = async (data: CollaboratorWithConfirm) => {
    try {
      // Formatage de la date pour correspondre aux validations du backend
      const formattedData = {
        ...data,
        birthdate: new Date(data.birthdate).toISOString().split('T')[0] // Format YYYY-MM-DD
      };

      // Suppression du champ confirmPassword avant l'envoi
      const { confirmPassword, ...dataToSend } = formattedData;
      
      if (!collaborator?.id) {
        throw new Error('ID du collaborateur non trouvé');
      }

      await updateCollaborator(collaborator.id, dataToSend);
      alert('Mise à jour réussie');
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
    return <div>Aucune information trouvée</div>;
  }

  return (
    <div className="update-collaborator-container">
      <h1>Modifier mes informations</h1>
      <FormulaireUpdate 
        initialData={collaborator}
        onSubmit={handleSubmit}
        canEditAdmin={false} // L'utilisateur ne peut pas modifier son statut admin
        isCreate={false}
      />
    </div>
  )
}

export default UpdateMyInformation 