# Avis sur les témoins de Screendibs

**TRADUCTION DE TRAVAIL, NON RÉVISÉE (9 novembre 2026).** Traduction assistée par IA de `drafts/legal-beta/cookie-notice.md` (version bêta), à faire réviser par un traducteur juridique et par Jonathan Nuss. N’est pas en vigueur et n’est pas publiée. Les ajouts propres à la bêta sont marqués [BÊTA].

Dernière mise à jour : [date]

Le présent avis explique les témoins et les technologies semblables utilisés par **Screendibs Technologies Inc.** sur la plateforme Screendibs à l’adresse [screendibs.com] (la « Plateforme ») et sur le site Web de l’entreprise à l’adresse [company.screendibs.com] (le « Site »). Il fait partie de notre Politique de confidentialité.

## Ce que sont les témoins et les technologies semblables

Les témoins (« cookies ») sont de petits fichiers texte qu’un site Web enregistre dans votre navigateur. Des technologies semblables, comme le stockage local du navigateur et IndexedDB, enregistrent aussi des renseignements sur votre appareil. Dans le présent avis, nous les appelons tous des « témoins ».

## Notre approche

**Nous utilisons uniquement des témoins strictement nécessaires au fonctionnement de la Plateforme ou qui mémorisent un choix que vous avez fait.** Nous n’utilisons ni témoins publicitaires, ni témoins analytiques, ni pixels de réseaux sociaux, ni aucun témoin qui vous suit sur d’autres sites Web. C’est pourquoi nous n’affichons pas de bandeau de consentement aux témoins. Si nous souhaitons un jour ajouter des témoins non essentiels, nous mettrons à jour le présent avis et vous demanderons d’abord votre consentement.

## Témoins de la Plateforme

### Connexion (strictement nécessaire)

- **Fournisseur :** Google Firebase Authentication.
- **Ce qui est enregistré :** votre identifiant d’utilisateur et vos jetons de connexion, dans le stockage de votre navigateur (IndexedDB ou stockage local).
- **Pourquoi :** pour que vous restiez connecté et pour prouver à nos serveurs que les requêtes proviennent de votre compte.
- **Durée :** jusqu’à ce que vous vous déconnectiez ou effaciez le stockage de votre navigateur. [HYPOTHÈSE : persistance par défaut de Firebase; les jetons se renouvellent automatiquement.]

### Paiements et prévention de la fraude (strictement nécessaire)

- **Fournisseur :** Stripe.
- **Ce qui est enregistré :** des témoins comme « __stripe_mid » (environ un an) et « __stripe_sid » (environ 30 minutes), déposés lorsque vous ouvrez une page de paiement.
- **Pourquoi :** pour traiter les paiements de façon sécuritaire et pour détecter et prévenir la fraude.
- **Pour en savoir plus :** la politique de confidentialité et la politique sur les témoins de Stripe sur stripe.com.

[HYPOTHÈSE : Stripe.js ne se charge que lorsqu’un parcours de paiement est ouvert. Ben doit confirmer les noms et les durées des témoins sur la Plateforme en production.]

### Préférence d’affichage (fonctionnel)

- **Fournisseur :** Screendibs.
- **Ce qui est enregistré :** votre choix d’affichage clair ou sombre, dans le stockage local sous les noms « screendibs-theme » et « darkMode ».
- **Pourquoi :** pour mémoriser l’affichage que vous avez choisi.
- **Durée :** jusqu’à ce que vous effaciez le stockage de votre navigateur.

### Préférence linguistique (fonctionnel) [BÊTA]

- **Fournisseur :** Screendibs.
- **Ce qui est enregistré :** le fait que vous avez choisi le français ou l’anglais, dans le stockage local sous le nom « screendibs-lang ». Si vous êtes connecté, ce choix est aussi enregistré dans votre compte pour que les courriels et les rapports soient dans cette langue.
- **Pourquoi :** pour afficher la Plateforme dans la langue que vous avez choisie.
- **Durée :** jusqu’à ce que vous effaciez le stockage de votre navigateur (la copie enregistrée dans votre compte est conservée jusqu’à ce que vous la modifiiez ou fermiez votre compte).

### Avis de version bêta (fonctionnel) [BÊTA]

- **Fournisseur :** Screendibs.
- **Ce qui est enregistré :** le fait que vous avez fermé l’avis de version bêta, dans le stockage local sous le nom « screendibs-beta-notice-dismissed-v1 ».
- **Pourquoi :** pour que l’avis ne réapparaisse pas à chaque visite.
- **Durée :** jusqu’à ce que vous effaciez le stockage de votre navigateur.

### Polices et bibliothèques logicielles (aucun témoin)

La Plateforme charge des polices depuis Google Fonts et des bibliothèques logicielles servant à créer les fichiers PDF depuis le service cdnjs de Cloudflare. Ces fournisseurs ne déposent pas de témoins à cette fin, mais ils reçoivent votre adresse IP et des renseignements sur votre navigateur lors du téléchargement des fichiers. [DÉCISION pour Ben et Jon : héberger nous-mêmes les polices et les bibliothèques pour éviter ces transferts, en particulier pour les visiteurs de l’UE.]

## Témoins du Site

Le Site n’utilise aucun outil d’analyse ni de publicité. **[BÊTA]** Il dépose un seul témoin fonctionnel, uniquement si vous utilisez le sélecteur de langue : « lang » (valeur « en » ou « fr », pour un an), afin que le Site reste dans la langue choisie. Sans ce témoin, le Site s’affiche en anglais. Notre hébergeur, Vercel, consigne des renseignements techniques comme les adresses IP dans des journaux de serveur, à des fins de sécurité et d’exploitation. [HYPOTHÈSE : à vérifier sur le Site déployé.]

## Comment contrôler les témoins

Vous pouvez supprimer ou bloquer les témoins et le stockage du navigateur dans les réglages de votre navigateur. Si vous bloquez ou supprimez le stockage de connexion, vous serez déconnecté et ne pourrez plus utiliser votre compte. Si vous bloquez les témoins de Stripe, les paiements pourraient échouer.

## Nous joindre

Questions sur le présent avis : [privacy@screendibs.com — ESPACE RÉSERVÉ]

Screendibs Technologies Inc., Montréal, Canada
