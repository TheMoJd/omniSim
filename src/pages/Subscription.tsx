export default function Subscription() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Abonnements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg text-center">
            <h4 className="text-lg font-bold mb-2">Basique</h4>
            <p className="text-gray-600 mb-4">Accès limité aux simulations.</p>
            <p className="text-2xl font-bold mb-4">10€ / mois</p>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Choisir
            </button>
          </div>
          <div className="border p-6 rounded-lg text-center">
            <h4 className="text-lg font-bold mb-2">Pro</h4>
            <p className="text-gray-600 mb-4">Accès complet et illimité.</p>
            <p className="text-2xl font-bold mb-4">100€ / mois</p>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Choisir
            </button>
          </div>
        </div>
      </div>
    );
  }
  