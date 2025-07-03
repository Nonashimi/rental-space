'use client';
import { Heart, Upload } from "lucide-react";
import Button, { VariantsOfButton } from "../ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { useFavoritesStore } from "@/store/favorites";

export enum TypeOfTopBtns {
  hide = "HIDE",
  open = "OPEN",
}

type Props = {
  id: number,
  className?: string
  type?: TypeOfTopBtns
}

export const RoomItemTopBtns:FC<Props> = ({id, className, type}) => {
  const favorites = useFavoritesStore();

  if(type && type == TypeOfTopBtns.hide){
    return  <div className={cn("flex gap-6", className)}>
              <div className="flex gap-2 items-center">
                      <Upload size={15}/>
              </div>
              <div onClick={() => favorites.clickToFav(id)} className="flex gap-2 items-center cursor-pointer">
                  <Heart className={cn(` stroke-[2px]`, 
                                          !favorites.inFavList(id)?'':'fill-red-500 text-red-500'
                  )} size={15}/>
              </div>
            </div>;
  }

  return <div className={cn("flex gap-4", className)}>
                    <Button variant={VariantsOfButton.transparent} className='p-2 rounded-lg'>
                    <div className="flex gap-2 items-center">
                            <Upload size={15}/>
                            <div className="text-[14px] font-semibold underline">Поделиться</div>
                        </div>
                    </Button>
                    <Button onClick={() => favorites.clickToFav(id)} variant={VariantsOfButton.transparent} className='p-2 rounded-lg'>
                        <div className="flex gap-2 items-center">
                            <Heart className={cn(` stroke-[2px]`, 
                                                    !favorites.inFavList(id)?'':'fill-red-500 text-red-500'
                            )} size={15}/>
                            <div className="text-[14px] font-semibold underline">{favorites.inFavList(id)?'В вишлисте':'Сохранить'}</div>
                        </div>
                    </Button>
          </div>;
};