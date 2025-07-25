import React, { useEffect, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import GuestChevron from './guest-chevron'
import { guestData, useSearchDatasStore } from '@/store/search-datas'
import Modal from './modal'

type Props = {
    guestData: guestData,
    setGuestData: (guestData: guestData) => void,
}

function GuestHandler({guestData, setGuestData}: Props) {
    const [count, setCount] = useState(0);
    const adults = usePagination({maxPages: 16, currentPage: guestData.adults});
    const children = usePagination({maxPages: 16, currentPage: guestData.children});
    const infants = usePagination({maxPages: 5, currentPage: guestData.infants});
    const pets = usePagination({maxPages: 5, currentPage: guestData.pets});
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
            description: 'Under 2',
        },
        {
            id: 4,
            title: 'Pets',
            description: 'Bringing a service animal?',
            href: ''
        }
    ];

    const [isPetModalOpen, setIsPetModalOpen] = useState(false);

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
        setGuestData({
            adults: adults.thisPage,
            children: children.thisPage,
            infants: infants.thisPage,
            pets: pets.thisPage
        });
    },[adults.thisPage, children.thisPage, infants.thisPage, pets.thisPage]);
  return (
    <div>
        {
            isPetModalOpen && <Modal title='' clickClose={() => setIsPetModalOpen(false)}>
                <div className="p-5 pb-10">
                    <img className='' src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg" alt="" />
                    <div className="text-[20px] font-semibold py-3">Service animals</div>
                    <p className=''>Service animals aren’t pets, so there’s no need to add them here.</p>
                </div>
            </Modal>
        }
        
        <div className="flex flex-col gap-4">
            <GuestChevron title={params[0].title} maxPeople={16-count} isHaveChildren = {children.thisPage > 0} changeValue={changeCounter} description={params[0].description??''} pagination={adults}/>
            <hr/>
            <GuestChevron title={params[1].title} maxPeople={16-count} checkToAdults = {checkToAdults} changeValue={changeCounter} description={params[1].description??''} pagination={children}/>
            <hr/>
            <GuestChevron title={params[2].title} description={params[2].description??''} pagination={infants}/>
            <hr/>
            <GuestChevron title={params[3].title} description={params[3].description??''} clickToModal={() => setIsPetModalOpen(true)} pagination={pets}/>
        </div>
    </div>
  )
}

export default GuestHandler