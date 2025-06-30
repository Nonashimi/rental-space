'use client';
import { FC } from "react";
import { CardItem } from "@/store/cards";
import { RoomItemTopBtns } from "./room-item-top-btns";


type Props = {
  roomItem: CardItem,
  id: number
}

export const RoomItemTop:FC<Props> = ({roomItem, id}) => {

  return  <div className="flex py-5 items-center justify-between">
                <div className="text-2xl font-semibold space-x-1">{roomItem.description}</div>
                <RoomItemTopBtns id={id}/>
          </div>
};

