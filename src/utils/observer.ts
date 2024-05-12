type ObserverSubscriber<T> = (newValue: T, oldValue: T | null) => void;

interface ObserverProps<T> {
    initialValue?: T;
}

export class Observer<T> {
    private value: T | null;
    private subscribers: ObserverSubscriber<T>[];

    constructor({initialValue}: ObserverProps<T>) {
        this.value = initialValue ?? null;
        this.subscribers = [];
    }

    set current(newValue: T) {
        const oldValue = this.value;
        this.value = newValue;
        this.subscribers.forEach((subscriber) => subscriber(newValue, oldValue));
    }
    get current(): T | null {
        return this.value;
    }

    onUpdate(handler: ObserverSubscriber<T>) {
        if (typeof handler !== 'function') return;

        this.subscribers.push(handler);
    }
}
