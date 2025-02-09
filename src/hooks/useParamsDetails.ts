"use client"

import { useFilterStore } from "@/store/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { maxVal, minVal } from "./usePrices";
import { Variant } from "@/shared/components/filter-btns";
import { useEffect } from "react";



export const useParamsDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { 
        isDemanded, category, rooms, amenities, possibility, prices, typeOfFilter, 
        setCategroies, setTypeOfFilter, setPrices, setArrayRoom, setArrayAmenities, setIsDemanded, setArrayPossibility
    } = useFilterStore();
    const filter = useFilterStore();

    const paramsObj: Record<string, string> = {};

    if (category != 1) paramsObj["category"] = category.toString();
    if (isDemanded) paramsObj["DemandedByQuests"] = isDemanded.toString();
    if (amenities.length != 0) paramsObj["amenities"] = amenities.join(",");
    if (possibility.length != 0) paramsObj["possibility"] = possibility.join(",");
    if (prices.min > minVal || prices.max < maxVal) paramsObj["prices"] = `${prices.min}-${prices.max}`;
    if (typeOfFilter != Variant.all) paramsObj["typeOfFilter"] = typeOfFilter.toString();
    for(const room of rooms) {
        if(room.count > 0) paramsObj[room.title] = room.count.toString();
    }
    const params = new URLSearchParams(paramsObj);


    const handleParams= () => {
        router.push(`?${params.toString()}`);
    }

    useEffect(() => {
        if (!searchParams) return;

        const categoryParam = searchParams.get("category");
        const isDemandedParam = searchParams.get("DemandedByQuests");
        let amenitiesParam = searchParams.get("amenities");
        let possibilityParam = searchParams.get("possibility");
        const pricesParam = searchParams.get("prices");
        const typeOfFilterParam = searchParams.get("typeOfFilter");
        
        let amenitiesArray:number[] = [];
        let possibilityArray:number[] = [];

        if (categoryParam) setCategroies(Number(categoryParam));
        if (isDemandedParam) setIsDemanded(isDemandedParam ==="true");
        if(amenitiesParam){amenitiesArray = amenitiesParam.split(",").map(Number);}
        if(possibilityParam){possibilityArray = possibilityParam.split(",").map(Number);}
        setArrayAmenities(amenitiesArray);
        setArrayPossibility(possibilityArray);
        if (pricesParam) {
            const [min, max] = pricesParam.split("-").map(Number);
            setPrices({ min, max });
        }
        if(typeOfFilterParam) setTypeOfFilter(typeOfFilterParam as Variant);

        const updatedRooms = rooms.map(room => {
            const roomCount = searchParams.get(room.title);
            return roomCount ? { ...room, count: Number(roomCount) } : room;
        });

        setArrayRoom(updatedRooms);
        console.log(possibilityArray);
    }, [searchParams]);



    return {
        handleParams
    }
}