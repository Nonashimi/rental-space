"use client";
import { useTypeStore } from "@/store/search-type";
import { useViewType } from "@/store/view-type";
import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const type = useTypeStore();
  const isManualOverride = useRef(false); 
  const { isItList } = useViewType();
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
      if(isItList)
        setIsScrolled(window.scrollY > 0);
      else
        setIsScrolled(true);
      type.setFocus(false);

      const activeElement = document.activeElement as HTMLElement | null;
      if(activeElement?.tagName === "INPUT") {
        activeElement.blur();
      }
    
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isItList]);

  useEffect(() => {
    if(!isItList){
      setIsScrolled(true);
    }else{
      setIsScrolled(window.scrollY > 0);
    }
  }, [isItList, type.isFocus]);

  return {
    isScrolled,
    negativeScroll,
    positiveScroll
  };
};
