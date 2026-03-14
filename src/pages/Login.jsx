// src/components/Login.jsx
import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin, goToSetup }) {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);

  const handleLogin = async () => {
    if (!name.trim() || !code.trim) {
      alert("No se pueden enviar credenciales vacías.");
      return;
    }

    
    const user = await login(name, code);

    // MODIFICADO: guardamos más datos del usuario
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);              // NUEVO
    localStorage.setItem("partnerId", user.partnerId);        // NUEVO
    localStorage.setItem("partnerCode", user.partnerCode);    // ya existía, lo renombramos
    localStorage.setItem("connected", "true");

    setCreatingUser(false);
    onLogin(user);

  };

  return (
    <div className="flex fixed bg-black/50 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center  backdrop-blur-sm  text-white shadow-[#ffffff95] shadow-[0px_1px_10px_1px] rounded">

      <h2 className="text-3xl my-4 font-bold">Iniciar sesión</h2>

      <input
        className="border p-1 my-2 rounded"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-1 my-2 rounded"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="border text-black border-black my-4 transition-all duration-300 custom-background  hover:brightness-125 active:brightness-125 hover:cursor-pointer font-bold rounded-lg px-8 py-2" onClick={handleLogin}>
        Entrar
      </button>

      <a
        className="my-2 text-blue-500 underline cursor-pointer"
        onClick={goToSetup}
      >
        Crear usuario
      </a>
    </div>
  );
}