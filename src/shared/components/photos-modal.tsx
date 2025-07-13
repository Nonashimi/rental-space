'use client';
import { ChevronLeft } from "lucide-react";
import Container, { SizeOfContainer } from "./container";
import { RoomItemTopBtns } from "./room-item-top-btns";
import { FC, useEffect, useState } from "react";
import { CardItem, useCardListStore } from "@/store/cards";
import Masonry from "react-masonry-css";
import { PhotoPaginationModal } from "./photo-pagination-modal";


type Props = {
  roomItem: CardItem,
  id: number;
  closeModal: () => void,
  openShared: () => void,
}


const breakpointColumnsObj = {
  default: 2,
 
};

export const PhotosModal:FC<Props> = ({id, roomItem, closeModal, openShared}) => {
  const rooms = roomItem.rooms;
  const [deep, setDeep] = useState<{isOpen: boolean, id: string | number}>({isOpen: false, id: -1});
  const close = () => {
    setDeep({id: -1, isOpen: false});
  };
  const open = (id: string) => {
      window.scrollTo({ top: 0});  
     setDeep({id: id, isOpen: true});
  }


    const handleAnchor = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    }


  useEffect(() => {
  document.body.classList.add("overflow-hidden");
  return () => {
    document.body.classList.remove("overflow-hidden");
  };
}, []);
  return(
    <div className="fixed inset-0 z-40 bg-[var(--bg-color)] flex flex-col h-screen">
      {deep.isOpen && <PhotoPaginationModal openShared={openShared} roomItem={roomItem} id={id} photo_id={deep.id} closeModal={close}/>}
      <Container className=" bg-[var(--bg-color)]">
        <div className="flex justify-between items-center py-5 z-50">
          <ChevronLeft className="cursor-pointer" onClick={closeModal} />
          <RoomItemTopBtns clickOpenShared={openShared} id={id} />
        </div>
      </Container>
      <div className="overflow-y-auto flex-grow">
        <Container className="pt-5 pb-10" size={SizeOfContainer.md}>
          <div className="text-[22px] font-bold pb-6">Photo tour</div>
          <div className="grid grid-cols-7 gap-5 pb-[50px]">
            {
              rooms.map(room => 
                <div key={room.id}  onClick={() => handleAnchor(room.title)} className="flex flex-col gap-1 cursor-pointer">
                  <img className="w-full aspect-[13/9] object-cover shadow-lg" src={room.images[0]} alt="" />
                  <div className="">{room.title}</div>
                </div>
              )
            }
          </div>
          {
            rooms.map((room, index) => 
              <div key={room.id} id={room.title} className="grid grid-cols-10 gap-4 pb-[50px] scroll-mt-[40px]">
                <div className="col-span-3  relative">
                  <p className="font-bold text-[23px] py-3 sticky top-3">{room.title} </p>
                </div>
                <div className="col-span-7">
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex gap-4"
                    columnClassName="space-y-4"
                  >
                    {room.images.map((src:string, i:number) => (
                      <div onClick={() => open(`${index + 1}-${i}`)} key={i} className="bg-black">
                        <img
                          src={src}
                          className="w-full object-cover transition-all duration-300 cursor-pointer hover:opacity-[70%]"
                          alt=""
                        />
                      </div>
                    ))}
                  </Masonry>
                </div>
              </div>
            )
          }
        </Container>
      </div>
    </div>
  );
};