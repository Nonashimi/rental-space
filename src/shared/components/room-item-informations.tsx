import { CardItem, groupedAmenitiesArray } from "@/store/cards"
import { Star } from "lucide-react"
import { FC, useMemo, useState } from "react"
import Calendars from "./Calendars"
import Button, { VariantsOfButton } from "../ui/button"
import { Dates, TypeOfDate } from "@/store/search-datas"
import Modal, { TypeOfModal } from "./modal"


type Props = {
  roomItem: CardItem
  dates: Dates,
  setDates: (dates: Dates) => void,
}

export const RoomItemInformations:FC<Props> = ({roomItem, dates, setDates}) => {
  const comments = 0;
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);
    const [isOpen, setIsOpen] = useState(false);
    const fullCount = useMemo(() => {
        const msPerDay = 1000 * 60 * 60 * 24;
        if(!dates.checkIn || !dates.checkOut) return 0;
        const utc1 = Date.UTC(dates.checkIn!.getFullYear(), dates.checkIn!.getMonth(), dates.checkIn!.getDate());
        const utc2 = Date.UTC(dates.checkOut!.getFullYear(), dates.checkOut!.getMonth(), dates.checkOut!.getDate());

        const diffInMs = Math.abs(utc2 - utc1);
        return Math.floor(diffInMs / msPerDay);

    },[ dates.checkIn, dates.checkOut]);
  
  return <div className="">
            {
               isOpen && <Modal title='' type={TypeOfModal.withoutTitle} clickClose={() => setIsOpen(false)}>
                    <div className="p-5 overflow-y-auto min-h-[60vh] max-h-[80vh]">
                        <div className="text-[25px] font-semibold pb-3">What this place offers</div>
                        {groupedAmenitiesArray.map(amenity => ({...amenity, items:amenity.items.filter(item => roomItem.amenities.some(id => id === item.amenity_id))})).map(amenity => 
                            amenity.items.length > 0 && <div key={amenity.id} className="py-5">
                                <div className="font-semibold text-[18px] pb-3">{amenity.title}</div>
                                {amenity.items.map(item => 
                                    <div key={item.amenity_id} className="flex gap-4 py-5 border-b border-[var(--line-color)]">
                                        <item.icon/>
                                        <div className="">{item.title}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Modal>
            }
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
            <div className="">
                <div className="w-full h-[1px] bg-[var(--line-color)] my-6"></div>
                <div className="flex gap-7 items-center">
                    <img className='w-[40px] h-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="" />
                    <div className="flex flex-col">
                        <div className="text-[16px] font-semibold">Hosted bt Olzhas</div>
                        <div className="text-[14px] text-gray-500">4 moths hosting</div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-[var(--line-color)] my-6"></div>
            </div>
            <div id="Amenities" className="scroll-mt-[130px]">
                <div className="text-[25px] font-semibold pb-3">What this place offers</div>
                <div className="grid grid-cols-2 gap-5 py-4">
                    {         
                        roomItem.amenities.slice(0, 4).map(amenity => {
                            console.log(amenity);
                            const value = groupedAmenitiesArray
                            .flatMap(gr => gr.items)
                            .find(item => item.amenity_id === amenity);
                            if(!value) return null;
                            const Icon = value.icon;
                            return  <div key={value.amenity_id} className="flex gap-4 py-2">
                                <Icon/>
                                <div className="">{value.title}</div>
                            </div>
                        }
                        )
                    }
                </div>
                {
                    roomItem.amenities.length > 4 && <Button onClick={() => setIsOpen(true)} className="py-3 px-6">Show all {roomItem.amenities.length} amenities</Button>
                }
            </div>
            <div className="w-full h-[1px] bg-[var(--line-color)] my-10"></div>
            <div className="">
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