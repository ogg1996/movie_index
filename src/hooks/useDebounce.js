import { useEffect, useState } from "react";

export function useDebounce(value) {
  const [debounceInput, setDebounceInput] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceInput(value);
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  return debounceInput;
}
