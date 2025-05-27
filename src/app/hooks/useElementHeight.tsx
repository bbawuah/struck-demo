import { useEffect, useState, useRef } from "react";

export function useElementHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref?.current) {
      const elementHeight = ref.current.offsetHeight;
      const elementWidth = ref.current.offsetWidth;
      setHeight(elementHeight);
      setWidth(elementWidth);
    }
  }, []);

  return { height, width };
}
