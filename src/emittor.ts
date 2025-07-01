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
