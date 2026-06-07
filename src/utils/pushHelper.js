import axios from 'axios';

const PUBLIC_VAPID_KEY = 'BFEHTjNOVW5i33mu_4cAgavVI5pP8ri-ZhP9jB52M56vQ3bdk-tcVGANurWxE8VMHcg4FbkRZgMjg0YByuorsmA';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPushNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:5000/api/push/subscribe', subscription, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return true;
      }
    } catch (error) {
      console.error('Error subscribing to push notifications', error);
      return false;
    }
  }
  return false;
}
