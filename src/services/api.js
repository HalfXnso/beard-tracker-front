import { API_BASE_URL } from "./config";


export async function createUser(name) {

  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  return res.json();
}

export async function connectPartner(userId, partnerCode) {
  console.log(userId,partnerCode)
  // ${API_BASE_URL}/users/connect?userId=4&partnerCode=f80a93
  const res = await fetch(`${API_BASE_URL}/users/connect?userId=${userId}&partnerCode=${partnerCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
  });
  console.log(res.body);

  return res.json();
}

export async function registerTreatment(userId) {

  const res = await fetch(`${API_BASE_URL}/treatments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId })
  });

  return res.json();
}

export async function getStatus(userId) {

  const res = await fetch(`${API_BASE_URL}/treatments/status?userId=${userId}`);

  return res.json();
}

export async function getTreatmentCount(userId) {

  const res = await fetch(`${API_BASE_URL}/treatments/count?userId=${userId}`);

  return res.json();

}
export async function login(name, partnerCode) {

  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, partnerCode })
  });

  return res.json();
}