"use client";
import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isManualOverride = useRef(false); 

  const negativeScroll = () => {
    isManualOverride.current = true;
    setIsScrolled(false);

    setTimeout(() => {
      isManualOverride.current = false;
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isManualOverride.current) return; 
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isScrolled,
    negativeScroll,
  };
};
