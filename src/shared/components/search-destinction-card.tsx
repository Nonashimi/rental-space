import React from 'react'

type Props = {
    title: string
    description: string
}

function SearchDestinctionCard({title, description}: Props) {
  return (
    <div className="flex gap-3 items-center p-2 rounded-xl hover:bg-[#ebebeb] cursor-pointer">
            <div className="">
                <img className='w-[56px] h-[56px]' src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png" alt="" />
            </div>
            <div className="flex flex-col gap-[2px]">
                <div className="font-semibold text-[14px]">{title}</div>
                <div className="text-[#727272] text-[14px]">{description}</div>
            </div>
    </div>
  )
}

export default SearchDestinctionCard