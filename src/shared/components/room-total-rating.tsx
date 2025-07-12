import { cn } from "@/lib/utils";
import { CardItem, reviews } from "@/store/cards";
import { Dot, Star } from "lucide-react"
import { FC } from "react";

type Props = {
  roomItem: CardItem,
  inModal?: boolean
}
export const RoomTotalRating:FC<Props> = ({roomItem, inModal}) => {
   function isTop5Percent() {
    const ratings = reviews.map(rate => {
    const sum = Object.values(rate.rating).reduce((acc, num) => acc + num, 0);
    const avg = sum / Object.keys(rate.rating).length;
    return avg;
    }).sort((a, b) => b - a);
    const top5Index = Math.floor(ratings.length * 0.05);

    const threshold = ratings[top5Index];

    console.log(threshold);
    return roomItem.total_rating >= threshold;
  }

  return <>
  {
    isTop5Percent() ? 
    <div className="flex flex-col items-center gap-3 pb-8">
        <div className="flex items-end">
            <img className={cn({'h-[132px]': !inModal, 'h-[110px]': inModal})} src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png" alt="" />
            <div className={cn("font-bold text-[90px] pb-5", {'text-[70px]': inModal})}>
                {parseFloat(roomItem.total_rating + '').toFixed(1)}
            </div>
            <img className={cn('scale-x-[-1]',{'h-[132px]': !inModal, 'h-[110px]': inModal})} src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png" alt="" />
        </div>
        <div className="font-semibold text-[20px]">Guest Favorite</div>
        <div className={cn(` text-center text-[var(--text-gray-color)]`, {
          'w-[500px] text-[18px]': !inModal,
          'w-full text-[15px]': inModal
        })}>
            This home is in the <span className="text-[var(--text-color)]">top 5%</span> of eligible listings based on ratings, reviews, and reliability
        </div>
    </div>
    :
    <div className="flex text-[25px] gap-2 items-center pb-10">
        <Star className='fill-[var(--text-color)]'/>
        <div className="">{roomItem.total_rating}</div>
        {
          !inModal &&  <div className="flex items-center">
            <Dot/>
            <div className="">{roomItem.reviews.length} reviews</div>
        </div>
        }
       
    </div>
  }
  </>
}