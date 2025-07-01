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

  emit<K extends keyof EventMap>(
    event: K,
    ...args: EventMap[K] extends void ? [] : [EventMap[K]]
  ) {
    if (this.events[event]) {
      this.events[event].forEach((listener) =>
        listener(...(args as [EventMap[K]]))
      );
    }
  }
}
