# 🖤 BLACK DACK - Structure du Projet

## Aperçu

BLACK DACK est une application web full-stack pour une maison de mode créée à Bamako, Mali.

## Architecture

```
black-dack/
├── frontend/                    # Site public
│   ├── index.html              # Page d'accueil
│   ├── collection.html         # Page des collections
│   ├── produit.html            # Détail d'un produit
│   ├── histoire.html           # Notre histoire
│   ├── contact.html            # Formulaire de contact
│   └── assets/
│       ├── css/style.css       # Styles
│       ├── js/script.js        # JavaScript côté client
│       ├── logo/logo.svg       # Logo
│       └── images/             # Images des produits
│
├── backend/                     # API REST
│   ├── server.js               # Serveur Express
│   ├── package.json            # Dépendances
│   ├── .env.example            # Variables d'environnement
│   └── routes/
│       ├── admin.js            # Routes admin
│       ├── products.js         # Routes produits
│       ├── orders.js           # Routes commandes
│       └── promotions.js       # Routes promotions
│
├── database/                    # Base de données
│   └── schema.sql              # Structure de la DB
│
└── docs/                        # Documentation
    └── PROJECT_STRUCTURE.md     # Ce fichier
```

## Technologies

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- SQLite/MySQL
- bcryptjs (pour les mots de passe)
- jsonwebtoken (pour l'authentification)

## Collections

### BLACK DENIM
- Jeans personnalisés
- Créations faites main
- Éditions limitées
- Prix: 15 000 FCFA

### BLACK WOMAN
- Robes élégantes
- Design moderne
- Inspiration africaine
- Prix: 25 000 - 28 000 FCFA

## Pages Publiques

1. **Accueil** (`index.html`)
   - Présentation de la marque
   - Collections en avant
   - Localisation

2. **Collections** (`collection.html`)
   - BLACK DENIM
   - BLACK WOMAN
   - Éditions limitées

3. **Détail Produit** (`produit.html`)
   - Image produit
   - Prix et description
   - Tailles disponibles
   - Bouton commander

4. **Histoire** (`histoire.html`)
   - Origines de BLACK DACK
   - Vision et philosophie
   - Valeurs de la marque

5. **Contact** (`contact.html`)
   - Localisation
   - Liens sociaux (WhatsApp, Instagram)
   - Formulaire de contact

## Espace Admin

### Authentification
- Email + Mot de passe
- JWT tokens
- Sessions sécurisées

### Dashboard
- Nombre de produits
- Ventes totales
- Commandes en attente
- Promotions actives

### Gestion des Produits
- Ajouter produit
- Modifier prix, description, disponibilité
- Supprimer produit

### Gestion des Commandes
- Voir toutes les commandes
- Statuts: En attente, Préparation, Livrée
- Informations client

### Gestion des Promotions
- Créer codes promotionnels
- Définir réductions
- Dates d'expiration

## Paiements

Moyens de paiement adaptés au Mali:
- 💳 Orange Money
- 💳 Moov Money
- 📦 Paiement à la livraison (COD)

## Variables d'Environnement

Voir `.env.example` pour la configuration requise.

## Prochaines Étapes

1. ✅ Structure du projet
2. ⬜ Implémentation du frontend
3. ⬜ Développement de l'API backend
4. ⬜ Configuration de la base de données
5. ⬜ Intégration des paiements
6. ⬜ Système d'authentification admin
7. ⬜ Déploiement

---

**BLACK DACK** — Créé pour être unique. 🖤
