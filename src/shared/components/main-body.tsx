"use client"
import React from 'react'
import CardList from './card-list'
import SwitchToMap from '../ui/switch-to-map'
import ApartmentMap from './apartment-map'
import Container from './container'
import FavModals from './fav-modals'
import { useToaster } from '@/hooks/useToaster'
import { useViewType } from '@/store/view-type'
import { useCardListStore } from '@/store/cards'

type Props = {}


function MainBody({}: Props) {
    const {isItList} = useViewType();
    const {cardList} = useCardListStore();
    useToaster();
  return (
    <div className='flex flex-col flex-1 bg-red'>
        <SwitchToMap/>
        <FavModals/>
        {
            isItList
            ?<Container><CardList/></Container>
            :<ApartmentMap cardList={cardList}/>
        }
    </div>
  )
}

export default MainBody