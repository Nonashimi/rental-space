"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParams = useCallback(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);

   const setParams = useCallback((newParams: Record<string, any>) => {
    const current = new URLSearchParams(window.location.search);
    console.log("Setting params:", newParams);
    Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
            current.delete(key);
        } else {
            current.set(key, Array.isArray(value) ? value.join(",") : value.toString());
        }
    });

    router.push(`?${current.toString()}`, { scroll: false });
}, [router]);


    return { getParams, setParams };
}
