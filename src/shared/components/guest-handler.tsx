import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChevronCLick, { ChevronType } from '../ui/chevron-click'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import GuestChevron from './guest-chevron'
import { useSearchDatasStore } from '@/store/search-datas'

type Props = {}

function GuestHandler({}: Props) {
    const [count, setCount] = useState(0);
    const {guestData, setGuestData} = useSearchDatasStore();
    const adults = usePagination({maxPages: 16, newPage: 0});
    const children = usePagination({maxPages: 16, newPage: 0});
    const infants = usePagination({maxPages: 5, newPage: 0});
    const pets = usePagination({maxPages: 5, newPage: 0});
    const params = [
        {
            id: 1,
            title: 'Adults',
            description: 'Ages 13 or above',
        },
        {
            id: 2,
            title: 'Children',
            description: 'Ages 2 - 12',
        },
        {
            id: 3,
            title: 'Infants',
        },
        {
            id: 4,
            title: 'Pets',
            description: 'Bringing a service animal?',
        }
    ];

    const changeCounter = (val: number) => {
        setCount(prev => (
            prev + val
        ));
    }
    const checkToAdults = () => {
        if(adults.thisPage === 0){
            adults.clickNext();
        }
    }

    useEffect(() => {
        setGuestData('adults', adults.thisPage);
        setGuestData('children', children.thisPage);
        setGuestData('infants', infants.thisPage);
        setGuestData('pets', pets.thisPage);
    },[adults.thisPage, children.thisPage, infants.thisPage, pets.thisPage]);
  return (
    <div>
        <div className="flex flex-col gap-4">
            <GuestChevron title={params[0].title} maxPeople={16-count} isHaveChildren = {children.thisPage > 0} changeValue={changeCounter} description={params[0].description??''} pagination={adults}/>
            <GuestChevron title={params[1].title} maxPeople={16-count} checkToAdults = {checkToAdults} changeValue={changeCounter} description={params[1].description??''} pagination={children}/>
            <GuestChevron title={params[2].title} description={params[2].description??''} pagination={infants}/>
            <GuestChevron title={params[3].title} description={params[3].description??''} pagination={pets}/>
        </div>
    </div>
  )
}

export default GuestHandler