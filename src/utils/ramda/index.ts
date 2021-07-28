import { curry } from 'ramda';

export const andCatch = curry((f, p) => p.catch(f));
export const andFinally = curry((f, p) => p.finally(f));
