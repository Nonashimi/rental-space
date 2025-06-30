import { ChevronLeft } from "lucide-react";
import Container, { SizeOfContainer } from "./container";
import { RoomItemTopBtns } from "./room-item-top-btns";
import { FC } from "react";


type Props = {
  id: number;
  closeModal: () => void,
}

export const PhotosModal:FC<Props> = ({id, closeModal}) => {
  return(
    <div className="absolute inset-0 z-40 bg-[var(--bg-color)] overflow-y-auto min-h-screen">
      <Container>
        <div className="sticky top-0 bg-[var(--bg-color)] flex justify-between items-center py-5 z-50">
          <ChevronLeft className="cursor-pointer" onClick={closeModal} />
          <RoomItemTopBtns id={id} />
        </div>
      </Container>
      <Container size={SizeOfContainer.md}>
        <div className="h-[5000px]"></div>
      </Container>
    </div>
  );
};