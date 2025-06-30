'use client';
import { Heart, Send } from "lucide-react";
import Button, { VariantsOfButton } from "../ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { useFavoritesStore } from "@/store/favorites";


type Props = {
  id: number
}

export const RoomItemTopBtns:FC<Props> = ({id}) => {
  const favorites = useFavoritesStore();

  return <div className="flex gap-4">
                    <Button variant={VariantsOfButton.transparent} className='p-2 rounded-lg'>
                    <div className="flex gap-2 items-center">
                            <Send size={15}/>
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