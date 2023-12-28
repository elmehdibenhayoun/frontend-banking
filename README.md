# FrentendBanking

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Compte Rendu de Projet Angular avec API Spring Boot

## Introduction

Le projet vise à développer une application web utilisant Angular comme framework front-end et une API Spring Boot comme backend. L'application se concentre sur la gestion des clients, des comptes bancaires, des relations clients-comptes, et inclut un système d'authentification.

## Description des Modules

1. **Interfaces**
   - **Customers**: Interface dédiée à la gestion des clients.
   - **Accounts**: Interface pour la gestion des comptes bancaires.
   - **Customers-Accounts**: Interface gérant les relations entre clients et comptes.
   - **Login**: Interface d'authentification permettant aux utilisateurs de se connecter.

2. **Services**
   - **Customers-Services**: Service associé à la gestion des clients.
   - **Accounts-Services**: Service responsable de la gestion des comptes bancaires.
   - **Auth-Service**: Service d'authentification assurant la sécurité de l'application.

3. **Intercepteurs**
   - Des intercepteurs ont été créés pour gérer les requêtes HTTP sortantes et entrantes, assurant un contrôle et une gestion des erreurs appropriés.

4. **Guards**
   - **Authentication Guard**: Un garde-frontière qui protège les routes nécessitant une authentification.
   - **Authorization Guard**: Un garde-frontière qui gère l'autorisation d'accès aux différentes parties de l'application.

5. **Définition des Routes**
   - Les routes ont été définies de manière à permettre une navigation fluide et intuitive au sein de l'application. Des routes sont protégées par les guards d'authentification et d'autorisation pour garantir la sécurité.

6. **Tests des Composants**
   - Tous les composants, services, intercepteurs et guards ont été testés de manière exhaustive pour assurer un fonctionnement correct et identifier tout comportement indésirable.
     ![Gestion des Produits](https://github.com/elmehdibenhayoun/frontend-banking/blob/master/capture/adminlogin.png)
     ![Gestion des Produits](https://github.com/elmehdibenhayoun/frontend-banking/blob/master/capture/adminhome.png)
     ![Gestion des Produits](https://github.com/elmehdibenhayoun/frontend-banking/blob/master/capture/adminAccount.png)
     ![Gestion des Produits](https://github.com/elmehdibenhayoun/frontend-banking/blob/master/capture/authjwt.png)
     ![Gestion des Produits](https://github.com/elmehdibenhayoun/frontend-banking/blob/master/capture/jwt.png)


