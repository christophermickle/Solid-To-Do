import { createEffect, createSignal } from "solid-js";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = createSignal(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (err) {
      console.log(err)
      return initialValue;
    }
  })

  createEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value()))
  }, [key, value()])

  return [value(), setValue]
}
export default useLocalStorage