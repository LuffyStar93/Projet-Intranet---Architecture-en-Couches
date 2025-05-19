/**
 * Entité Collaborator - Couche Domaine
 * Représente un collaborateur dans le système
 * 
 * TODO: Implémentez cette classe avec tous les attributs et méthodes nécessaires
 */
class Collaborator {
  constructor(id, firstname, lastname, email) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    // Ajoutez tous les autres attributs nécessaires
  }

  // Exemple de méthode métier
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  // TODO: Ajoutez d'autres méthodes métier
}

export default Collaborator; 