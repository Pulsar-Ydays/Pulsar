import { Sidebar } from "@/components/sidebar";

export default function DataPolicy() {
    return (
        <div className="flex w-full h-screen bg-gradient-to-b from-[#111827] via-gray-900 to-purple-900">
            {/* Sidebar */}
            <Sidebar />
            <div className="container mx-auto px-4 py-8 max-w-4xl h-full flex flex-col">
                <h1 className="text-3xl font-bold text-white mb-6 border-b pb-4">
                    Politique de Confidentialité de Pulsar
                </h1>
                <div className="prose lg:prose-xl text-white prose-headings:mt-10 prose-p:mt-6 prose-ul:mt-6 prose-li:mt-3 space-y-6 overflow-y-auto pr-4">
                    <p><strong>Dernière mise à jour :</strong> 13 mars 2024</p>

                    <h2>1. Introduction</h2>
                    <p>Bienvenue sur Pulsar notre Application. La protection de vos données personnelles est notre priorité absolue. Cette politique de confidentialité détaille de manière transparente nos pratiques concernant la collecte, l'utilisation, la protection et la divulgation de vos informations personnelles lorsque vous utilisez notre application.</p>
                    <p>En utilisant Pulsar, vous acceptez les pratiques décrites dans la présente politique de confidentialité. Si vous n'acceptez pas cette politique, veuillez ne pas utiliser notre application.</p>

                    <h2>2. Collecte des Données</h2>

                    <h3>2.1 Données que vous nous fournissez directement</h3>
                    <ul>
                        <li><strong>Nom d'utilisateur</strong> : Utilisé pour vous identifier de manière unique sur la plateforme</li>
                        <li><strong>Adresse e-mail</strong> : Nécessaire pour la gestion de votre compte et les communications importantes</li>
                        <li><strong>Mot de passe</strong> : Stocké de manière sécurisée sous forme hashée avec des algorithmes de cryptographie avancés (bcrypt)</li>
                    </ul>

                    <h3>2.2 Données collectées automatiquement</h3>
                    <ul>
                        <li><strong>Informations de session</strong> : Pour maintenir votre connexion sécurisée</li>
                        <li><strong>Jetons d'authentification (JWT)</strong> : Pour assurer la sécurité de vos interactions avec l'application</li>
                        <li><strong>Horodatages</strong> : Date et heure de création de compte, dernière connexion et modifications</li>
                        <li><strong>Données techniques</strong> : Type de navigateur, système d'exploitation et autres informations techniques nécessaires au bon fonctionnement de l'application</li>
                    </ul>

                    <h2>3. Utilisation des Données</h2>
                    <ul>
                        <li>La gestion et la sécurisation de votre compte utilisateur</li>
                        <li>L'authentification sécurisée lors de vos connexions</li>
                        <li>L'amélioration continue de nos services et de votre expérience utilisateur</li>
                        <li>L'envoi de communications importantes concernant votre compte ou l'application</li>
                        <li>La prévention et la détection des activités frauduleuses</li>
                        <li>Le respect de nos obligations légales</li>
                    </ul>

                    <h2>4. Stockage et Sécurité</h2>

                    <h3>4.1 Mesures de Sécurité</h3>
                    <ul>
                        <li>Hashage sécurisé des mots de passe utilisant l'algorithme bcrypt avec un niveau de sécurité élevé</li>
                        <li>Authentification par jetons JWT avec expiration automatique</li>
                        <li>Validation stricte des données entrantes pour prévenir les injections malveillantes</li>
                        <li>Protocoles de communication sécurisés (HTTPS/SSL) pour toutes les transmissions de données</li>
                        <li>Surveillance continue de notre infrastructure pour détecter toute activité suspecte</li>
                        <li>Mises à jour régulières de nos systèmes de sécurité</li>
                    </ul>

                    <h3>4.2 Durée de Conservation</h3>
                    <ul>
                        <li>Pendant toute la durée d'activité de votre compte</li>
                        <li>Jusqu'à 30 jours après la suppression de votre compte (pour des raisons techniques et légales)</li>
                        <li>Les données anonymisées peuvent être conservées plus longtemps à des fins statistiques</li>
                    </ul>

                    <h2>5. Vos Droits</h2>
                    <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
                    <ul>
                        <li><strong>Droit d'accès</strong> : Obtenir une copie de vos données personnelles</li>
                        <li><strong>Droit de rectification</strong> : Modifier ou mettre à jour vos informations</li>
                        <li><strong>Droit à l'effacement</strong> : Demander la suppression de vos données</li>
                        <li><strong>Droit à la portabilité</strong> : Recevoir vos données dans un format structuré</li>
                        <li><strong>Droit d'opposition</strong> : Vous opposer au traitement de vos données</li>
                        <li><strong>Droit de limitation</strong> : Restreindre le traitement de vos données</li>
                        <li><strong>Droit de retrait du consentement</strong> : Retirer votre consentement à tout moment</li>
                    </ul>
                    <p>Pour exercer ces droits, contactez-nous via <a href="mailto:privacy@pulsar-app.com">privacy@pulsar-app.com</a></p>

                    <h2>6. Stockage Local et Cookies</h2>

                    <h3>6.1 Stockage Local</h3>
                    <ul>
                        <li>Maintenir votre session active de manière sécurisée</li>
                        <li>Stocker temporairement votre jeton d'authentification</li>
                        <li>Améliorer les performances de l'application</li>
                        <li>Sauvegarder vos préférences utilisateur</li>
                    </ul>

                    <h3>6.2 Cookies Essentiels</h3>
                    <p>Nous utilisons uniquement des cookies essentiels au fonctionnement de l'application. Aucun cookie publicitaire ou de traçage n'est utilisé.</p>

                    <h2>7. Modifications de la Politique</h2>
                    <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur l'application. En cas de modifications substantielles, nous vous en informerons par e-mail et/ou par une notification visible dans l'application.</p>

                    <h2>8. Contact</h2>
                    <p>Pour toute question concernant cette politique de confidentialité ou vos données personnelles :</p>
                    <ul>
                        <li><strong>E-mail</strong> : <a href="mailto:privacy@pulsar-app.com">privacy@pulsar-app.com</a></li>
                        <li><strong>Adresse postale</strong> : [Votre adresse postale]</li>
                        <li><strong>DPO (Délégué à la Protection des Données)</strong> : <a href="mailto:dpo@pulsar-app.com">dpo@pulsar-app.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}