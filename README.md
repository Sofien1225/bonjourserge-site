# BonjourSerge — site de démonstration

Version partageable du site statique de prépublication destiné aux dirigeants et directions des
opérations des PME du bâtiment et de l'ingénierie à Genève et dans le canton de Vaud.

Le dépôt contient uniquement la V2 active. L'adresse GitHub Pages sert à valider le rendu avant le
lancement sur `bonjourserge.ch`.

## Pages

- `index.html` : accueil V2 actif dans le dossier ;
- `solution.html` : missions et limites du produit ;
- `methode.html` : installation, responsabilités et transmission ;
- `securite.html` : propriété, accès, sauvegarde et validation ;
- `demonstration.html` : scénarios fictifs et état des preuves ;
- `a-propos.html` : fondateur et positionnement terrain ;
- `contact.html` : Calendly et préparation d'un email local ;
- `construction.html` : page de campagne pour `construction.bonjourserge.ch` ;
- `mentions-legales.html` et `confidentialite.html` : structures à compléter avant publication.

## Fonctionnement

Le site n'a ni base de données ni service côté serveur. Le diagnostic utilise des réponses locales
et ne communique pas avec Hermes. Le formulaire Contact prépare un email dans la messagerie du
visiteur. La dictée vocale peut utiliser le service fourni par son navigateur.

## Fichiers partagés

- `site-v2.css` : système visuel, responsive et états accessibles ;
- `site-v2.js` : navigation, onglets, diagnostic local et formulaire ;
- `favicon.svg`, `site.webmanifest`, `robots.txt` et les sitemaps : identité et référencement.
- `og-bonjourserge.png` : carte de partage 1 200 × 630 px ;

## Avant publication

1. Acheter et connecter `bonjourserge.ch` et le sous-domaine Construction.
2. Remplacer l'email provisoire et créer un Calendly au nom de BonjourSerge.
3. Compléter les mentions avec l'extrait officiel de l'entité qui facture et l'hébergeur retenu.
4. Fixer les durées de conservation et remplacer ou documenter les polices externes.
5. Produire les trois démonstrations Hermes réelles, le portrait fondateur et la première preuve client.
6. Brancher une mesure respectueuse du consentement, puis vérifier les rendez-vous de test.

Le prix Suisse reste volontairement absent jusqu'au chiffrage de la livraison.

## Validation du 17 août 2026

- syntaxe JavaScript, XML, manifeste et sept blocs JSON-LD valides ;
- onze pages contrôlées, avec un seul H1, des identifiants uniques et aucun lien local absent ;
- trente-trois contrôles de rendu à 390, 768 et 1 440 px, sans débordement ni erreur JavaScript ;
- audit Axe sur les onze pages pour WCAG 2 A, 2 AA et 2.1 AA, aucune violation détectée ;
- menu mobile, retour du focus, onglets de démonstration, dialogue, réponse locale et formulaire testés dans Chrome.

La mesure des Core Web Vitals reste à faire sur le domaine déployé. Un score local ne représenterait
ni le futur hébergeur, ni le réseau des visiteurs, ni le chargement réel des polices.
