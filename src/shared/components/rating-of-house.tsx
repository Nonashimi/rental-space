import { cn } from "@/lib/utils";
import { CardItem, reviews } from "@/store/cards";
import { CircleCheck, House, KeyRound, MapPin, MessageSquare, Tag } from "lucide-react";
import { FC } from "react";


type Props = {
  roomItem: CardItem,
  inModal?: boolean,
}

export const RatingOfHouse:FC<Props> = ({roomItem, inModal}) => {
  const criteria = [
    { label: "Cleanliness", value: roomItem.rating.Cleanliness, icon: <House width={inModal?25:35} height={inModal?25:35} /> },
    { label: "Accuracy", value: roomItem.rating.Accuracy, icon: <CircleCheck width={inModal?25:35} height={inModal?25:35} /> },
    { label: "Check-in", value: roomItem.rating.Check_in, icon: <KeyRound width={inModal?25:35} height={inModal?25:35} /> },
    { label: "Communication", value: roomItem.rating.Communication, icon: <MessageSquare width={inModal?25:35} height={inModal?25:35} /> },
    { label: "Location", value: roomItem.rating.Location, icon: <MapPin width={inModal?25:35} height={inModal?25:35} /> },
    { label: "Value", value: roomItem.rating.Value, icon: <Tag width={inModal?25:35} height={inModal?25:35} /> },
    ];

  const room_reviews = reviews.filter(review => roomItem.reviews.some(id => id === review.id));
  
    const all_rate = [0, 0, 0, 0, 0];

    const toCount = () => {
        const rating = room_reviews.map(room => room.rating);
        rating.forEach(rate => {
            const sum = Object.values(rate).reduce((acc, num) => acc + num, 0);
            const avg = sum / Object.keys(rate).length;
            all_rate[Math.round(5 - avg)]++;
        });
    };
   

    toCount();
  return <>
    {
        room_reviews.length >= 3 ? <><div className={cn("grid grid-cols-7 divide-x divide-[var(--line-color)] gap-5", {'grid grid-cols-1 divide-x-0':inModal})}>
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
            <div key={index} className={cn("flex flex-col justify-between px-5", {'flex-row-reverse justify-end px-0 items-center gap-4': inModal})}>
            <div className={cn("flex flex-col gap-1", {'flex-1 flex-row items-center justify-between': inModal})}>
                <div>{item.label}</div>
                <div className={cn("font-semibold text-[20px]", {'text-[15px]': inModal})}>{item.value}</div>
            </div>
            {item.icon}
            </div>
        ))}
    </div>
    <div className="h-[1px] w-full bg-[var(--line-color)] my-10"></div></>

      : 
    <div className="text-[20px] text-[var(--text-gray-color)] pb-10">Average rating will appear after 3 reviews</div>

    }
  </>
}