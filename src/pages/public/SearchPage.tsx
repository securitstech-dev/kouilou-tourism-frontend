import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import {
  establishmentService,
  Establishment,
  SearchFilters,
} from '../../services/establishmentService';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [rating, setRating] = useState(Number(searchParams.get('rating')) || 0);

  useEffect(() => {
    const fetchEstablishments = async () => {
      setLoading(true);
      try {
        const filters: SearchFilters = {
          query: searchTerm,
          category: category !== 'ALL' && category !== '' ? category : undefined,
          // Simplify price logic for now or parse range string
        };
        const data = await establishmentService.getAll(filters);
        setResults(data);
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setLoading(false);
      }
    };
    // Debounce search could be added here
    const timeoutId = setTimeout(() => fetchEstablishments(), 500);
    return () => clearTimeout(timeoutId);
  }, [category, priceRange, rating, searchParams, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Filters Sidebar */}
          <div className="w-full flex-shrink-0 md:w-64">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Catégorie</label>
                  <div className="space-y-2">
                    {['Hôtel', 'Restaurant', 'Site Touristique', 'Loisirs'].map((cat) => (
                      <div key={cat} className="flex items-center">
                        <input
                          id={`category-${cat}`}
                          name="category"
                          type="checkbox"
                          checked={category === cat}
                          onChange={() => setCategory(category === cat ? '' : cat)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-gray-600">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Prix (XAF)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      onChange={(e) => setPriceRange(e.target.value)} // Simplified
                      className="block w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Note minimum
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value={0}>Toutes les notes</option>
                    <option value={4}>4 étoiles & plus</option>
                    <option value={3}>3 étoiles & plus</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Rechercher par nom, lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center">Chargement...</div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center text-gray-500">Aucun résultat trouvé.</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((establishment) => (
                  <div
                    key={establishment.id}
                    className="overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={establishment.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={establishment.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="truncate text-lg font-medium text-gray-900">
                            {establishment.name}
                          </h3>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                            {establishment.location}
                          </p>
                        </div>
                        <div className="flex items-center rounded bg-gray-50 px-2 py-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-gray-900">
                            {establishment.rating || '-'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-medium text-indigo-600">
                          {establishment.price
                            ? `${establishment.price.toLocaleString()} FCFA`
                            : 'Sur devis'}
                        </span>
                        <Link
                          to={`/establishments/${establishment.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Voir détails &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
