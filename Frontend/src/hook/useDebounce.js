import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Pulisce il timeout se value cambia prima del delay
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
