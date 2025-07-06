'use client'
import { useState } from "react";
import Button, { VariantsOfButton } from "../ui/button"
import InputTitle from "../ui/input-title"
import Calendars from "./Calendars"


export const RoomItemPrice = () => {
  const [isOpen, setisOpen] = useState(false);
  return  <div className="h-full">
            <div className="sticky top-16">
                <div className="bg-[var(--modal-bg-color)] w-full p-6 rounded-xl shadow-2xl border  border-[var(--line-color)]">
                  <p className="text-[20px] pb-5">Add dates for prices</p>
                  <div onClick={() => setisOpen(true)} className="grid grid-cols-2 border border-[var(--line-color)] rounded-lg">
                    <InputTitle className="rounded-none px-2 col-span-1 border-r border-[var(--line-color)]" title="CHECK-IN" placeHolder="Add date"/>
                    <InputTitle className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
                    <InputTitle className="rounded-none px-2 col-span-2 border-t border-[var(--line-color)]" title="Guests" placeHolder="add quests"/>
                  </div>
                  {
                    isOpen && <div className="relative">
                                <div className="absolute top-[-138px] right-[-25px] w-[650px] bg-[var(--modal-bg-color)] shadow-[0_4px_24px_rgba(0,0,0,0.6)] py-4 px-6 rounded-xl">
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1">
                                      <p className="font-semibold text-[18px]">Select dates</p>
                                      <p className="text-[var(--text-gray-color)]">Minimum stay: 2 nights</p>
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 border border-[var(--line-color)] rounded-lg">
                                      <InputTitle className="rounded-none px-2 col-span-1 border-r border-[var(--line-color)]" title="CHECK-IN" placeHolder="Add date"/>
                                      <InputTitle className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
                                    </div>
                                  </div>
                                  <div className="mt-5">
                                    <Calendars isMin={true}/>
                                  </div>
                                  <div className="flex justify-end gap-4">
                                    <Button className="py-2 font-thin" variant={VariantsOfButton.transparent}><div className="underline">Clear dates</div></Button>
                                    <Button onClick={() => setisOpen(false)} className="py-2" variant={VariantsOfButton.filling}>Close</Button>
                                  </div>
                                </div>
                              </div>
                  }
                </div>
            </div>
          </div>
}