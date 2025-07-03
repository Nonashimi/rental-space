'use client';
import { ChevronLeft } from "lucide-react";
import Container, { SizeOfContainer } from "./container";
import { RoomItemTopBtns } from "./room-item-top-btns";
import { FC, useState } from "react";
import { CardItem, useCardListStore } from "@/store/cards";
import Masonry from "react-masonry-css";
import { PhotoPaginationModal } from "./photo-pagination-modal";


type Props = {
  roomItem: CardItem,
  id: number;
  closeModal: () => void,
}


const breakpointColumnsObj = {
  default: 2,
 
};

export const PhotosModal:FC<Props> = ({id, roomItem, closeModal}) => {
  const images = roomItem.images;
  const [deep, setDeep] = useState({isOpen: false, id: -1});
  const close = () => {
    setDeep({id: -1, isOpen: false});
  };
  const open = (i: number) => {
      window.scrollTo({ top: 0});  
     setDeep({id: i, isOpen: true});
  }
  return(
    <div className="absolute top-0 left-0 right-0 min-h-screen z-40 bg-[var(--bg-color)]">
      {deep.isOpen && <PhotoPaginationModal roomItem={roomItem} id={id} photo_id={deep.id} closeModal={close}/>}
      <Container className="sticky top-0 z-10">
        <div className="bg-[var(--bg-color)] flex justify-between items-center py-5 z-50">
          <ChevronLeft className="cursor-pointer" onClick={closeModal} />
          <RoomItemTopBtns id={id} />
        </div>
      </Container>
      <Container className="w-full grid grid-cols-10 gap-4" size={SizeOfContainer.md}>
        <div className="col-span-3">
          cdvb 
        </div>
        <div className="col-span-7">
           <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="space-y-4"
          >
            {images.map((src, i) => (
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
  );
};