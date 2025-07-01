# 🔔 Type-Safe EventEmitter (TypeScript)

A lightweight, fully type-safe `EventEmitter` implementation in TypeScript.

Supports typed events with specific payloads, with `on`, `off`, `once`, and `emit` methods.

---

## ✨ Features

- 🔒 **Type-safe**: event names and payloads are strictly typed
- 🧼 **Minimal**: one file, no dependencies
- 🚀 **Simple API**: `on`, `off`, `once`, and `emit`
- 🧠 **Fire-and-forget**: listener return values are ignored

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

## 🔧 Implementation

```ts
type Listener<EventMap, K extends keyof EventMap> = (data: EventMap[K]) => void;

export class EventEmitter<EventMap extends Record<string, any>> {
  private events: {
    [K in keyof EventMap]?: Array<Listener<EventMap, K>>;
  } = {};

  on<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }

  once<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>) {
    const onceWrapper: Listener<EventMap, K> = (data) => {
      this.off(event, onceWrapper);
      listener(data);
    };
    this.on(event, onceWrapper);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }
  }
}
```

---

## 📄 License

MIT
