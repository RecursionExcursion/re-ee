export class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((l) => l !== listener);
        }
    }
    once(event, listener) {
        const onceWrapper = (data) => {
            this.off(event, onceWrapper);
            listener(data);
        };
        this.on(event, onceWrapper);
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(data));
        }
    }
}
