# Type-Safe EventEmitter

A minimal, strongly typed `EventEmitter` class built in TypeScript.  
Define custom event types and get full type safety for event names and payloads.

## ✨ Features

- Fully type-safe: event names and payloads are strictly typed
- Lightweight: one file, no dependencies
- Simple API: `on`, `off`, and `emit`
- Fire-and-forget semantics (return values are ignored)

## 📦 Usage

```ts
// Define your event map
type MyEvents = {
  greet: string;
  login: { userId: number };
  ready: void;
};

// Create an instance
const emitter = new EventEmitter<MyEvents>();

// Add listeners
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}`);
});

emitter.on('login', ({ userId }) => {
  console.log(`User logged in: ${userId}`);
});

emitter.on('ready', () => {
  console.log('System is ready.');
});

// Emit events
emitter.emit('greet', 'Alice');
emitter.emit('login', { userId: 42 });
emitter.emit('ready', undefined); // or just `emitter.emit('ready', undefined)`
```

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

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }
  }
}
```

## 📝 License

MIT
