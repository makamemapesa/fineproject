self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'New Emergency Reported!';
  const options = {
    body: data.body || 'A new emergency has been reported.',
    icon: '/assets/emergency-icon.png',
    sound: '/assets/alarm.mp3' // Custom property, not standard
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );

  // Play alarm sound (works only if notification is interacted with)
  self.addEventListener('notificationclick', function(e) {
    e.notification.close();
    // Play sound using clients.openWindow or similar
    e.waitUntil(
      clients.openWindow('/play-alarm')
    );
  });
});
