import { CardItem } from "@/store/cards"
import { useOrderDatas } from "@/store/order-datas"
import { Star } from "lucide-react"
import { FC, useMemo, useState } from "react"
import Calendars from "./Calendars"
import Button, { VariantsOfButton } from "../ui/button"
import { TypeOfDate } from "@/store/search-datas"


type Props = {
  roomItem: CardItem
}

export const RoomItemInformations:FC<Props> = ({roomItem}) => {
  const comments = 0;
  const {dates, setDates} = useOrderDatas();
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);
    
    const fullCount = useMemo(() => {
        const msPerDay = 1000 * 60 * 60 * 24;
        if(!dates.checkIn || !dates.checkOut) return 0;
        const utc1 = Date.UTC(dates.checkIn!.getFullYear(), dates.checkIn!.getMonth(), dates.checkIn!.getDate());
        const utc2 = Date.UTC(dates.checkOut!.getFullYear(), dates.checkOut!.getMonth(), dates.checkOut!.getDate());

        const diffInMs = Math.abs(utc2 - utc1);
        return Math.floor(diffInMs / msPerDay);

    },[ dates.checkIn, dates.checkOut]);
  
  return <div className="">
            <div className="flex flex-col gap-[2px]">
                <div className="text-2xl font-semibold">{roomItem.place}</div>
                <div className="">3 гостя,1 спальня,1кровать,1,5 ванной</div>
                <div className="flex gap-[5px] items-center">
                    <Star size={17} className='fill-black'/>
                    {
                        comments > 0 ? (
                            <div className="font-semibold underline">
                                {comments} отзыва 
                            </div>
                        ): 
                        (<div className="font-semibold">Пока нету отзывов</div>
                        )
                    }
                </div>
            </div>
            <div className="my-6">
                <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
                <div className="flex gap-7 items-center py-4">
                    <img className='w-[40px] h-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="" />
                    <div className="flex flex-col">
                        <div className="text-[16px] font-semibold">Hosted bt Olzhas</div>
                        <div className="text-[14px] text-gray-500">4 moths hosting</div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
            </div>

            <div className="pt-6">
                <div className="pb-3">
                    <div className="text-[25px] font-semibold">
                        {
                            dates.checkIn && dates.checkOut && `${fullCount} nights in ${roomItem.place}` ||
                            !dates.checkIn && 'Select check-in date' || 
                            !dates.checkOut && 'Select checkout date'
                        }
                    </div>
                    <div className="text-[var(--text-gray-color)]">Minimum stay: 2 nights</div>
                </div>
                <Calendars activeDate={activeDate} setActiveDate={setActiveDate} dates={dates} setDates={setDates}/>
                <div className="flex justify-end px-7">
                    <Button onClick={() => setDates({})} variant={VariantsOfButton.transparent}><span className="underline font-semibold">Clear dates</span></Button>
                </div>
            </div>
          </div>
}