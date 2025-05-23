import { useState, useEffect } from 'react';
import type { CollaboratorData } from "../interfaces/CollaboratorData.interface";
import "../assets/styles/Formulaire.scss";

/**
 * Interface définissant les props de FilterSearch
 * @property {CollaboratorData[]} collaborators - Liste des collaborateurs
 * @property {function} onFilterChange - Callback appelé quand les filtres changent
 */
interface FilterSearchProps {
  collaborators: CollaboratorData[];
  onFilterChange: (filteredCollaborators: CollaboratorData[]) => void;
}

/**
 * Composant pour filtrer les collaborateurs
 * Permet de filtrer par :
 * - Recherche textuelle (nom ou prénom)
 * - Catégorie
 */
const FilterSearch: React.FC<FilterSearchProps> = ({ collaborators, onFilterChange }) => {
  // États pour gérer les différents filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('lastname');
  const [category, setCategory] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'searchbar':
        setSearchTerm(value);
        break;
      case 'searchby':
        setSearchBy(value);
        break;
      case 'category':
        setCategory(value);
        break;
    }
  };

  useEffect(() => {
    const filteredCollaborators = collaborators.filter(collaborator => {
      // Filtre par recherche textuelle (nom ou prénom)
      const matchesSearch = searchTerm === '' || 
        (searchBy === 'lastname' && collaborator.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (searchBy === 'firstname' && collaborator.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtre par catégorie
      const matchesCategory = category === '' || collaborator.category === category;

      // Combine les deux filtres
      return matchesSearch && matchesCategory;
    });

    // Notifie le composant parent des changements
    onFilterChange(filteredCollaborators);
  }, [searchTerm, searchBy, category, collaborators, onFilterChange]);

  return (
    <div className="filter-form">
      <div className="filter-group">
        <div className="form-group">
          <input 
            name="searchbar" 
            value={searchTerm} 
            onChange={handleChange} 
            placeholder="Rechercher un collaborateur..." 
            type='text'
          />
        </div>

        <div className="form-group">
          <select 
            name="searchby" 
            value={searchBy}
            onChange={handleChange}
          >
            <option value="lastname">Rechercher par nom</option>
            <option value="firstname">Rechercher par prénom</option>
          </select>
        </div>

        <div className="form-group">
          <select 
            name="category" 
            value={category}
            onChange={handleChange}
          >
            <option value="">Toutes les catégories</option>
            <option value="Technique">Technique</option>
            <option value="Client">Client</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSearch;