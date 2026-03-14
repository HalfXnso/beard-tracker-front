export default function Guidelines({ onBack }) {

    return (
      <div className="w-full p-4 bg-gray-50 ">

    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Normas del tratamiento
    </h2>

    {/* APLICACIÓN */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
        <h3 className="text-center font-semibold text-blue-700 mb-2">
            🧴 APLICACIÓN
        </h3>

        <ul className="space-y-1 text-gray-700">
            <li>• Cara limpia y seca</li>
            <li>• 1 ml (10 pulverizaciones / marca del aplicador)</li>
            <li>• Lávate las manos inmediatamente</li>
            <li>• Espera 1h sin tocar/sudar/mojar</li>
        </ul>
    </div>

    {/* HORARIOS */}
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-3">
        <h3 className="text-center font-semibold text-purple-700 mb-2">
            ⏰ HORARIOS
        </h3>

        <ul className="space-y-1 text-gray-700">
            <li>• Aplica siempre a la misma hora (ej. noche)</li>
            <li>
                • Regla de oro: Si das dos dosis seguidas muy cerca, luego deja pasar
                al menos 24 horas hasta la siguiente.
            </li>
        </ul>
    </div>

    {/* RECUERDA */}
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
        <h3 className="text-center font-semibold text-yellow-700 mb-2">
            ⚠️ RECUERDA
        </h3>

        <ul className="space-y-1 text-gray-700">
            <li>• Caída inicial es normal (dread shed)</li>
            <li>• Resultados visibles: 3-6 meses</li>
            <li className="font-semibold text-gray-900">
                • La constancia es TODO
            </li>
        </ul>
    </div>

    {/* NO HACER */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
        <h3 className="text-center font-semibold text-red-700 mb-2">
            🚫 NO HACER
        </h3>

        <ul className="space-y-1 text-gray-700">
            <li>• Usar en heridas</li>
            <li>• Dosis dobles para compensar</li>
            <li>• Saltarse días</li>
        </ul>
    </div>

    <div className="flex justify-center">
        <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
            onClick={onBack}
        >
            Volver
        </button>
    </div>

</div>
    );
}