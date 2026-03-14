import { useEffect, useState } from "react";
import SetupUser from "./pages/SetupUser";
import ConnectPartner from "./pages/ConnectPartner";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {

  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [userPartnerCode, setUserPartnerCode] = useState(null);

  useEffect(() => {

    const userId = localStorage.getItem("userId");
    const connectedStored = localStorage.getItem("connected");
    const userPartnerCodeStored = localStorage.getItem("partner");
    console.log(userPartnerCode);
    if (userId && (userId !== undefined || userId !== null || userId !== 0)) {
      setUser({ id: userId });
    }

    if (connectedStored === "true") {
      setConnected(true);
    }

    if (userPartnerCodeStored !== undefined) {
      setUserPartnerCode(userPartnerCodeStored);
    }

  }, []);

  if (!user && !creatingUser) {
    return <Login onLogin={setUser} goToSetup={() => setCreatingUser(true)} />;
  }

  if (creatingUser) {
    return <SetupUser onUserCreated={setUser} finishSetup={() => setCreatingUser(false)}
    />;
  }
  console.log(connected, !user)
  if (!connected && !user) {
    return <ConnectPartner user={user} onConnected={() => setConnected(true)} />;
  }

  return <Home />;
}