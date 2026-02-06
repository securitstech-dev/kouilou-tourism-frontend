import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, MapPin, Star } from 'lucide-react';
import { establishmentService, Establishment } from '../../services/establishmentService';

export default function OperatorEstablishmentsPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const fetchEstablishments = async () => {
    try {
      const data = await establishmentService.getMyEstablishments();
      setEstablishments(data);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger vos établissements.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) return;
    try {
      await establishmentService.delete(id);
      setEstablishments(establishments.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  if (loading) return <div className="py-10 text-center">Chargement...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes Établissements</h1>
        <Link
          to="/dashboard/establishments/new"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Ajouter
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        {establishments.length === 0 ? (
          <div className="py-10 text-center text-gray-500">Vous n'avez aucun établissement.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {establishments.map((place) => (
              <li key={place.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="mr-4 h-16 w-16 rounded object-cover"
                        src={place.images?.[0] || 'https://via.placeholder.com/100'}
                        alt=""
                      />
                      <div>
                        <Link
                          to={`/establishments/${place.id}`}
                          className="truncate text-sm font-medium text-indigo-600 hover:underline"
                        >
                          {place.name}
                        </Link>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {place.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          place.isVerified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {place.isVerified ? 'Vérifié' : 'En attente'}
                      </span>
                      <div className="flex text-sm text-gray-500">
                        <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
                        {place.rating || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="p-2 text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(place.id)}
                      className="p-2 text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
