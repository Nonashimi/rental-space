import { CardItem, reviews } from "@/store/cards";
import { CircleCheck, Dot, House, KeyRound, MapPin, MessageSquare, Star, Tag } from "lucide-react";
import { FC } from "react";
import Button from "../ui/button";


type Props = {
  roomItem: CardItem,
};

export const RoomReviews:FC<Props> = ({roomItem}) => {
  const room_reviews = reviews.filter(review => roomItem.reviews.some(id => id === review.id));
  

  function isTop5Percent() {
    const ratings = reviews.map(rate => {
    const sum = Object.values(rate.rating).reduce((acc, num) => acc + num, 0);
    const avg = sum / Object.keys(rate.rating).length;
    return avg;
    }).sort((a, b) => b - a);
    const top5Index = Math.floor(ratings.length * 0.05);

    // Граница топ-5% (возможно, несколько с одинаковым рейтингом попадают в топ)
    const threshold = ratings[top5Index];

    console.log(threshold);
    return roomItem.total_rating >= threshold;
  }


  console.log(isTop5Percent());


    const all_rate = [0, 0, 0, 0, 0];

    const toCount = () => {
        const rating = room_reviews.map(room => room.rating);
        rating.forEach(rate => {
            const sum = Object.values(rate).reduce((acc, num) => acc + num, 0);
            const avg = sum / Object.keys(rate).length;
            all_rate[Math.round(5 - avg)]++;
        });
    };
    const criteria = [
    { label: "Cleanliness", value: roomItem.rating.Cleanliness, icon: <House width={35} height={35} /> },
    { label: "Accuracy", value: roomItem.rating.Accuracy, icon: <CircleCheck width={35} height={35} /> },
    { label: "Check-in", value: roomItem.rating.Check_in, icon: <KeyRound width={35} height={35} /> },
    { label: "Communication", value: roomItem.rating.Communication, icon: <MessageSquare width={35} height={35} /> },
    { label: "Location", value: roomItem.rating.Location, icon: <MapPin width={35} height={35} /> },
    { label: "Value", value: roomItem.rating.Value, icon: <Tag width={35} height={35} /> },
    ];

    toCount();
  return <>
          <div id='Reviews' className="scroll-mt-[110px]">
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png for 5 percent of owners */}
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png for between 4.9 and 5 */}
                <div className="">
                    <div className="flex text-[25px] gap-2 items-center pb-10">
                        <Star className='fill-[var(--text-color)]'/>
                        <div className="">{roomItem.total_rating}</div>
                        <div className="flex items-center">
                            <Dot/>
                            <div className="">{roomItem.reviews.length} reviews</div>
                        </div>
                    </div>
                    {
                        room_reviews.length >= 3 ? <><div className="grid grid-cols-7 divide-x divide-[var(--line-color)] gap-5">
                        {/* Overall Rating */}
                        <div className="flex flex-col gap-2">
                            <div className="">Overall rating</div>
                            <div>
                            {all_rate.map((rate, i) => {
                                const percent = rate > 0 ? (rate / room_reviews.length) * 100 : 0;
                                return (
                                <div key={i} className="flex gap-3 items-center text-[12px]">
                                    <div>{5 - i}</div>
                                    <div className="w-full h-[3px] bg-[var(--line-color)]">
                                    <div
                                        style={{ width: `${percent}%` }}
                                        className="h-[3px] bg-[var(--text-color)]"
                                    />
                                    </div>
                                </div>
                                );
                            })}
                            </div>
                        </div>

                        {/* Individual Criteria */}
                        {criteria.map((item, index) => (
                            <div key={index} className="flex flex-col justify-between px-5">
                            <div className="flex flex-col gap-1">
                                <div>{item.label}</div>
                                <div className="font-semibold text-[20px]">{item.value}</div>
                            </div>
                            {item.icon}
                            </div>
                        ))}
                    </div>
                    <div className="h-[1px] w-full bg-[var(--line-color)] my-10"></div></>

                     : 
                    <div className="text-[20px] text-[var(--text-gray-color)] pb-10">Average rating will appear after 3 reviews</div>

                    }
                    
                    <div className="grid grid-cols-2 gap-10">
                        {
                            room_reviews.slice(0, 6).map(comment => 
                                <div key={comment.id} className="flex flex-col gap-4">
                                    <div className="flex gap-5">
                                        <div className="">
                                            <img className='w-[50px] h-[50px] rounded-full' src={comment.user_avatar} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="">{comment.user_name}</div>
                                            <div className="">{comment.created_at}</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {comment.comment}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        room_reviews.length > 6 && <Button className='py-2 px-5 mt-8'>Show all {room_reviews.length} reviews</Button>
                    }
                </div>
                <div className="h-[1px] w-full bg-[var(--line-color)] my-10"></div>
                
            </div>
        </>
          
};