'use client'
import { FC, useMemo, useState } from "react";
import Button, { VariantsOfButton } from "../ui/button"
import InputTitle from "../ui/input-title"
import { RoomPriceCalendarModal } from "./room-price-calendar-modal";
import { RoomPriceGuestModal } from "./room-price-guest-modal";
import { Dates, guestData } from "@/store/search-datas";



type Props = {
  price: number,
  dates: Dates,
  guestDatas: guestData,
  setDates: (dates: Dates) => void,
  setGuestData: (key: string, value: number) => void,
}
export const RoomItemPrice:FC<Props> = ({price, dates, guestDatas: guestData, setGuestData, setDates}) => {
  const [isOpen, setisOpen] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const formatDate = (date: Date | null | undefined) => {
    if(date){
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }
    return '';
  };

  const handleCalendarOpen = () => {
    setisOpen(true);
    setIsBarOpen(false);
  }

  const handleBarOpen = () => {
    setIsBarOpen(true);
    setisOpen(false);
  }
  const handleBarClose = () => {
    setIsBarOpen(false);
  }
  
  const handleCalendarClose = () => {
    setisOpen(false);
  }

  const questFormat = () => {
  const quests = guestData.adults + guestData.children;
  const questString = quests === 1 ? '1 guest' : quests > 0 ? `${quests} guests` : '';
  const infantString = guestData.infants === 1 ? '1 infant' : guestData.infants > 0 ? `${guestData.infants} infants` : '';
  const petString = guestData.pets === 1 ? '1 pet' : guestData.pets > 0 ? `${guestData.pets} pets` : '';

  return [questString, infantString, petString].filter(Boolean).join(', ');
};

  const fullCount = useMemo(() => {
    const msPerDay = 1000 * 60 * 60 * 24;
    if(!dates.checkIn || !dates.checkOut) return 0;
    const utc1 = Date.UTC(dates.checkIn!.getFullYear(), dates.checkIn!.getMonth(), dates.checkIn!.getDate());
    const utc2 = Date.UTC(dates.checkOut!.getFullYear(), dates.checkOut!.getMonth(), dates.checkOut!.getDate());

    const diffInMs = Math.abs(utc2 - utc1);
    return Math.floor(diffInMs / msPerDay);

  },[ dates.checkIn, dates.checkOut]);


  const handleCheckAvailability = () => {
    const el = document.getElementById("room-item-price");
    handleCalendarOpen();
    el?.scrollIntoView({ behavior: 'smooth' });
  }


  return  <div className="h-full">
            <div id="room-item-price" className="sticky top-[120px] scroll-mt-[100px]">
                <div className="bg-[var(--modal-bg-color)] w-full p-6 rounded-xl shadow-2xl border  border-[var(--line-color)]">
                  <p className="text-[20px] pb-5">
                    {dates.checkIn && dates.checkOut ? (
                      <span>
                        <strong className="underline">{fullCount * price} Tg</strong> for {fullCount} nights
                      </span>
                    ) : (
                      "Add dates for prices"
                    )}
                  </p>
                  <div className=" border border-[var(--line-color)] rounded-lg">
                    <div onClick={handleCalendarOpen} className="grid grid-cols-2 box-border">
                       <InputTitle  value={formatDate(dates.checkIn)} className="rounded-none px-2 col-span-1 border-r border-[var(--line-color)]" title="CHECK-IN" placeHolder="Add date"/>
                       <InputTitle  value={formatDate(dates.checkOut)} className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
                    </div>
                    <InputTitle value={questFormat()} onCLick={handleBarOpen} className="rounded-none px-2 col-span-2 border-t border-[var(--line-color)]" title="GUESTS" placeHolder="add quests"/>
                    
                  </div>
                  <RoomPriceCalendarModal dates={dates} setDates={setDates} handleClose={handleCalendarClose} formatDate={formatDate} isOpen={isOpen}/>
                  <RoomPriceGuestModal guestDatas={guestData} setGuestData={setGuestData} handleBarClose={handleBarClose} isBarOpen={isBarOpen}/>
                  {
                    dates && dates.checkIn && dates.checkOut ?
                        <Button className="w-full rounded-full py-3 mt-4" variant={VariantsOfButton.filling}>
                          Reserve
                        </Button>
                        :
                        <Button onClick={handleCheckAvailability} className="w-full rounded-full py-3 mt-4" variant={VariantsOfButton.filling}>
                          Check availability
                        </Button>
                  }
                </div>
            </div>
          </div>
}