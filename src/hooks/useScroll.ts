"use client";
import { useTypeStore } from "@/store/search-type";
import { useViewType } from "@/store/view-type";
import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const type = useTypeStore();
  const { isItList } = useViewType();
  const isManualOverride = useRef(false);

  const updateScrollState = () => {
    const shouldBeScrolled = isItList ? window.scrollY > 0 : true;
    if(!type.isFocus)
      setIsScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
    else
      negativeScroll();
  };

  const handleScroll = () => {
    if (isManualOverride.current) return;

    updateScrollState();
    
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement?.tagName === "INPUT") {
      activeElement.blur();
    }

    type.setFocus(false);
  };

  const negativeScroll = () => {
    isManualOverride.current = true;
    setIsScrolled(false);
    console.log("negative scroll");
    setTimeout(() => {
      isManualOverride.current = false;
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isItList]);

  useEffect(() => {
    updateScrollState();
    console.log("is it ");
  }, [isItList, type.isFocus]);

  return {
    isScrolled,
    negativeScroll,
    handleScroll
  };
};
