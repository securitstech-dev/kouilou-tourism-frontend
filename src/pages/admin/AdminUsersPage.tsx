import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { User } from '../../store/authStore';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <span className="truncate">{user.email}</span>
                  </p>
                </div>
                <div className="ml-2 flex flex-shrink-0">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'OPERATOR'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
