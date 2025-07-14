'use client'
import Box from "@/shared/components/box";
import Container, { SizeOfContainer } from "@/shared/components/container";
import { WhenToPayForm } from "@/shared/components/order-when-pay";
import Button, { VariantsOfButton } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Booking() {
  const [activeBox, setActiveBox] = useState(1);
  const formBoxes = [
    {id: 1, title: 'Choose when to pay', component: () => (<WhenToPayForm isActiveBox = {activeBox === 1} button={() => (<Button onClick={() => setActiveBox(2)} className="py-3 px-10" variant={VariantsOfButton.filling}>Next</Button>)}/>)},
    {id: 2, title: 'Add a payment method', component: () => (<div>Hello</div>
    )}
  ]

  return (
    <Container className="py-7 flex gap-4" size={SizeOfContainer.md}>
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[var(--weak-gray-color)]">
        <ArrowLeft className="w-5" />
      </div>

      <div className="flex-1">
        <h1 className="font-bold text-[30px] leading-none pb-5">Confirm and pay</h1>

        <div className="grid grid-cols-9 gap-20">
          <div className="col-span-5 flex flex-col gap-5">
            {formBoxes.map((box, index) => (
              <Box key={box.id} className="p-5 col-span-5">
                <h2 className="text-[20px] font-semibold">{index + 1}. {box.title}</h2>
                {box.component()}
            </Box>
            ))}
          </div>

          <div className="col-span-4">
            <div className="font-semibold">Booking</div>
            {/* Тут можно вставить детали бронирования */}
          </div>
        </div>
      </div>
    </Container>
  );
}
