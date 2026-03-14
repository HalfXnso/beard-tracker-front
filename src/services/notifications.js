// src/services/notifications.js
import { API_BASE_URL } from "./config";
import { messaging, getToken } from './firebase';

export const setupNotifications = async (userId) => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return false;

        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        });

        if (token) {
            const response = await fetch(`${API_BASE_URL}/notifications/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, token })
            });
            return response.ok;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const notifyPartner = async (toUserId, message) => {
    try {
        await fetch(`${API_BASE_URL}/notifications/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toUserId, message })
        });
    } catch (error) {
        console.error('Error:', error);
    }
};