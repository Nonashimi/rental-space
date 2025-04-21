"use client"
import React from 'react'
import CardList from './card-list'
import SwitchToMap from '../ui/switch-to-map'
import ApartmentMap from './apartment-map'
import Container from './container'
import FavModals from './fav-modals'
import { useToaster } from '@/hooks/useToaster'

type Props = {}


function MainBody({}: Props) {
    const [isItMap, setIsItMap] = React.useState(false);
    const handleMap = () => {
        setIsItMap(!isItMap);
    }
    useToaster();
  return (
    <div className='flex-1'>
        <SwitchToMap isItMap={isItMap} handleSwitch={handleMap}/>
        <FavModals/>
        {
            !isItMap
            ?<Container><CardList/></Container>
            :<ApartmentMap/>
        }
    </div>
  )
}

export default MainBody