// let store = {
//   username: '',
//   password: '',
// }

import { useEffect, useState } from "react";

let count = 0;

const subscribers: (() => void)[] = [];

export const useCustomStore = () => {
  const [state, setState] = useState<number>(count)

  useEffect(() => {
    subscribers.push(() => {
      setState(count);
    });
  }, []);

  // useEffect(() => {
  //   count = state;
  //   subscribers.forEach(subscriber => subscriber());
  // }, [state]);

  return {
    state,
    setState: (state: number) => {
      setState(state);
      count = state;
      subscribers.forEach(subscriber => subscriber());
    }
  }
}