/**
 * Entité Collaborator - Couche Domaine
 * Représente un collaborateur dans le système
 * 
 * TODO: Implémentez cette classe avec tous les attributs et méthodes nécessaires
 */
class Collaborator {
  constructor(id,gender, firstname, lastname, email, password, phone, birthdate, city, country, phone, category, isAdmin) {
    this.id = id;
    this.gender = gender;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.birthdate = birthdate;
    this.city = city;
    this.country = country;
    this.photo = photo;
    this.category = category;
    this.isAdmin = isAdmin;
    // Ajoutez tous les autres attributs nécessaires
  }

  // Exemple de méthode métier
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  isAdministrator() {
    return `${this.isAdmin}`;
  }

  // TODO: Ajoutez d'autres méthodes métier
}

export default Collaborator; 