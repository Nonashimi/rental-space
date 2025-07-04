'use client';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Container, { SizeOfContainer } from "./container";
import { RoomItemTopBtns, TypeOfTopBtns } from "./room-item-top-btns";
import { FC, useEffect } from "react";
import { CardItem, useCardListStore } from "@/store/cards";
import Masonry from "react-masonry-css";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";


type Props = {
  roomItem: CardItem,
  id: number;
  closeModal: () => void,
  photo_id: number,
  openShared: () => void,
}


const breakpointColumnsObj = {
  default: 2,
 
};

export const PhotoPaginationModal:FC<Props> = ({id, roomItem, closeModal, photo_id, openShared}) => {
  const images = roomItem.images;
  const {thisPage, clickNext, clickPrev} = usePagination({maxPages: images.length, newPage: photo_id + 1});

   useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return(
    <div className="absolute top-0 left-0 right-0 min-h-screen z-40 bg-[#141214]">
      <Container className="text-white">
        <div className="relative bg-[#141214] flex justify-between items-center py-5 z-50">
          <X className="cursor-pointer z-10" onClick={closeModal} />

          <div className="absolute left-1/2 -translate-x-1/2">
            {`${thisPage}/${images.length}`}
          </div>

          <RoomItemTopBtns clickOpenShared={openShared} type={TypeOfTopBtns.hide} id={id} className="z-10" />
        </div>
      </Container>


      <Container className=" gap-4 flex justify-between items-center mt-10">
        <div onClick={clickPrev} className={cn("rounded-full cursor-pointer w-[50px] h-[50px] border border-[#fff] flex justify-center items-center",
          {'opacity-10 pointer-events-none':thisPage == 1}
        )}>
          <ChevronLeft className="text-white"/>
        </div>
        <div className="w-[80%] h-[60vh]">
          <img
            src={images[thisPage - 1]}
            alt=""
            className="max-w-full max-h-[80vh] mx-auto object-contain"
          />
        </div>
        <div onClick={clickNext} className={cn("rounded-full cursor-pointer w-[50px] h-[50px] border border-[#fff] flex justify-center items-center",
          {'opacity-10 pointer-events-none':thisPage == images.length}
        )}>
          <ChevronRight className="text-white"/>
        </div>
      </Container>
    </div>
  );
};