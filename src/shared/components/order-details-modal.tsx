'use client';
import { FC, useEffect, useState } from "react"
import Button, { VariantsOfButton } from "../ui/button"
import Calendars from "./Calendars"
import GuestHandler from "./guest-handler"
import Modal, { SizeForModal } from "./modal"
import { Dates, TypeOfDate } from "@/store/search-datas";
import { useOrderDatas } from "@/store/order-datas";
import { cn } from "@/lib/utils";
import { useOrderParams } from "@/hooks/useOrderParams";

type Props = {
  setIsOpen: (val: boolean) => void;
  isOpen?: boolean;
}

export const OrderDetailsModal:FC<Props> = ({setIsOpen, isOpen}) => {
  const {value} = useOrderDatas();
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);
  const [isActiveSection, setIsActiveSection] = useState(1);
  const [temporaryDates, setTemporaryDates] = useState<Dates>(value.dates);
  const [temporaryGuestData, setTemporaryGuestData] = useState(value.guestData);

  const {updateOrderParams} = useOrderParams();
  const sections = [
    {id: 1, title: 'Dates'},
    {id: 2, title: 'Guests'},
  ];
  const handleSave = () => {
    updateOrderParams({
      dates: temporaryDates,
      guests: temporaryGuestData
    });
    setIsOpen(false);
  }

  const setDates = (dates: Dates) => {
    console.log("setDates", dates);
    setTemporaryDates(dates);
  }

  useEffect(() => {
    if(value.dates == temporaryDates || value.guestData == temporaryGuestData) return;
    setTemporaryDates(value.dates);
    setTemporaryGuestData(value.guestData);
  }, [value.dates, value.guestData]);
  
  return <>
  {isOpen && <Modal size={SizeForModal.xl} clickClose={() => setIsOpen(false)} title="Change reservation details">
      <div className="p-7">
         <div className="grid grid-cols-2 gap-2 p-[5px] bg-[var(--weak-gray-color)] rounded-full mb-5">
          {sections.map(section => (
            <div
              key={section.id}
              className={cn(
                "flex justify-center py-2 rounded-full font-semibold text-[14px] cursor-pointer  active:scale-95",
                { 'bg-[var(--modal-bg-color)]': isActiveSection === section.id },
                { 'transition-all duration-200  hover:bg-gray-300 dark:hover:bg-[#363636]': isActiveSection !== section.id }
              )}
              onClick={() => setIsActiveSection(section.id)}
            >
              {section.title}
            </div>

          ))}
        </div>
        <section>
          {isActiveSection === 1 && <Calendars activeDate={activeDate} setActiveDate={setActiveDate} dates={temporaryDates} setDates={setDates}/> || 
          isActiveSection === 2 && <GuestHandler guestData={temporaryGuestData} setGuestData={setTemporaryGuestData}/>}
        </section>
      </div>
      <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
      <div className="py-3 px-7 flex justify-between">
        {
            isActiveSection === 1 && <Button onClick={() => setTemporaryDates({})} variant={VariantsOfButton.transparent} className="py-3 px-2">CLear dates</Button> ||
            isActiveSection === 2 && <Button onClick={() => setIsOpen(false)} variant={VariantsOfButton.transparent} className="py-3 px-7">Cancel</Button>
        }
        <Button disabled={!(temporaryDates.checkIn && temporaryDates.checkOut)} onClick={handleSave} variant={VariantsOfButton.filling} className="py-3 px-7">Save</Button>
      </div>
    </Modal>}
  </>
  
  
}