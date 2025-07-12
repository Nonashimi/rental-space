import { cn } from "@/lib/utils"
import { response, Review } from "@/store/cards"
import { FC } from "react"

type Props = {
  comment: Review,
  className?: string,
  inModal?: boolean
}

export const RoomReview:FC<Props> = ({comment, className, inModal}) => {
    const ownerResponse = response.filter(res => comment.responses.some(id => id === res.id))
  return  <div className={className}>
            <div className={cn("flex flex-col gap-4")}>
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
            {
                inModal && <div className="pl-6">
                                {
                                    ownerResponse.map(response => 
                                        <div key={response.id} className={cn("flex flex-col gap-2 py-3")}>
                                            <div className="flex gap-5">
                                                <div className="">
                                                    <img className='w-[35px] h-[35px] rounded-full' src={comment.user_avatar} alt="" />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <div className="">Response from Eve</div>
                                                    <div className="">{response.created_at}</div>
                                                </div>
                                            </div>
                                            <div className="">
                                                {response.message}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
            }
        </div>
}