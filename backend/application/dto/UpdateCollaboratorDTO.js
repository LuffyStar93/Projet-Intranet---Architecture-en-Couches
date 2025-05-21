class UpdateCollaboratorDTO {
  constructor(data) {
    this.id = data.id;
    this.gender = data.gender;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.birthdate = data.birthdate;
    this.city = data.city;
    this.country = data.country;
    this.photo = data.photo;
    this.category = data.category;
    this.isAdmin = data.isAdmin;
  }

  validate() {
    const errors = [];
    
    if (!this.id) errors.push('L\'ID est requis');
    if (!this.gender) errors.push('Le genre est requis');
    if (!this.firstname) errors.push('Le prénom est requis');
    if (!this.lastname) errors.push('Le nom est requis');
    if (!this.email) errors.push('L\'email est requis');
    if (!this.phone) errors.push('Le téléphone est requis');
    if (!this.birthdate) errors.push('La date de naissance est requise');
    if (!this.city) errors.push('La ville est requise');
    if (!this.country) errors.push('Le pays est requis');
    if (!this.category) errors.push('La catégorie est requise');

    if (this.email && !this.isValidEmail(this.email)) {
      errors.push('Format d\'email invalide');
    }

    if (this.phone && !this.isValidPhone(this.phone)) {
      errors.push('Format de téléphone invalide');
    }

    if (this.birthdate && !this.isValidDate(this.birthdate)) {
      errors.push('Format de date invalide');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }

  isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }
}

export default UpdateCollaboratorDTO; 