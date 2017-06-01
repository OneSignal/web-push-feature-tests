async function run() {
  await navigator.serviceWorker.register('./service-worker-a.js');
  const workerRegistration = await navigator.serviceWorker.ready;
  console.log('A: Successfully registered service worker:', workerRegistration);
  const pushSubscription = await workerRegistration.pushManager.subscribe({
    userVisibleOnly: true
  });
  console.log('A: Successfully subscribed for push:', pushSubscription);
}

run();