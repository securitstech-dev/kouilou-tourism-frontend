import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { establishmentService, Establishment } from '../../services/establishmentService';
import { bookingService } from '../../services/bookingService';
import { useAuthStore } from '../../store/authStore';

export default function EstablishmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'info' | 'reviews' | 'photos'>('info');
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const data = await establishmentService.getById(id);
        setEstablishment(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails de l'établissement.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    if (!id || !checkIn || !checkOut) {
      alert('Veuillez sélectionner les dates.');
      return;
    }

    setBookingLoading(true);
    try {
      await bookingService.create({
        establishmentId: id,
        checkIn,
        checkOut,
        guests,
      });
      alert('Réservation réussie !');
      navigate('/dashboard/my-bookings');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la réservation.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Chargement...</div>;
  if (error || !establishment)
    return (
      <div className="py-20 text-center text-red-600">{error || 'Établissement non trouvé'}</div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Header */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={establishment.images?.[0] || 'https://via.placeholder.com/800x400'}
          alt={establishment.name}
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-white">{establishment.name}</h1>
            <div className="mt-2 flex items-center text-white">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{establishment.location}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 fill-current text-yellow-400" />
                <span>{establishment.rating || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['info', 'reviews', 'photos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">À propos</h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {establishment.description}
                    </p>
                  </div>

                  {/* Note: Amenities are technically not in the interface yet, effectively we can mock or remove */}
                  {/* 
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Équipements</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {establishment.amenities?.map((item) => (
                        <div key={item} className="flex items-center text-gray-600">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  */}
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {establishment.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`View ${idx}`}
                      className="h-64 w-full rounded-lg object-cover shadow-md"
                    />
                  ))}
                  {(!establishment.images || establishment.images.length === 0) && (
                    <p className="text-gray-500">Aucune photo supplémentaire.</p>
                  )}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="rounded bg-gray-50 p-4 italic text-gray-500">
                  Les avis seront bientôt disponibles.
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="w-full lg:w-96">
            <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {establishment.price
                    ? `${establishment.price.toLocaleString()} FCFA`
                    : 'Sur devis'}
                </span>
                {establishment.price && <span className="text-gray-500">/ nuit</span>}
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Arrivée</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Départ</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Voyageurs</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={1}>1 Voyageur</option>
                    <option value={2}>2 Voyageurs</option>
                    <option value={3}>3+ Voyageurs</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className={`flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white transition duration-200 hover:bg-indigo-700 ${bookingLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {bookingLoading ? 'Traitement...' : 'Réserver maintenant'}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Aucun débit immédiat. Annulation gratuite jusqu'à 24h avant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
