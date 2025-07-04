type Listener<EventMap, K extends keyof EventMap> = (data: EventMap[K]) => void;
export declare class EventEmitter<EventMap extends Record<string, any>> {
    private events;
    on<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>): void;
    off<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>): void;
    once<K extends keyof EventMap>(event: K, listener: Listener<EventMap, K>): void;
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K] extends void ? [] : [EventMap[K]]): void;
}
export {};
