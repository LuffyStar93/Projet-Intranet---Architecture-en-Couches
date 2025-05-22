import '../assets/styles/UpdateCollaborator.scss';
import FormulaireUpdate from '../components/FormulaireUpdate';
import { useCheckAdminToken } from '../hooks/useCheckAdminToken';
import type { CollaboratorData } from '../interfaces/CollaboratorData.interface';
import { createCollaborator } from '../services/CollaboratorsService';

function CreateCollaborator() {
  useCheckAdminToken();

  const emptyCollaborator: CollaboratorData = {
    gender: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: '',
    city: '',
    country: '',
    photo: '',
    category: '',
    isAdmin: false,
    password: '',
  };


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

  const handleSubmit = async (data: CollaboratorData) => {
    try {

      // Formatage de la date avant l'envoi
      const formattedData = {
        ...data,
        birthdate: formatDateForInput(data.birthdate)
      };

      
      await createCollaborator(formattedData);
      alert('Création réussie');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-collaborator-container">
      <h1>Créer un collaborateur</h1>
      <FormulaireUpdate 
        initialData={emptyCollaborator}
        onSubmit={handleSubmit}
        canEditAdmin={true}
        isCreate={true}
      />
    </div>
  )
}

export default CreateCollaborator;