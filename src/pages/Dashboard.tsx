export default function Dashboard() {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-2">Gérez vos simulations d'opinion publique.</p>
        <div className="mt-6 p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Aucune simulation en cours.</h3>
        </div>
      </div>
    );
  }
  