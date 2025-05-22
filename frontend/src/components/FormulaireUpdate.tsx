import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CollaboratorData } from "../interfaces/CollaboratorData.interface";

/**
 * Interface pour le formulaire de mise à jour
 * Étend CollaboratorData en ajoutant le champ confirmPassword pour la validation du formulaire
 */
export interface CollaboratorWithConfirm extends CollaboratorData {
  confirmPassword?: string; // Optionnel car lié au password
}

interface UpdateCollabFormProps {
  initialData: CollaboratorWithConfirm;
  onSubmit: (data: CollaboratorWithConfirm) => void;
  canEditAdmin: boolean; // Contrôle l'affichage de la checkbox isAdmin
  isCreate: boolean; // Contrôle si le formulaire est pour la création ou la mise à jour
}

const FormulaireUpdate: React.FC<UpdateCollabFormProps> = ({ initialData, onSubmit, canEditAdmin, isCreate }) => {
  const navigate = useNavigate();
  // On crée un nouvel objet sans le mot de passe
  const { password, ...initialDataWithoutPassword } = initialData;
  const [formData, setFormData] = useState<CollaboratorWithConfirm>({
    ...initialDataWithoutPassword,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ confirmPassword?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
    const { name, value } = e.target;

    // Vérifie si c'est un input et que c'est une checkbox
    const val =
    e.target instanceof HTMLInputElement && e.target.type === "checkbox"
      ? e.target.checked
      : value;

    setFormData((prev) => ({
        ...prev,
        [name]: val,
    }));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification des mots de passe seulement si on n'est pas en mode création
    if (!isCreate && (formData.password || formData.confirmPassword)) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Les mots de passe ne correspondent pas." });
        return;
      }
    }

    // Création d'un nouvel objet sans les champs de mot de passe si vides
    const dataToSubmit: CollaboratorWithConfirm = { ...formData };
    if (!dataToSubmit.password) {
      dataToSubmit.password = undefined;
      dataToSubmit.confirmPassword = undefined;
    }

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
    <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Civilité</option>
        <option value="male">Monsieur</option>
        <option value="female">Madame</option>
        <option value="other">Autre</option>
      </select>

    <select name="category" value={formData.category  || ''} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Catégorie</option>
        <option value="Technique">Technique</option>
        <option value="Client">Client</option>
        <option value="Marketing">Marketing</option>
      </select>

      <input name="firstname" value={formData.firstname  || ''} onChange={handleChange} placeholder="Prénom" className="w-full p-2 border" />
      <input name="lastname" value={formData.lastname  || ''} onChange={handleChange} placeholder="Nom" className="w-full p-2 border" />
      <input name="email" value={formData.email  || ''} onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 border" />
      
      <div className="password-section">
        <input 
          name="password" 
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Nouveau mot de passe" 
          type="password" 
          className="w-full p-2 border" 
        />
        {!isCreate && 
        <input
          name="confirmPassword"
          value={formData.confirmPassword || ''}
          onChange={handleChange}
          placeholder="Confirmer le nouveau mot de passe"
          type="password"
          className="w-full p-2 border mt-2"
        />        }
        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}

      </div>

      <input name="phone" value={formData.phone  || ''} onChange={handleChange} placeholder="Téléphone" className="w-full p-2 border" />
      <input name="birthdate" value={formData.birthdate  || ''} onChange={handleChange} type="date" className="w-full p-2 border" />
      <input name="city" value={formData.city  || ''} onChange={handleChange} placeholder="Ville" className="w-full p-2 border" />
      <input name="country" value={formData.country  || ''} onChange={handleChange} placeholder="Pays" className="w-full p-2 border" />
      <input name="photo" value={formData.photo  || ''} onChange={handleChange} placeholder="URL de la photo" className="w-full p-2 border" />
 

      

      {canEditAdmin && (
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
          <span>Administrateur</span>
        </label>
      )}
      {!isCreate ? (
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Modifier</button>
      ) : (
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Créer</button>
      )}
      
      
    </form>
  );
};

export default FormulaireUpdate;