import { run } from "@most/core";
import { Disposable, Scheduler, Sink, Stream, Time } from "@most/types";
import observableSymbol from "symbol-observable";
import {
  ObservableLike,
  ObserverLike,
  SubscriptionLike
} from "./observableTypes";

const toObservable = <T>(
  stream: Stream<T>,
  scheduler: Scheduler
): ObservableLike<T> => {
  return new StreamObservable(stream, scheduler);
};

class StreamObservable<T> implements ObservableLike<T> {
  constructor(
    protected readonly stream: Stream<T>,
    protected readonly scheduler: Scheduler
  ) {}

  [Symbol.observable](): this;
  [observableSymbol]() {
    return this;
  }

  subscribe(observer: Partial<ObserverLike<T>>) {
    const disposable = run(
      new ObserverSink(observer),
      this.scheduler,
      this.stream
    );
    return new StreamSubscription(disposable);
  }
}

class StreamSubscription implements SubscriptionLike {
  constructor(protected readonly disposable: Disposable) {}

  unsubscribe() {
    this.disposable.dispose();
  }
}

const noop = () => {};

class ObserverSink<T> implements Sink<T> {
  constructor(protected readonly observer: Partial<ObserverLike<T>>) {}

  obsNext = this.observer.next ? this.observer.next.bind(this.observer) : noop;
  obsError = this.observer.error
    ? this.observer.error.bind(this.observer)
    : noop;
  obsComplete = this.observer.complete
    ? this.observer.complete.bind(this.observer)
    : noop;

  event(_time: Time, v: T) {
    this.obsNext(v);
  }

  error(_time: Time, e: Error) {
    this.obsError(e);
  }

  end(_time: Time) {
    this.obsComplete();
  }
}

export { toObservable };
