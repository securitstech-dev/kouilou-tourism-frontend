import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { bookingService, Booking } from '../../services/bookingService';

export default function OperatorBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getOperatorBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les réservations.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      await bookingService.updateStatus(id, status);
      // Optimistic update or refetch
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };

  if (loading) return <div className="py-10 text-center">Chargement...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Gestion des Réservations</h1>

      {bookings.length === 0 ? (
        <div className="py-10 text-center text-gray-500">Aucune réservation trouvée.</div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id} className="px-4 py-4 hover:bg-gray-50 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      #{booking.id} - {booking.user?.firstName} {booking.user?.lastName} (
                      {booking.user?.email})
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                      {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {booking.establishment?.name || 'Établissement inconnu'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-sm font-bold text-gray-900">
                      {booking.totalPrice.toLocaleString()} FCFA
                    </p>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  {booking.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Confirmer
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Refuser
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
