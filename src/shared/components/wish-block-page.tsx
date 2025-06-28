"use client"
import React, {  useMemo, useState } from 'react'
import { Header } from './header'
import { SizeOfContainer } from './container'
import { useFavoritesStore } from '@/store/favorites'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import ApartmentMap from './apartment-map'
import Button, { VariantsOfButton } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useWishCardsStore } from '@/store/wish-cards'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import Card from './card'
import { useMapCenter } from '@/hooks/useMapCenter'
import { useNoteClickEvents } from '@/hooks/useNoteClickEvents'
import { useHandleScroll } from '@/hooks/useHandleScroll'
import NoteModule from './note-module'

type Props = {
    id: number
}

function WishBlockPage({id}: Props) {
     const [sidePadding, setSidePadding] = useState<number>(0)
     const {favBlockList, inFavList, deleteFromList, clickToFav}  = useFavoritesStore();
     const {wishCards, setWishCards, setChangeNote} = useWishCardsStore();
     const router = useRouter();
     const {cardList} = useCardListStore();
     const [isFavTitleHide, setIsFavTitleHide] = useState<boolean>(true);
     const favoriteBlock = favBlockList.find((block) => block.id == id)!;
     const [isNotesOpen, setIsNotesOpen] = useState(false);
     const [notesValue, setNotesValue] = useState<string>('');
     const [oldVal, setOldVal] = useState<string>('');
     const [noteId, setNoteId] = useState<number>(0);favBlockList
     const [hoveredCard, setHoveredCard] = useState<number>(-1);
     const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState<boolean>(false);
     const {mapCenter} = useMapCenter({cardList, id});
     const favCards =cardList.filter((card) => favoriteBlock.favoriteItems.includes(card.id));
     const wishCard = useMemo(() => {
      return wishCards.find((wish) => wish.id == id)?.card || [];
      }, [wishCards, id]);
     const {
          changeNotes,
          clickToNotes,
          clickToSave,
          clearNote,
          checkToVal,
          switchToDelete,
          clickToCancel,
          clickToDelete,
          clickFav
          }  =  useNoteClickEvents({
              setNotesValue,
              setOldVal,
              setIsNotesOpen,
              setChangeNote,
              setIsDeleteNoteOpen,
              setNoteId,
              wishCard,
              clickToFav,
              deleteFromList,
              id,
              noteId,
              notesValue,
              oldVal
          });


      useHandleScroll({
        setSidePadding,
        setIsFavTitleHide,
        cardList,
        setWishCards
        });

     useToaster();
      const mouseEnter = (id: number) => {
        setHoveredCard(id);
       }
       const mouseLeave = () => {
        setHoveredCard(-1);
       }




  return (
    <div className='flex flex-col'>
        <NoteModule 
        isNotesOpen={isNotesOpen}
        notesValue={notesValue}
        changeNotes={changeNotes}
        noteId={noteId}
        clickToDelete={clickToDelete}
        clickToSave={clickToSave}
        clickToCancel={clickToCancel}
        isDeleteNoteOpen={isDeleteNoteOpen}
        wishCard={wishCard}
        setIsNotesOpen={setIsNotesOpen}
        switchToDelete={switchToDelete}
        checkToVal={checkToVal}
        clearNote={clearNote}
        setIsDeleteNoteOpen={setIsDeleteNoteOpen}
        />
        <FavModals/>
        <Header size={SizeOfContainer.lg} hasSearch={false} className='sticky top-0 z-10 bg-[var(--bg-color)]'/>
        <div className="">
            <div className='' style={{ marginLeft: sidePadding }}>
                <div className="flex relative">
                    <div className="w-[60%] min-w-[60%] pr-5 hide-scrollbar">
                            <div className="sticky top-[92px] z-10 bg-[var(--bg-color)] flex justify-between items-center py-5 ">
                                <div className="flex gap-2 items-center ">
                                    <ChevronLeft className='cursor-pointer' onClick={router.back}/>
                                    <div className={cn("font-bold transform transitian-all duration-300", isFavTitleHide?"translate-y-[10px] opacity-0":"opacity-1 translate-y-[0px]")}>{favoriteBlock?.title}</div>
                                </div>
                                <Ellipsis/>
                            </div>
                            <div className="font-bold text-[30px] mt-2 observe-fav-title">
                                {favoriteBlock?.title}
                            </div>
                            <div className="flex gap-2 py-5 sticky top-[135px] z-10 bg-[var(--bg-color)]">
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Add dates</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>1 quest</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Share</Button>
                            </div>
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {wishCard && 
                                wishCard.map((card) => ( 
                                  <div onMouseLeave={mouseLeave} onMouseEnter={() => mouseEnter(card.id)} key={card.id} className="flex-1">
                                    <Card cardItem={card} clickToFav={clickFav} inFavList={inFavList}/>
                                    <div className="p-3 mt-2 bg-[#e7e5e5] dark:bg-[var(--modal-bg-color)] rounded-xl text-[15px]">
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
                            <ApartmentMap mapCenter={mapCenter as [number, number]} activeId = {hoveredCard} cardList={favCards}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishBlockPage