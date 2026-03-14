import { useState } from "react";
import { createUser } from "../services/api";

export default function SetupUser({ onUserCreated, finishSetup }) {



  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }

    const user = await createUser(name);

    localStorage.setItem("userId", user.id);

    onUserCreated(user);
    finishSetup();
  };

  return (

    <div className="flex fixed bg-black/50 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center  backdrop-blur-sm  shadow-[#ffffff95] shadow-[0px_1px_10px_1px] rounded">
      <h1 className="text-4xl my-6 md:text-5xl custom-text-gradient underline">Beard Tracker</h1>
      <button className="border transition-all duration-300 bg-white/70 hover:bg-white  hover:cursor-pointer font-bold rounded-lg px-2" onClick={() => window.reload()}>
        Volver
      </button>
      <div className="flex flex-col my-6 items-center text-white gap-2">
        <label htmlFor="nombreUsuario" className="font-bold">Introduce tu nombre</label>
        <input className="border rounded-lg p-2"
          id="nombreUsuario"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="border transition-all mb-4 duration-300 custom-background  hover:brightness-125 active:brightness-125 hover:cursor-pointer font-bold rounded-lg p-4" onClick={handleCreate}>
        Crear usuario
      </button>

    </div>
  );

}