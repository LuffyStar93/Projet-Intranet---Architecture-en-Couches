class FilterCollaboratorDTO {
  constructor(data) {
    this.category = data.category;
  }

  validate() {
    const errors = [];
    
    if (!this.category) {
      errors.push('La catégorie est requise pour le filtrage');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toQueryParams() {
    return { category: this.category };
  }
}

export default FilterCollaboratorDTO; 