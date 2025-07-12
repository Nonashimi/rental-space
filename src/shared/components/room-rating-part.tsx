import { CardItem, reviews } from "@/store/cards";
import { FC, useState } from "react";
import Button from "../ui/button";
import { RatingOfHouse } from "./rating-of-house";
import Modal, { SizeForModal, TypeOfModal } from "./modal";
import { RoomTotalRating } from "./room-total-rating";
import { RoomReview } from "./room-review";


type Props = {
  roomItem: CardItem,
};

export const RoomReviews:FC<Props> = ({roomItem}) => {
  const room_reviews = reviews.filter(review => roomItem.reviews.some(id => id === review.id));
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return <>
        {
            isReviewOpen && <Modal size={SizeForModal.xxxl} clickClose={() => setIsReviewOpen(false)} type={TypeOfModal.withoutTitle} title="">
                <div className="py-5 grid grid-cols-5">
                    <div className="col-span-2 px-12">
                        <RoomTotalRating roomItem={roomItem} inModal={true}/>
                        <div className="h-[1px] w-full bg-[var(--line-color)] my-5"></div>
                        <RatingOfHouse roomItem={roomItem} inModal={true}/>
                    </div>
                    <div className="col-span-3 flex flex-col h-[800px]">
                        <div className="px-12">
                            <div className="flex justify-between">
                                <div className="font-semibold text-[25px]">{roomItem.reviews.length} reviews</div>
                                <div className="">
                                    <select></select>
                                </div>
                            </div>
                        </div>
                        <div className="px-10">
                            <div className="h-[1px] w-full bg-[var(--line-color)] mt-10"></div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <div className="px-12">
                                {
                                    room_reviews.map(comment => 
                                        <RoomReview inModal={true} key={comment.id} className="py-5" comment={comment}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        }
          <div id='Reviews' className="scroll-mt-[110px]">
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png for 5 percent of owners */}
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png for between 4.9 and 5 */}
                <div className="">
                    <RoomTotalRating roomItem={roomItem}/>
                    <RatingOfHouse roomItem={roomItem}/>
                    <div className="grid grid-cols-2 gap-10">
                        {
                            room_reviews.slice(0, 6).map(comment => 
                               <RoomReview key={comment.id} comment={comment}/>
                            )
                        }
                    </div>
                    {
                        room_reviews.length > 6 && <Button onClick={() => setIsReviewOpen(true)} className='py-2 px-5 mt-8'>Show all {room_reviews.length} reviews</Button>
                    }
                </div>
                <div className="h-[1px] w-full bg-[var(--line-color)] my-10"></div>
                
            </div>
        </>
          
};