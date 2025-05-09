"use client"
import { useState } from "react";

type Props = {
    setNotesValue: (value: string) => void;
    setOldVal: (value: string) => void;
    setIsNotesOpen: (value: boolean) => void;
    setChangeNote: (id: number, noteId: number, notesValue: string) => void;
    setIsDeleteNoteOpen: (value: boolean) => void;
    setNoteId: (value: number) => void;
    wishCard: any[];
    clickToFav: (id: number) => void;
    deleteFromList: (id: number) => void;
    id: number;
    noteId: number;
    notesValue: string;
    oldVal: string;
}


export const useNoteClickEvents = ({
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
     oldVal,
    }: Props) => {

    const [isFavNoteDelete, setIsFavNoteDelete] = useState<boolean>(false);

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
  
  
      const clickToCancel = () => {
        setIsDeleteNoteOpen(false);
        if(!isFavNoteDelete){
        setIsNotesOpen(true);
        }
      }
  
      const switchToDelete = () => {
        setIsNotesOpen(false);
        setIsDeleteNoteOpen(true);
      }
  
  
      const clickToDelete = () => {
        setIsDeleteNoteOpen(false);
        setChangeNote(id, noteId, "");
        if(isFavNoteDelete){
          deleteFromList(noteId);
          console.log(noteId);
          setIsFavNoteDelete(false);
        }
      }
  
  
  
      const clickFav = (id: number) => {
        setNoteId(id);
        if(wishCard.find((card) => card.id === id)?.note?.length! > 0){
          setIsDeleteNoteOpen(true);
          setIsFavNoteDelete(true);
        }else{
          clickToFav(id);
        }
      }

      return {
        clickToNotes,
        changeNotes,
        clickToSave,
        clearNote,
        checkToVal,
        clickToCancel,
        switchToDelete,
        clickToDelete,
        clickFav
      }
}