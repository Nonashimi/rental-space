import { Minus, Plus } from 'lucide-react'
import React from 'react'
import ChevronCLick, { ChevronType } from '../ui/chevron-click'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import GuestChevron from './guest-chevron'

type Props = {}

function GuestHandler({}: Props) {
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
            description: 'Bringing a service animal?'
        }
    ]
  return (
    <div>
        <div className="flex flex-col gap-4">
            {
                params.map((param, index) =>(
                    <div key={param.id}>
                        <GuestChevron title={param.title} description={param.description}/>
                        {index < params.length - 1 && <hr />}
                    </div>
                ))
            }   
        </div>
    </div>
  )
}

export default GuestHandler