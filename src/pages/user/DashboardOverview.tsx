import { useAuthStore } from '../../store/authStore';

export default function DashboardOverview() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
          <p>Bienvenue, {user?.firstName} !</p>
          <p className="text-gray-500 mt-2">
            Ceci est votre tableau de bord {user?.role === 'OPERATOR' ? 'Opérateur' : 'Utilisateur'}.
          </p>
        </div>
      </div>
    </div>
  );
}
