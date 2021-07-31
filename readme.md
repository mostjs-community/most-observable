# most-observable

Convert `@most/core` streams to/from [ES observables](https://github.com/tc39/proposal-observable).

## Install

`yarn add most-observable`
<br />
`npm i -s most-observable`

## Example

Creating state stream from redux store as it is an Observable but any [ES observable](https://github.com/tc39/proposal-observable) should work.

```javascript
import { fromObservable } from "most-observable";
import { runEffects, tap } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";

const store = createStore(reducer); // Redux store

const state$ = fromObservable(store);

runEffects(tap(console.log, state$), newDefaultScheduler());
```

## API

- fromObservable

```javascript
const stream = fromObservable(observable);
```

- toObservable

```javascript
const observable = toObservable(stream);
```
