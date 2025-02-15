export default function Profile() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Utilisateur</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Informations personnelles</h3>
          <p className="text-gray-600">Nom : John Doe</p>
          <p className="text-gray-600">Email : john.doe@example.com</p>
        </div>
      </div>
    );
  }
  