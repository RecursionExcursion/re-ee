declare class EventEmitter {
    private events;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    emit(event: string, data?: any): void;
}
declare const emitter: EventEmitter;
export { emitter };
