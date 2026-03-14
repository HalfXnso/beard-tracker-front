import { useState } from "react";
import { connectPartner } from "../services/api";

export default function ConnectPartner({ user, onConnected }) {

    const [code, setCode] = useState("");

    const handleConnect = async () => {
        console.log(code);
        await connectPartner(user.id, code);
        
        localStorage.setItem("connected", "true");
        localStorage.setItem("partner", user.partnerCode)
        onConnected();

    };

    return (
        <div className="flex fixed bg-black/50 w-11/12 top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white backdrop-blur-sm  shadow-[#ffffff95] shadow-[0px_1px_10px_1px] rounded">

            <div className="text-2xl my-4">
                <h1>¡Bienvenido <span className=" font-bold">{user.name}</span>!</h1>
            </div>
            <div className="flex gap-2"> <h2>Tu código es: </h2>

                <p className="font-bold"> {user.partnerCode}</p>
            </div>

            <h3 className="font-bold my-2">Por favor, introduce código de tu amigo</h3>

            <input className="border p-2 rounded-lg"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button className="border text-black border-black my-4 transition-all duration-300 custom-background  hover:brightness-125 active:brightness-125 hover:cursor-pointer font-bold rounded-lg px-6 py-4" onClick={handleConnect}>
                Conectar
            </button>

        </div>
    );

}