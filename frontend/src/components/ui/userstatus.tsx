
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
const UserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { t } = useTranslation();
import { useState, useEffect } from "react";

const UserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    console.log("Valeur récupérée de localStorage dans UserStatus:", user);
    console.log(
      "Valeur actuelle de localStorage dans Wallet:",
      localStorage.getItem("user")
    );

    if (user) {
      try {
        setIsLoggedIn(true);
        setUserName(user); // Assure-toi que `name` existe bien dans ton objet
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
        localStorage.removeItem("user"); // Supprime les données corrompues
      }
    }
  }, []);
  return (
    <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
      <span className="font-mono text-xl">
        {isLoggedIn ? userName : "Se connecter"}
      </span>
    </div>
  );
};

export default UserStatus;
