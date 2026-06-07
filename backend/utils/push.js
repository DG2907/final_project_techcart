import webpush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY || 'BFEHTjNOVW5i33mu_4cAgavVI5pP8ri-ZhP9jB52M56vQ3bdk-tcVGANurWxE8VMHcg4FbkRZgMjg0YByuorsmA';
const privateVapidKey = process.env.PRIVATE_VAPID_KEY || 'Y_Y_9Lz1zeNmrcOE87ahiav-5b2NTG9UWHGu0pF-70E';

// In a real application, you'd want to store subscriptions in the database.
// For this simple student project, we'll store them in memory.
const subscriptions = new Map();

try {
  webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
} catch (e) {
  console.log('Webpush init error, probably invalid keys during test env');
}

export const saveSubscription = (userId, subscription) => {
  subscriptions.set(userId, subscription);
};

export const sendPushNotification = async (userId, payload) => {
  const subscription = subscriptions.get(userId);
  if (subscription) {
    try {
      await webpush.sendNotification(subscription, payload);
    } catch (error) {
      console.error('Error sending push notification:', error);
      if (error.statusCode === 410) {
        subscriptions.delete(userId);
      }
    }
  }
};
