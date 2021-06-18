import { get, off, on, set } from 'local-storage';
import { useCallback, useEffect, useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (arg0: T) => void] {
  const [value, setValue] = useState<T>(get(key) ?? initialValue);
  const setPersistentValue = useCallback(
    (nextValue: T | ((arg0: T) => T)) => {
      let newValue = nextValue;
      if (typeof nextValue === 'function') {
        newValue = (nextValue as (arg0: T) => T)(get(key));
      }
      if (set(key, newValue)) {
        setValue(newValue);
      }
    },
    [key]
  );

  // On off keep other tabs in sync
  useEffect(() => {
    on(key, setValue);
    return () => off(key, setValue);
  }, [key, setValue]);

  return [value, setPersistentValue];
}

export default useLocalStorage;
