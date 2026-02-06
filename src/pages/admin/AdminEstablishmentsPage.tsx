import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Establishment } from '../../services/establishmentService';
import { Check, X } from 'lucide-react';

export default function AdminEstablishmentsPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const data = await adminService.getPendingEstablishments();
        setEstablishments(data);
      } catch (error) {
        console.error('Failed to fetch establishments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleValidate = async (id: string) => {
    try {
      await adminService.validateEstablishment(id);
      setEstablishments((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to validate', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminService.rejectEstablishment(id);
      setEstablishments((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to reject', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Validation des Établissements</h1>

      {establishments.length === 0 ? (
        <p className="text-gray-500">Aucun établissement en attente de validation.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {establishments.map((establishment) => (
            <div key={establishment.id} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={establishment.images?.[0] || 'https://via.placeholder.com/300'}
                  alt={establishment.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {establishment.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {establishment.category} • {establishment.city}
                </p>
                <p className="mt-2 text-sm text-gray-700">{establishment.description}</p>
                <div className="mt-4 flex justify-between space-x-3">
                  <button
                    onClick={() => handleValidate(establishment.id)}
                    className="inline-flex flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <Check className="mr-2 h-4 w-4" /> Valider
                  </button>
                  <button
                    onClick={() => handleReject(establishment.id)}
                    className="inline-flex flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    <X className="mr-2 h-4 w-4" /> Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
