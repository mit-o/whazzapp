import { useState, useEffect, useCallback } from "react";

const useDetectScreen = (width) => {
  const [isDetect, setIsDetect] = useState(false);

  const detectMobileScreen = useCallback(() => {
    const isActive = window.innerWidth < width;
    setIsDetect(isActive);
  }, [setIsDetect]);

  useEffect(() => {
    detectMobileScreen();
    window.addEventListener("resize", detectMobileScreen);
    return () => window.removeEventListener("resize", detectMobileScreen);
  }, [detectMobileScreen]);

  return isDetect;
};

export default useDetectScreen;
