import { CardItem } from "@/store/cards";
import { Grip } from "lucide-react";
import { FC } from "react";


type Props = {
  handleOpen: () => void,
  roomItem: CardItem
}
export const ItemGridPhotos:FC<Props> = ({handleOpen, roomItem}) => {
    const images = roomItem.images.slice(0, 5);
  return <div className="relative">
            <div className="grid grid-cols-4 gap-2">
              <div onClick={handleOpen} className="cursor-pointer col-span-2 row-span-2 aspect-square rounded-tl-2xl rounded-bl-2xl overflow-hidden">
                  <img
                  className="w-full h-full object-cover hover:opacity-80 transition-all duration-300"
                  src={images[0]}
                  alt=""
                  />
              </div>

              {images.slice(1).map((image, index) => {
                  const isTopRight = index === 1;
                  const isBottomRight = index === 3;

                  const roundedClass = isTopRight
                  ? 'rounded-tr-2xl'
                  : isBottomRight
                  ? 'rounded-br-2xl'
                  : '';

                  return (
                  <div onClick={handleOpen} key={index} className={`cursor-pointer aspect-square overflow-hidden ${roundedClass}`}>
                      <img
                      src={image}
                      className="w-full h-full object-cover hover:opacity-80 transition-all duration-300"
                      alt=""
                      />
                  </div>
                  );
              })}
          </div>
          <button onClick={handleOpen} className='absolute bottom-5 right-5 bg-[var(--modal-bg-color)] py-1 px-4 shadow-xl rounded-lg flex gap-2 items-center border border-black dark:border-[var(--line-color)]'>
              <Grip className='w-[17px]'/>
              <div className="text-[14px] font-bold">Show all photos</div>
          </button>
        </div>
};