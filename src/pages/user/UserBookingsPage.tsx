import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

import { bookingService, Booking } from '../../services/bookingService';

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger vos réservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="py-10 text-center">Chargement des réservations...</div>;
  if (error) return <div className="py-10 text-center text-red-600">{error}</div>;

  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.checkOut) >= now && b.status !== 'CANCELLED'
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.checkOut) < now || b.status === 'CANCELLED'
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mes Réservations</h1>

      {/* Upcoming */}
      <section>
        <h2 className="mb-4 text-lg font-medium text-gray-900">À venir</h2>
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500">Aucune réservation à venir.</p>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {upcomingBookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="mr-4 h-16 w-16 rounded object-cover"
                          src={
                            booking.establishment?.images?.[0] || 'https://via.placeholder.com/100'
                          }
                          alt=""
                        />
                        <div>
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {booking.establishment?.name || 'Établissement inconnu'}
                          </p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                            {booking.establishment?.location || 'Lieu inconnu'}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex flex-shrink-0">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                          Du {new Date(booking.checkIn).toLocaleDateString()} au{' '}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {/* 
                         <Link to={`/dashboard/bookings/${booking.id}`} className="text-indigo-600 hover:text-indigo-900">
                           Voir détails &rarr;
                         </Link>
                         */}
                        <span className="font-semibold">
                          {booking.totalPrice.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Past */}
      <section>
        <h2 className="mb-4 text-lg font-medium text-gray-900">Passées / Annulées</h2>
        {pastBookings.length === 0 ? (
          <p className="text-gray-500">Aucune réservation passée.</p>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {pastBookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-4 opacity-75 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="mr-4 h-16 w-16 rounded object-cover"
                          src={
                            booking.establishment?.images?.[0] || 'https://via.placeholder.com/100'
                          }
                          alt=""
                        />
                        <div>
                          <p className="truncate text-sm font-medium text-gray-900">
                            {booking.establishment?.name || 'Établissement inconnu'}
                          </p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                            {booking.establishment?.location || 'Lieu inconnu'}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex flex-shrink-0">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            booking.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
