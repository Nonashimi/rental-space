'use client';
import { FC } from "react";
import Container, { SizeOfContainer } from "./container"
import { OrderBack } from "./order-back"
import { OrderDetails } from "./order-details"
import OrderFormBoxes from "./order-form-boxes";
import { useComputionDay } from "@/hooks/useComputionPrice";
import { useOrderDatas } from "@/store/order-datas";


type Props = {  
  roomId: number
};

export const OrderPage:FC<Props> = ({roomId}) => {
  return  <Container className="py-7 flex gap-4" size={SizeOfContainer.md}>
      <OrderBack/>
      <div className="flex-1">
        <h1 className="font-bold text-[30px] leading-none pb-5">Confirm and pay</h1>

        <div className="grid grid-cols-9 gap-20">
          <OrderFormBoxes roomId = {roomId}/>
          <div className="col-span-4">
            <OrderDetails roomId = {roomId}/>
          </div>
        </div>
      </div>
    </Container>
}