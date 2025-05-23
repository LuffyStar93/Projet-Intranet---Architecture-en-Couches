import { useEffect, useState } from 'react'
import type { CollaboratorWithConfirm } from '../components/FormulaireUpdate'
import FormulaireUpdate from '../components/FormulaireUpdate'
import { showMe, updateMe } from '../services/CollaboratorsService'
import { useAuth } from '../context/AuthContext'

function UpdateMyInformation() {

  const { user, loading } = useAuth()

  const [collaborator, setCollaborator] = useState<CollaboratorWithConfirm | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);
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
      setInfoLoading(true);
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
        setInfoLoading(false);
      }
    };

    // S'assurer que le contexte est chargé ET que l'utilisateur est disponible avant de fetch les infos
    if (!loading && user && user.id) {
      fetchMyInformation();
    } else if (!loading && !user) {
        setInfoLoading(false);
        setError('Utilisateur non authentifié.');
    } else if (!loading && user && !user.id) {
         setInfoLoading(false);
         setError('ID utilisateur non disponible.');
    }

  }, [user, loading]);

  const handleSubmit = async (data: CollaboratorWithConfirm) => {
    try {
      // Formatage de la date pour correspondre aux validations du backend
      const formattedData = {
        ...data,
        birthdate: new Date(data.birthdate).toISOString().split('T')[0] // Format YYYY-MM-DD
      };

      // Suppression du champ confirmPassword avant l'envoi
      const { confirmPassword, ...dataToSend } = formattedData;
      
      await updateMe(dataToSend);
      alert('Mise à jour réussie');
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  if (infoLoading) {
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
      <FormulaireUpdate 
        initialData={collaborator}
        onSubmit={handleSubmit}
        canEditAdmin={false}
        isCreate={false}
        isProfile={true}
      />
    </div>
  )
}

export default UpdateMyInformation 