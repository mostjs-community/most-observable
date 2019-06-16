import { currentTime } from "@most/scheduler";
import { Scheduler, Sink, Stream, Time } from "@most/types";
import observableSymbol from "symbol-observable";
import { ObservableCompatible, ObservableLike } from "./observableTypes";

const fromObservable = <T>(observable: ObservableCompatible<T>): Stream<T> =>
  new ObservableStream(observable);

const tryEvent = <T>(t: Time, x: T, sink: Sink<T>) => {
  try {
    sink.event(t, x);
  } catch (e) {
    sink.error(t, e);
  }
};

const getObservable = <T>(o?: ObservableCompatible<T>) => {
  if (o) {
    const method = (o as any)[observableSymbol] as
      | (() => ObservableLike<T>)
      | undefined;

    if (typeof method === "function") {
      const obs = method.call(o);
      if (!(obs && typeof obs.subscribe === "function")) {
        throw new TypeError("invalid observable " + obs);
      }
      return obs;
    }
  }
};

class ObservableStream<T> implements Stream<T> {
  constructor(protected readonly observable: ObservableCompatible<T>) {}

  run(sink: Sink<T>, scheduler: Scheduler) {
    const send = (e: T) => tryEvent(currentTime(scheduler), e, sink);

    const subscription = getObservable(this.observable)!.subscribe({
      next: send,
      error: e => sink.error(currentTime(scheduler), e),
      complete: () => sink.end(currentTime(scheduler))
    });

    const dispose = () => subscription.unsubscribe();

    return { dispose };
  }
}

export default fromObservable;
