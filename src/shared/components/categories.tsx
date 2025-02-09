"use client";

import React, { useEffect } from "react";
import Container from "./container";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filters";

interface Props{
  className?: string
}
function Categories({className}: Props) {
  const categories = [
    { id: 1, title: "All", image: "/images/all.png" },
    { id: 2, title: "Hotels", image: "/images/hotels.png" },
    { id: 3, title: "Restaurants", image: "/images/restaurants.png" },
    { id: 4, title: "Activities", image: "/images/activities.png" },
    { id: 5, title: "Cruises", image: "/images/cruises.png" },
    { id: 6, title: "Flights", image: "/images/flights.png" },
    { id: 7, title: "Camping", image: "/images/camping.png" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const {category:selectedCategory, setCategroies} = useFilterStore();

  const handleParams = (id: number) => {
    setCategroies(id);
    const params = new URLSearchParams(window.location.search);

    if(id != 1){
      params.set("category", id.toString()); 
    }else{
      params.delete(`category`);
    }

    router.push(`?${params.toString()}`);

    
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCategroies(Number(category));
    }
  }, []);

  return (
    <Container>
      <ul className={cn("flex gap-6 list-none", className)}>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleParams(category.id)}
            className={`cursor-pointer font-bold text-[#6e6e6e] hover:text-purple-700 ${
              selectedCategory == category.id ? "text-purple-700" : ""
            }`}
          >
            <span>{category.title}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Categories;
