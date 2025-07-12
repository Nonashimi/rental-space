import { cn } from "@/lib/utils"
import { Review } from "@/store/cards"
import { FC } from "react"

type Props = {
  comment: Review,
  className?: string
}

export const RoomReview:FC<Props> = ({comment, className}) => {
  return  <div className={cn("flex flex-col gap-4", className)}>
              <div className="flex gap-5">
                  <div className="">
                      <img className='w-[50px] h-[50px] rounded-full' src={comment.user_avatar} alt="" />
                  </div>
                  <div className="flex flex-col justify-between">
                      <div className="">{comment.user_name}</div>
                      <div className="">{comment.created_at}</div>
                  </div>
              </div>
              <div className="">
                  {comment.comment}
              </div>
          </div>
}