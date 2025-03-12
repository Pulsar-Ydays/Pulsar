// lib/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      profil: 'Profile',
      overview: 'Overview',
      wallet: 'Wallet',
      swap: 'Swap',
      cryptos: 'Cryptos',
      calculator: 'Calculator',
      term_and_condition: '© 2024 Pulsar. All rights reserved. Terms & ConditionsPrivacy Policy',
      create_account: 'Create Account',
      username: 'Username',
      your_username: 'Your Username',
      email: 'Email',
      'example@domain.com': 'example@domain.com',
      password: 'Password',
      your_password: 'Your Password',
      forgotten_password: 'Forgotten password?',
      enter_your_password: 'Enter your password',
      hello_explorer: 'Hello, Explorer!',
      personal_details:'Enter your personal details and start your journey with us.',
      welcome_back: 'Welcome Back!',
      to_keep_connected: 'To keep connected with us, please log in with your personal info.',
      sign_in: 'SIGN IN',
      sign_up: 'SIGN UP',
      user: 'User',
      empower_with_intelligent: 'Empower with Intelligent Innovation. Tomorrow Unleashed: Intelligent Innovation Awaits.',
      learn_more: 'Learn More',
      user_growth: 'User Growth',
      task_done: 'Task Done',
      add_my_crypto: 'ADD MY CRYPTO',
      assets: 'Assets',
      price: 'Price',
      total_balance: 'Total Balance',
      '24h_market': '24h Market',
      from: 'From',
      to: 'To',
      swap_cap: 'SWAP',
      select: 'Select a Cryptocurrency',
      please_select: 'Please select a cryptocurrency to view its chart',
      calculate: 'Calculate your crypto taxes',
      enter_your_earnings: 'Enter your earnings',
      Calculator: 'Caclulator !',
      connect: 'Connect',
    },
  },
  fr: {
    translation: {
      profil: 'Profil',
      overview: 'Aperçu',
      wallet: 'Portefeuille',
      swap: 'Échange',
      cryptos: 'Cryptos',
      calculator: 'Calculatrice',
      term_and_condition: '© 2024 Pulsar. Tous droits réservés. Conditions générales et politique de confidentialité',
      create_account: 'Créer un compte',
      username: 'Nom d\'utilisateur',
      your_username: 'Votre nom d\'utilisateur',
      email: 'E-mail',
      'example@domain.com': 'exemple@domaine.com',
      password: 'Mot de passe',
      your_password: 'Votre mot de passe',
      forgotten_password: 'Mot de passe oublié ?',
      enter_your_password: 'Entrez votre mot de passe',
      hello_explorer: 'Bonjour, Explorateur ! ',
      personal_details:'Saisissez vos informations personnelles et commencez votre aventure avec nous.',
      welcome_back: 'Bienvenue ! ',
      to_keep_connected:'Pour rester connecté, veuillez vous connecter avec vos informations personnelles.',
      sign_in: 'CONNEXION',
      sign_up: 'INSCRIPTION',
      user: 'Utilisateur',
      empower_with_intelligent: 'Innovation intelligente : un avenir meilleur',
      learn_more: 'En savoir plus',
      user_growth: 'Croissance des utilisateurs',
      task_done: 'Tâche accomplie',
      add_my_crypto: 'AJOUTER MA CRYPTO',
      assets: 'Actifs',
      price: 'Prix',
      total_balance: 'Solde total',
      '24h_market': 'Marché 24 h',
      from: 'De',
      to: 'À',
      swap_cap: 'ÉCHANGER',
      select: 'Sélectionnez une cryptomonnaie',
      please_select: 'Veuillez sélectionner une cryptomonnaie pour afficher son graphique',
      calculate: 'Calculez vos taxes sur les cryptomonnaies',
      enter_your_earnings: 'Saisissez vos gains',
      Calculator: 'Cacluler !',
      connect: 'Se connecter'
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
