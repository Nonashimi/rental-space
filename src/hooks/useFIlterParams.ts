import { useQueryParams } from "./useQueryParams";
import { useEffect } from "react";
import { useFilterStore } from "@/store/filters";

export const useFilterParams = () => {
    const { getParams, setParams } = useQueryParams();
    const {
        isDemanded, category, rooms, amenities, possibility, prices, typeOfFilter,
        setCategroies, setTypeOfFilter, setPrices, setArrayRoom, setArrayAmenities, setIsDemanded, setArrayPossibility
    } = useFilterStore();

    const updateParamsFromStore = () => {
        const params: Record<string, any> = {};

        if (category !== 1) params["category"] = category;
        if (isDemanded) params["DemandedByQuests"] = isDemanded;
        if (amenities.length) params["amenities"] = amenities;
        if (possibility.length) params["possibility"] = possibility;
        if (prices.min || prices.max) params["prices"] = `${prices.min}-${prices.max}`;
        if (typeOfFilter) params["typeOfFilter"] = typeOfFilter;
        
        rooms.forEach(room => {
            if (room.count > 0) params[room.title] = room.count;
        });

        setParams(params);
    };

    const initFromParams = () => {
        const params = getParams();

        if (params.category) setCategroies(Number(params.category));
        if (params.DemandedByQuests) setIsDemanded(params.DemandedByQuests === "true");
        if (params.amenities) setArrayAmenities(params.amenities.split(",").map(Number));
        if (params.possibility) setArrayPossibility(params.possibility.split(",").map(Number));
        if (params.prices) {
            const [min, max] = params.prices.split("-").map(Number);
            setPrices({ min, max });
        }
        if (params.typeOfFilter) setTypeOfFilter(params.typeOfFilter as any);

        const updatedRooms = rooms.map(room => {
            return params[room.title] ? { ...room, count: Number(params[room.title]) } : room;
        });

        setArrayRoom(updatedRooms);
    };

    useEffect(() => {
        initFromParams();
    }, []);

    return { updateParamsFromStore }
}
