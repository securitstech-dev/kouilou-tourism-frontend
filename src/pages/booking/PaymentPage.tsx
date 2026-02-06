import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { CreditCard, Smartphone } from 'lucide-react';

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amount] = useState(50000); // Mock amount
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (method: 'MOBILE_MONEY' | 'CARD') => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await paymentService.processPayment(id, amount, method);
      if (result.status === 'SUCCESS') {
        alert(`Paiement réussi ! Transaction ID: ${result.transactionId}`);
        navigate('/dashboard/my-bookings');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Une erreur est survenue lors du paiement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Paiement de la réservation
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Montant à payer :{' '}
          <span className="font-bold text-indigo-600">{amount.toLocaleString()} FCFA</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 border-l-4 border-red-400 bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => handlePayment('MOBILE_MONEY')}
              disabled={loading}
              className={`flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-4 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <Smartphone className="mr-3 h-6 w-6" />
              Payer par Mobile Money
            </button>

            <button
              onClick={() => handlePayment('CARD')}
              disabled={loading}
              className={`flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <CreditCard className="mr-3 h-6 w-6" />
              Payer par Carte Bancaire
            </button>
          </div>

          {loading && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Traitement en cours...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
