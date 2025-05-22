export interface CollaboratorData {
  id?: number;
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: string;
  birthdate: string;
  city: string;
  country: string;
  photo: string;
  category: string;
  isAdmin: boolean;
}