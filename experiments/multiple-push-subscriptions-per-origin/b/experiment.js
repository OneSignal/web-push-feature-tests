async function run() {
  await navigator.serviceWorker.register('./service-worker-b.js');
  const workerRegistration = await navigator.serviceWorker.ready;
  console.log('B: Successfully registered service worker:', workerRegistration);
  const pushSubscription = await workerRegistration.pushManager.subscribe({
    userVisibleOnly: true
  });
  console.log('B: Successfully subscribed for push:', pushSubscription);
}

run();