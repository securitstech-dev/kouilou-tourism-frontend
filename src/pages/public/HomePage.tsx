import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { establishmentService, Establishment } from '../../services/establishmentService';

export default function HomePage() {
  const [featuredEstablishments, setFeaturedEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // For now, we just get all and take the first 3.
        // In a real app, we might have a specific endpoint or filter for 'featured'.
        const data = await establishmentService.getAll();
        setFeaturedEstablishments(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured establishments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Kouilou Beach"
          />
          <div className="absolute inset-0 bg-indigo-900 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Découvrez la magie du Kouilou
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Des plages dorées de la Côte Sauvage aux mystérieuses Gorges de Diosso. Réservez les
            meilleurs hôtels, restaurants et expériences uniques.
          </p>
          <div className="mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center lg:justify-start">
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Link
                to="/search"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
              >
                Explorer
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section (Floating) */}
      <div className="relative mx-auto -mt-10 mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="block w-full rounded-md border-gray-300 py-2 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Où voulez-vous aller ?"
                />
              </div>
            </div>
            <div>
              <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="check-in"
                  id="check-in"
                  className="block w-full rounded-md border-gray-300 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">Coups de cœur</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredEstablishments.map((establishment) => (
            <div key={establishment.id} className="group relative">
              <div className="h-48 overflow-hidden">
                <img
                  src={establishment.images?.[0] || 'https://via.placeholder.com/300'}
                  alt={establishment.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/establishments/${establishment.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {establishment.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {establishment.category} • {establishment.location}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <p className="ml-1 text-sm font-medium text-gray-900">{establishment.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
