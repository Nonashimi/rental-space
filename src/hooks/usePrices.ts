import { useFilterStore } from "@/store/filters";


export const maxVal = 100000;
export const minVal = 5000;

export const usePrices = () => {
    const {prices, setPrices} = useFilterStore();
    
    const changeMinValuePercentage = (percent: number) => {
        const newMinValue = Math.round(minVal + ((maxVal - minVal)* (percent/100)))
        setPrices({ min: newMinValue, max: prices.max });
    }
    const changeMaxValuePercentage = (percent: number) => {
        const newMaxValue = Math.round(maxVal - ( (maxVal - minVal ) * (100 - percent )/100));
        setPrices({ min: prices.min, max: newMaxValue });
    }

    return {
        prices,
        changeMinValuePercentage,
        changeMaxValuePercentage
    }

}