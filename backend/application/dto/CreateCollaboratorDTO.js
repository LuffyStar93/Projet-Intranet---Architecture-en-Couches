class CreateCollaboratorDTO {
  constructor(data) {
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
    this.isAdmin = data.isAdmin || false;
  }

  validate() {
    const errors = [];
    
    if (!this.gender || typeof this.gender !== 'string') errors.push('Le genre est requis');
    if (!this.firstname || typeof this.firstname !== 'string') errors.push('Le prénom est requis ');
    if (!this.lastname || typeof this.lastname !== 'string') errors.push('Le nom est requis');
    if (!this.email || typeof this.email !== 'string') errors.push('L\'email est requis');
    if (!this.password || typeof this.password !== 'string') errors.push('Le mot de passe est requis');
    if (!this.phone || typeof this.phone !== 'string') errors.push('Le téléphone est requis');
    if (!this.birthdate || typeof this.birthdate !== 'string') errors.push('La date de naissance est requise');
    if (!this.city || typeof this.city !== 'string') errors.push('La ville est requise');
    if (!this.country || typeof this.country !== 'string') errors.push('Le pays est requis');
    if (!this.category || typeof this.category !== 'string') errors.push('La catégorie est requise');
    if (typeof this.isAdmin !== 'boolean') errors.push('Le champ isAdmin est requis');

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
    const phoneRegex = /^(?:(?:\+33|0033|0)[1-9])(?:[\s.-]?\d{2}){4}$/;
    return phoneRegex.test(phone);
  }

  isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }
}

export default CreateCollaboratorDTO;