// src/components/Home.jsx
import { useEffect, useState } from "react";
import { registerTreatment, getStatus, getTreatmentCount } from "../services/api";
import Guidelines from "./Guidelines";
import { setupNotifications, notifyPartner } from "../services/notifications"; // NUEVO
import Swal from "sweetalert2";

export default function Home() {

    const [count, setCount] = useState(0);
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const partnerId = localStorage.getItem("partnerId");
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [status, setStatus] = useState({
        me: false,
        partner: false
    });
    // NUEVO: estado para notificaciones
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    async function loadStatus() {

        const data = await getStatus(userId);
        setStatus(data);
        console.log(data)

        const total = await getTreatmentCount(userId);
        setCount(total);

    }

    // NUEVO: verificar permiso al cargar
    useEffect(() => {
        setNotificationsEnabled(Notification.permission === "granted");
    }, []);

    // MODIFICADO: ahora notifica al compañero
    async function handleTreatment() {

         Swal.fire({
            title: '¡Tratamiento aplicado!',
            text: 'No le des más veces hostia.',
            icon: 'success',
          });

        await registerTreatment(userId);

        console.log(partnerId)
        if (partnerId) {
            await notifyPartner(
                partnerId,
                `¡${userName} se aplicó el tratamiento! 💪`
            );
        }

        loadStatus();

    }

    // NUEVO: activar notificaciones
    const handleEnableNotifications = async () => {
        // Desactivar primero si ya estaban activadas
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let reg of registrations) {
                await reg.unregister();
            }
        }

        const success = await setupNotifications(userId);
        setNotificationsEnabled(success);
    };

    useEffect(() => {

        loadStatus();

        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                loadStatus();
            }
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="flex fixed bg-gray-50  gap-6 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center font-bold shadow-[#000000] shadow-[0px_0px_30px_8px] backdrop-blur-sm overflow-y-scroll text-gray-800 justify-around h-10/12 rounded">

            {showGuidelines ? (

                <Guidelines onBack={() => setShowGuidelines(false)} />

            ) : (

                <>
                    <h2 className="text-xl pt-6" >Estado de hoy</h2>

                    {Object.entries(status).map(([name, done]) => (
                        <div key={name}>
                            <strong>{name}</strong>: {done ? "✔" : "❌"}
                        </div>
                    ))}

                    <button className="border transition-all duration-300 bg-green-500/60  hover:bg-green-500/80 ative:bg-green-200/70 hover:cursor-pointer font-bold rounded-lg p-4" onClick={handleTreatment}>
                        He aplicado tratamiento
                    </button>

                    {/* NUEVO: botón para activar notificaciones (solo si no están activadas) */}
                    {!notificationsEnabled && (
                        <button
                            className="border transition-all duration-300 bg-blue-400/80 hover:brightness-125 active:brightness-125 hover:cursor-pointer font-bold rounded-lg p-4 text-sm"
                            onClick={handleEnableNotifications}
                        >
                            🔔 Activar notificaciones
                        </button>
                    )}

                    <h3>Veces aplicado tratamiento</h3>
                    <p>{count}</p>

                    <button className="border transition-all duration-300 bg-blue-500/80 hover:brightness-125 active:brightness-125 mb-6 hover:cursor-pointer font-bold rounded-lg p-4" onClick={() => setShowGuidelines(true)}>
                        Ver instrucciones
                    </button>
                </>

            )}

        </div>
    );
}