import { useState, useEffect, useRef, MutableRefObject } from 'react';

const useClickOutSide = (handler: () => void) => {
  const domNode = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const maybeHandler = (event: any) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });
  return domNode;
};
export default useClickOutSide;
