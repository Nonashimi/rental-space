'use client';
import { FC, useState } from "react";
import Box from "./box";
import { useOrderDatas } from "@/store/order-datas";
import { Star } from "lucide-react";
import { useFormatDates } from "@/hooks/useFormatDates";
import { useGuestFormat } from "@/hooks/useGuestFormat";
import Button, { VariantsOfButton } from "../ui/button";
import { useComputionDay } from "@/hooks/useComputionPrice";
import { useCardListStore } from "@/store/cards";

import { OrderDetailsModal } from "./order-details-modal";

type Props = {
  roomId: number;
}

export const OrderDetails:FC<Props> = ({roomId}) => {
  const {value} = useOrderDatas();
  const tripDates = useFormatDates(value.dates);
  const {fullCount} = useComputionDay({dates: value.dates});
  const roomItem = useCardListStore().cardList.find(el => el.id === roomId);
  const [isOpen, setIsOpen] = useState(false);
  
 
  
  return <> 
  <OrderDetailsModal isOpen={isOpen} setIsOpen={setIsOpen}/>
  <Box className="p-5 text-[14px]">
    <div className="flex items-center gap-4">
      <img className="w-[110px] rounded-lg" src={roomItem?.rooms[0].images[0]} alt="" />
      <div className="">
        <p className="text-[18px] font-bold">{roomItem?.place}</p>
        <div className="flex gap-1 items-center text-[13px]">
          <Star className="w-[13px] fill-[var(--text-color)]"/>
          <span className="font-semibold">{roomItem?.total_rating}</span>
          <span className="font-semibold">({roomItem?.reviews.length})</span>
        </div>
      </div>
    </div>
    <div className="h-[1px] w-full bg-[var(--line-color)] my-4"></div>
    <div className="flex justify-between">
      <div className="">
        <p className="font-semibold mb-2">Trip details</p>
        <div className="">{tripDates}</div>
        <div className="">{
          useGuestFormat({guestData: value.guestData})
          }</div>
      </div>
      <div className="">
        <Button onClick={() => setIsOpen(true)} variant={VariantsOfButton.default} className="py-2 px-3 text-[13px] font-semibold rounded-lg">Change</Button>
      </div>
    </div>
    <div className="h-[1px] w-full bg-[var(--line-color)] my-4"></div>
    <div className="">
      <p className="font-semibold mb-2">Price details</p>
      <div className="flex justify-between">
        <div className="">
          {roomItem?.price}Tg x {fullCount} nights
        </div>
        <div className="">
          {(roomItem?.price ?? 0) * fullCount}Tg
        </div>
      </div>
    </div>
    <div className="h-[1px] w-full bg-[var(--line-color)] my-4"></div>
    <div className="flex justify-between">
      <p className="font-semibold mb-2">Total</p>
      <div className="font-bold">
          {(roomItem?.price ?? 0) * fullCount}Tg
        </div>
    </div><div className=""></div>
  </Box>;
  </>

}