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
  const images = roomItem.rooms.flatMap(room => room.images);
  const [deep, setDeep] = useState({isOpen: false, id: -1});
  const close = () => {
    setDeep({id: -1, isOpen: false});
  };
  const open = (i: number) => {
      window.scrollTo({ top: 0});  
     setDeep({id: i, isOpen: true});
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
        <Container className=" grid grid-cols-10 gap-4 pt-5 pb-10" size={SizeOfContainer.md}>
          <div className="col-span-3">
            cdvb 
          </div>
          <div className="col-span-7">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-4"
              columnClassName="space-y-4"
            >
              {images.map((src:string, i:number) => (
                <div onClick={() => open(i)} key={i} className="bg-black">
                  <img
                    src={src}
                    className="w-full object-cover transition-all duration-300 cursor-pointer hover:opacity-[70%]"
                    alt=""
                  />
                </div>
              ))}
            </Masonry>
          </div>
        </Container>
      </div>
    </div>
  );
};