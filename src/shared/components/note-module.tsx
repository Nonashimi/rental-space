

import React from 'react'
import Modal, { SizeForModal, TypeOfModal } from './modal';
import Button, { VariantsOfButton } from '../ui/button';
import { CardNote } from '@/store/wish-cards';

type Props = {
    notesValue: string;
    isNotesOpen: boolean;
    changeNotes: (e: string) => void;
    noteId: number;
    clickToSave: () => void;
    clickToDelete: () => void;
    clickToCancel: () => void;
    isDeleteNoteOpen: boolean;
    wishCard: CardNote[];
    setIsNotesOpen: (value: boolean) => void;
    switchToDelete: () => void;
    checkToVal: () => boolean;
    clearNote: () => void;
    setIsDeleteNoteOpen: (value: boolean) => void;
}

function NoteModule({isNotesOpen, notesValue, changeNotes, noteId, clickToDelete, clickToSave, clickToCancel, isDeleteNoteOpen, wishCard, setIsNotesOpen, switchToDelete, checkToVal, clearNote, setIsDeleteNoteOpen}: Props) {
  return (
    <>
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
              {wishCard.find((card) => card.id === noteId)?.note?.length! > 0 && <Button  onClick={switchToDelete} variant={VariantsOfButton.transparent}>Delete</Button>} 
              {wishCard.find((card) => card.id === noteId)?.note?.length! === 0 && <Button disabled={checkToVal()} onClick={clearNote} variant={VariantsOfButton.transparent}>Clear</Button>} 
              <Button disabled={checkToVal()} onClick={clickToSave} className='border-none py-4 px-7' variant={VariantsOfButton.filling}>Save</Button>
            </div>
          </div>
        </Modal>}
        {isDeleteNoteOpen && <Modal type={TypeOfModal.withoutTitle} clickClose={() => setIsDeleteNoteOpen(false)} size={SizeForModal.sm} title = "">
          <div className="pt-7 pb-10 flex flex-col items-center gap-2">
            <div className="font-semibold text-[18px]">Delete this note?</div>
            <div className="text-[#6a6a6a]">You can add a new note later.</div>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="flex py-3 justify-between w-[90%] mx-auto">
              <Button onClick={clickToCancel} variant={VariantsOfButton.transparent}>Cancel</Button>
              <Button onClick={clickToDelete} className='border-none py-4 px-7' variant={VariantsOfButton.filling}>Delete</Button>
            </div>
        </Modal>}
    </>
  )
}

export default NoteModule