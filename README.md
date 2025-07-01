# 🔔 EventEmitter (TypeScript) (v1.0.1)

A lightweight, fully type-safe `EventEmitter` implementation in TypeScript.

Supports typed events with specific payloads, with `on`, `off`, `once`, and `emit` methods.

---

## ✨ Features

- 🔒 **Type-safe**: event names and payloads are strictly typed
- 🧼 **Minimal**: one file, no dependencies
- 🚀 **Simple API**: `on`, `off`, `once`, and `emit`
- 🧠 **Fire-and-forget**: listener return values are ignored

---



## 🛠 API

### `on(event, listener)`
Adds a listener for the given event.

### `once(event, listener)`
Adds a listener that will be removed after the first call.

### `off(event, listener)`
Removes a previously registered listener.

### `emit(event, data)`
Fires all listeners for the given event, passing the data.

---

## 📦 Example Usage

```ts
// Define your event map
type MyEvents = {
  greet: string;
  login: { userId: number };
  ready: void;
};

const emitter = new EventEmitter<MyEvents>();

// Listen for an event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}`);
});

// Listen only once
emitter.once('login', ({ userId }) => {
  console.log(`User logged in: ${userId}`);
});

// Emit events
emitter.emit('greet', 'Alice'); // Hello, Alice
emitter.emit('login', { userId: 42 }); // User logged in: 42
emitter.emit('login', { userId: 99 }); // (ignored)
```

---

## 📄 License

MIT
