/* eslint-disable no-console */
import { useEffect } from "react";

export function useLogger(things: Record<string, unknown>) {
  useEffect(() => {
    console.log(things);
  }, [things]);
}
