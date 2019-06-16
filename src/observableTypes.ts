// types ported from "https://github.com/bigslycat/es-observable"

export interface ObservableCompatible<T> {
  [Symbol.observable](): ObservableLike<T>;
}

export interface ObserverLike<T> {
  next: (value: T) => void;
  error: (errorValue: Error) => void;
  complete: () => void;
}

export interface ObservableLike<T> extends ObservableCompatible<T> {
  subscribe: (observer: Partial<ObserverLike<T>>) => SubscriptionLike;
}

export interface SubscriptionLike {
  unsubscribe(): void;
}
