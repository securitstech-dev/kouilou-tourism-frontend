export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Kouilou Tourism Hub</h3>
            <p className="text-sm text-gray-600">
              La plateforme de référence pour découvrir les trésors du département de Kouilou.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Explorer</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Destinations</li>
              <li>Hôtels</li>
              <li>Restaurants</li>
              <li>Activités</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Conditions d'utilisation</li>
              <li>Politique de confidentialité</li>
              <li>Mentions légales</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Pointe-Noire, Congo</li>
              <li>contact@kouilou-tourism.cg</li>
              <li>+242 00 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Kouilou Tourism Hub. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};
