const channel = new BroadcastChannel('meditrack-sync');

export function broadcastChange(type, payload) {
  channel.postMessage({ type, payload, timestamp: Date.now() });
}

export function subscribeToChanges(callback) {
  channel.addEventListener('message', (event) => {
    callback(event.data);
  });
} 