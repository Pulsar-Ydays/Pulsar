// Fonction pour décoder le token JWT
export const decodeJWT = (token: string) => {
  const base64Url = token.split(".")[1]; // Le deuxième segment du token
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Remplacer les caractères spéciaux
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
const testJWT = () => {
  const token = localStorage.getItem("token"); // Récupérer le token sauvegardé
  if (token) {
    try {
      const decoded = decodeJWT(token);
      console.log("Token décodé :", decoded); // Inspecter le contenu décodé
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
    }
  } else {
    console.log("Pas de token trouvé dans le localStorage.");
  }
};
