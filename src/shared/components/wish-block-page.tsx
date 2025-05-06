"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Header } from './header'
import { SizeOfContainer } from './container'
import { useFavoritesStore } from '@/store/favorites'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import ApartmentMap from './apartment-map'
import Button, { VariantsOfButton } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Modal, { SizeForModal } from './modal'
import { useWishCardsStore } from '@/store/wish-cards'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import Card from './card'

type Props = {
    id: number
}

function WishBlockPage({id}: Props) {
     const [sidePadding, setSidePadding] = useState<number>(0)
     const {favBlockList, inFavList, clickToFav}  = useFavoritesStore();
     const {wishCards, setWishCards, setChangeNote} = useWishCardsStore();
     const router = useRouter();
     const {cardList} = useCardListStore();
     const [isFavTitleHide, setIsFavTitleHide] = useState<boolean>(true);
     const favoriteBlock = favBlockList.find((block) => block.id == id)!;
     const [isNotesOpen, setIsNotesOpen] = useState(false);
     const [notesValue, setNotesValue] = useState<string>('');
     const [noteId, setNoteId] = useState<number>(0);
     const [hoveredCard, setHoveredCard] = useState<number>(-1);
     const [oldVal, setOldVal] = useState<string>("");
     const mouseEnter = (id: number) => {
      setHoveredCard(id);
     }
     const mouseLeave = () => {
      setHoveredCard(-1);
     }
     useToaster();

     const favCards =cardList.filter((card) => favoriteBlock.favoriteItems.includes(card.id));
      useEffect(() => {
        if (cardList.length === 0 || favBlockList.length === 0) return;
        const prototypeWishCard = favBlockList.map((favBlock => {
          return {id: favBlock.id, card: cardList.filter((card) => favBlock.favoriteItems.includes(card.id)).map((fav) => ({...fav, note: ""}))};
         }))
        setWishCards(prototypeWishCard); 
      }, [cardList]);

      const wishCard = useMemo(() => {
        return wishCards.find((wish) => wish.id == id)?.card || [];
      }, [wishCards, id]);
      

      useEffect(() => {
        const widthClass = SizeOfContainer.lg as unknown as string
        const matchResult = widthClass.match(/\d+/)
        const blockWidth = matchResult ? parseInt(matchResult[0], 10) : 0
        const padding = (window.innerWidth - window.innerWidth * blockWidth/100) / 2
        setSidePadding(padding)

        const element = document.querySelector('.observe-fav-title');
        if (!element) return;
      
        let ticking = false;
      
        const handleScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const rect = element.getBoundingClientRect();
              setIsFavTitleHide(rect.top >= 115);
              ticking = false;
            });
            ticking = true;
          }
        };
      
        window.addEventListener('scroll', handleScroll, { passive: true });
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      

    const clickToNotes = (id: number) => {
      setNotesValue(wishCard.find((card) => card.id === id)?.note!);
      setOldVal(wishCard.find((card) => card.id === id)?.note || "");
      setIsNotesOpen(true);
      setNoteId(id);
    }

    const changeNotes= (e: string) =>{
      if(e.length <= 250){
        setNotesValue(e);
      }
    }

    const clickToSave = () => {
      setChangeNote(id, noteId, notesValue);
      setIsNotesOpen(false);
      setNoteId(0);
    }


    const clearNote = () => {
      setNotesValue('');
    }


    const checkToVal = () => {
      return oldVal == notesValue;
    }



  return (
    <div className='flex flex-col'>
          {isNotesOpen && <Modal size={SizeForModal.md} title="Добавить заметку" clickClose={() => setIsNotesOpen(false)}>
          <div className="">
            <div className="w-[85%] mx-auto py-7">
              <textarea
                className='w-full min-h-[110px] p-3 border border-gray-300 rounded-lg text-base outline-[#000]'
                name="" 
                placeholder='Введите текст заметки'
                value={notesValue}
                onChange={(e) => changeNotes(e.target.value)}
              ></textarea>
              <div className="text-[13px] text-[#696969] font-bold mt-1">{notesValue.length}/250 characters</div>
            </div>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="flex py-3 justify-between w-[90%] mx-auto">
              {wishCard.find((card) => card.id === noteId)?.note?.length! > 0 && <Button  variant={VariantsOfButton.transparent}>Delete</Button>} 
              {wishCard.find((card) => card.id === noteId)?.note?.length! === 0 && <Button disabled={checkToVal()} onClick={clearNote} variant={VariantsOfButton.transparent}>Clear</Button>} 
              <Button disabled={checkToVal()} onClick={clickToSave} className='border-none py-4 px-7' variant={VariantsOfButton.filling}>Save</Button>
            </div>
          </div>
        </Modal>}
        <FavModals/>
        <Header size={SizeOfContainer.lg} hasSearch={false} className='sticky top-0 z-10 bg-white'/>
        <div className="">
            <div className='' style={{ marginLeft: sidePadding }}>
                <div className="flex relative">
                    <div className="w-[60%] min-w-[60%] pr-5 hide-scrollbar">
                            <div className="sticky top-[92px] z-10 bg-white flex justify-between items-center py-5 ">
                                <div className="flex gap-2 items-center ">
                                    <ChevronLeft className='cursor-pointer' onClick={router.back}/>
                                    <div className={cn("font-bold transform transitian-all duration-300", isFavTitleHide?"translate-y-[10px] opacity-0":"opacity-1 translate-y-[0px]")}>{favoriteBlock?.title}</div>
                                </div>
                                <Ellipsis/>
                            </div>
                            <div className="font-bold text-[30px] mt-2 observe-fav-title">
                                {favoriteBlock?.title}
                            </div>
                            <div className="flex gap-2 py-5 sticky top-[135px] z-10 bg-white">
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Add dates</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>1 quest</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Share</Button>
                            </div>
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {wishCard && 
                                wishCard.map((card) => ( 
                                  <div onMouseLeave={mouseLeave} onMouseEnter={() => mouseEnter(card.id)} key={card.id} className="flex-1">
                                    <Card cardItem={card} clickToFav={clickToFav} inFavList={inFavList}/>
                                    <div className="p-3 mt-2 bg-[#f7f7f7] rounded-xl text-[15px] text-[#0000008c]">
                                      <span className="break-words">
                                        {card.note}
                                      </span>
                                      <span
                                        onClick={() => clickToNotes(card.id)}
                                        className="cursor-pointer underline font-[600] transition-all duration-300 hover:text-[#000] ml-1"
                                      >
                                        {card.note.length > 0 ? 'Edit' : 'Add note'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                        </div>
                    </div>
                    <div className="h-[calc(100vh-90.667px)] w-full sticky top-[90.667px]">
                            <ApartmentMap activeId = {hoveredCard} cardList={favCards}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishBlockPage