import React, { useState } from "react";
import type { CollaboratorData } from "../interfaces/CollaboratorData.interface";
import "../assets/styles/Formulaire.scss";

/**
 * Interface pour le formulaire de mise à jour
 * Étend CollaboratorData en ajoutant le champ confirmPassword pour la validation du formulaire
 */
export interface CollaboratorWithConfirm extends CollaboratorData {
  confirmPassword?: string; // Optionnel car lié au password
}

interface UpdateCollabFormProps {
  initialData: CollaboratorWithConfirm;
  onSubmit: (data: CollaboratorWithConfirm) => Promise<void>;
  canEditAdmin: boolean; // Contrôle l'affichage de la checkbox isAdmin
  isCreate: boolean; // Contrôle si le formulaire est pour la création ou la mise à jour
  isProfile: boolean; // Indique si le formulaire est utilisé pour le profil de l'utilisateur
}

const FormulaireUpdate: React.FC<UpdateCollabFormProps> = ({ initialData, onSubmit, canEditAdmin, isCreate, isProfile }) => {
  // On crée un nouvel objet sans le mot de passe
  const { password, ...initialDataWithoutPassword } = initialData;
  const [formData, setFormData] = useState<CollaboratorWithConfirm>({
    ...initialDataWithoutPassword,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // State pour le chargement de la soumission
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null); // State pour le message de soumission
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // State pour indiquer si la soumission a réussi

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;

    // Vérifie si c'est un input et que c'est une checkbox
    const val =
    e.target instanceof HTMLInputElement && e.target.type === "checkbox" ?
      e.target.checked
      : value;

    setFormData((prev) => ({
        ...prev,
        [name]: val,
    }));

    // Reset submission message on change
    setSubmissionMessage(null);
    setIsSuccess(null);

    // Vérification du mot de passe seulement si les deux champs sont remplis
    if (name === "confirmPassword" || name === "password") {
      const newPassword = name === "password" ? val : formData.password;
      const newConfirmPassword = name === "confirmPassword" ? val : formData.confirmPassword;
      
      if (newPassword && newConfirmPassword) {
        if (newPassword !== newConfirmPassword) {
          setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
        } else {
          setErrors({});
        }
      } else {
        setErrors({});
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification des mots de passe seulement si on n'est pas en mode création
    if (!isCreate && (formData.password || formData.confirmPassword)) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
        return;
      }
    }


    setSubmissionMessage(null);
    setIsSuccess(null);
    setIsSubmitting(true); // Début de la soumission

    // Création d'un nouvel objet sans les champs de mot de passe si vides
    const dataToSubmit: CollaboratorWithConfirm = { ...formData };
    if (!dataToSubmit.password) {
      dataToSubmit.password = undefined;
      dataToSubmit.confirmPassword = undefined;
    }

    try {
        await onSubmit(dataToSubmit); // Appel de la fonction onSubmit fournie par le parent
        setSubmissionMessage(isCreate ? 'Collaborateur créé avec succès !' : 'Mise à jour réussie ! ');
        setIsSuccess(true);
        // Optionnel : Reset du formulaire après création
        if(isCreate) {
            setFormData({
                gender: '', category: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: '',
                phone: '', birthdate: '', city: '', country: '', photo: '', isAdmin: false
            });
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        setSubmissionMessage('Une erreur est survenue lors de la soumission.');
        setIsSuccess(false);
    } finally {
        setIsSubmitting(false); // Fin de la soumission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container form-transition">
      <h2>{isCreate ? 'Créer un collaborateur' : (isProfile ? 'Mon Profil' : 'Modifier le collaborateur')}</h2>
      
      <div className="form-group">
        <select name="gender" value={formData.gender || ''} onChange={handleChange} required>
          <option value="">Civilité</option>
          <option value="male">Monsieur</option>
          <option value="female">Madame</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div className="form-group">
        <select name="category" value={formData.category || ''} onChange={handleChange} required>
          <option value="">Catégorie</option>
          <option value="Technique">Technique</option>
          <option value="Client">Client</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="form-group">
        <input name="firstname" type="text" value={formData.firstname || ''} onChange={handleChange} placeholder="Prénom" required />
      </div>

      <div className="form-group">
        <input name="lastname" type="text" value={formData.lastname || ''} onChange={handleChange} placeholder="Nom" required />
      </div>

      <div className="form-group">
        <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" type="email" required />
      </div>
      
      <div className="form-group mdp">
        <input 
          name="password" 
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Nouveau mot de passe" 
          type="password"
          required={isCreate} // Required que en create
        />
        </div>

        {!isCreate && (
          <div className="form-group">
            <input
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              placeholder="Confirmer le nouveau mot de passe"
              type="password"
            />
          </div>
        )}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

      <div className="form-group">
        <input name="phone" type="tel" value={formData.phone || ''} onChange={handleChange} placeholder="Téléphone" required />
      </div>

      <div className="form-group">
        <input name="birthdate" type="date" value={formData.birthdate || ''} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <input name="city" type="text" value={formData.city || ''} onChange={handleChange} placeholder="Ville" required />
      </div>

      <div className="form-group">
        <input name="country" type="text" value={formData.country || ''} onChange={handleChange} placeholder="Pays" required />
      </div>

      <div className="form-group">
        <input name="photo" type="url" value={formData.photo || ''} onChange={handleChange} placeholder="URL de la photo" />
      </div>

      {canEditAdmin && (
        <div className="checkbox-group">
          <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
          <span>Administrateur</span>
        </div>
      )}

      {/* Submission message */}
      {submissionMessage && (
        <p className={isSuccess ? 'success-message' : 'error-message'}>
          {submissionMessage}
        </p>
      )}

      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting ? 'Chargement...' : (isCreate ? 'Créer' : 'Modifier')}
      </button>
      

    </form>
  );
};

export default FormulaireUpdate;