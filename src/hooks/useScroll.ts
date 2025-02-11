"use client";
import { useTypeStore } from "@/store/search-type";
import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const type = useTypeStore();
  const isManualOverride = useRef(false); 

  const negativeScroll = () => {
    isManualOverride.current = true;
    setIsScrolled(false);

    setTimeout(() => {
      isManualOverride.current = false;
    }, 500);
  };

  const positiveScroll = () => {
    setIsScrolled(window.scrollY > 0);
  }

  useEffect(() => {
    const handleScroll = () => {

      if (isManualOverride.current) return; 

      setIsScrolled(window.scrollY > 0);
      type.setFocus(false);


      const activeElement = document.activeElement as HTMLElement | null;
      if(activeElement?.tagName === "INPUT") {
        activeElement.blur();
      }
    
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isScrolled,
    negativeScroll,
    positiveScroll
  };
};
