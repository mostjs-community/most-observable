# most-observable

Create `@most/core` streams ES observables.

## Install

`yarn add most-observable`
<br />
`npm i -s most-observable`

## Example

Creating state stream from redux store as it an Observable but any ES observable should work.

```javascript
import fromObservable from "most-observable";
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
