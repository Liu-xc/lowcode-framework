import { useState, useCallback } from 'react';

export default function useForceUpdate(): [number, () => void] {
  const [dep, setDep] = useState(0);
  const forceUpdate = useCallback(() => { setDep(d => d + 1) }, []);
  return [dep, forceUpdate];
}