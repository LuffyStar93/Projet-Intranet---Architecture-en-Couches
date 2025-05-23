# Projet-Intranet---Architecture-en-Couches

## Résumé du Projet-Intranet réalisé lors de la formation CDA Développement d'Applications 3

Ce projet est une application intranet construite avec une architecture en couches.

### Technologies Utilisées

*   **Backend:**
    *   Node.js et Express pour la construction du serveur et l'API RESTful.
    *   MySQL pour la base de données.
    *   JWT pour l'authentification.
    *   Jest pour les tests unitaires.
*   **Frontend:**
    *   React.js pour la construction de l'interface utilisateur.
    *   TypeScript pour le typage statique et la robustesse du code.
    *   SCSS pour le style des composants.
    *   React Router pour la gestion des routes.
    *   Axios pour les requêtes HTTP.

### Développement Backend

*   **Architecture en Couches:**
    *   **Application:** Gère la logique métier et les cas d'utilisation de l'application.
    *   **Domain:** Contient les entités et les règles métier centrales.
    *   **Infrastructure:** Fournit les services techniques comme la persistance des données et la communication externe.
    *   **Presentation:** Gère l'interface utilisateur et les interactions avec l'utilisateur.
*   **Fonctionnalités:**
    *   API RESTful pour la gestion des collaborateurs et l'authentification.
    *   Intégration de base de données pour le stockage des données.
    *   Gestion des erreurs et validation des données.
    *   Tests unitaires et d'intégration pour assurer la qualité du code.

### Développement Frontend

*   **Gestion des Collaborateurs:**
    *   Implémentation d'un composant `FilterSearch` pour filtrer les données des collaborateurs par nom et catégorie.
    *   Développement d'une vue en carte pour afficher les informations des collaborateurs (nom, âge, catégorie, coordonnées).
    *   Ajout d'une fonctionnalité pour calculer l'âge à partir de la date de naissance.
    *   Assurance que les boutons de modification et de suppression ne sont visibles que pour les administrateurs.
*   **Formulaires:**
    *   Création d'un composant `FormulaireUpdate` pour la mise à jour et la création d'informations sur les collaborateurs.
    *   Implémentation de styles SCSS pour les formulaires avec un thème sombre
*   **Navigation & Authentification:**
    *   Développement d'un composant `Navbar` avec rendu conditionnel des liens en fonction de l'authentification de l'utilisateur et du statut d'administrateur.
    *   Intégration du contexte d'authentification (`useAuth`) pour gérer l'état de l'utilisateur et mettre à jour les éléments de l'interface.
    *   Gestion des processus de connexion et de déconnexion, y compris la gestion des jetons et des utilisateurs.
*   **Vues:**
    *   Intégration de `FilterSearch` et de la vue en carte des collaborateurs dans la page `Collaborators`.
    *   Implémentation de l'affichage d'une carte de collaborateur aléatoire sur la page `Home`.
    *   Mise à jour de la vue `UpdateMyInformation` pour gérer correctement la récupération des données utilisateur après l'authentification.
*   **Styles:**
    *   Création de fichiers SCSS (`Formulaire.scss`, `Collaborators.scss`, `Navbar.scss`) pour le style des différents composants avec un thème sombre.
*   **Services:**
    *   Modification de `AuthService.ts` pour renvoyer correctement les erreurs et les données utilisateur après la connexion.

