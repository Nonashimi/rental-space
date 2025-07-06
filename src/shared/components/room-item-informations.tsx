import { CardItem } from "@/store/cards"
import { Star } from "lucide-react"
import { FC } from "react"


type Props = {
  roomItem: CardItem
}

export const RoomItemInformations:FC<Props> = ({roomItem}) => {
  const comments = 0;
  return <div className="">
              <div className="flex flex-col gap-[2px]">
                  <div className="text-2xl font-semibold">{roomItem.place}</div>
                  <div className="">3 гостя,1 спальня,1кровать,1,5 ванной</div>
                  <div className="flex gap-[5px] items-center">
                      <Star size={17} className='fill-black'/>
                      {
                          comments > 0 ? (
                              <div className="font-semibold underline">
                                  {comments} отзыва 
                              </div>
                          ): 
                          (<div className="font-semibold">Пока нету отзывов</div>
                          )
                      }
                  </div>
              </div>
              <div className="my-6">
                  <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
                  <div className="flex gap-7 items-center py-4">
                      <img className='w-[40px] h-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="" />
                      <div className="flex flex-col">
                          <div className="text-[16px] font-semibold">Hosted bt Olzhas</div>
                          <div className="text-[14px] text-gray-500">4 moths hosting</div>
                      </div>
                  </div>
                  <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
              </div>
          </div>
}