'use client'
import Box from "@/shared/components/box";
import Container, { SizeOfContainer } from "@/shared/components/container";
import { OrderDetails } from "@/shared/components/order-details";
import { WhenToPayForm } from "@/shared/components/order-when-pay";
import { PaymentForm } from "@/shared/components/PaymentForm";
import Button, { VariantsOfButton } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Booking() {
  const [activeBox, setActiveBox] = useState(1);
  const formBoxes = [
    {id: 1, title: 'Choose when to pay', component: () => (<WhenToPayForm isActiveBox = {activeBox === 1} button={() => (<Button onClick={() => setActiveBox(2)} className="py-3 px-10" variant={VariantsOfButton.filling}>Next</Button>)}/>)},
    {id: 2, title: 'Add a payment method', component: () => (<PaymentForm/>)}
  ]
  const router = useRouter();

  return (
    <Container className="py-7 flex gap-4" size={SizeOfContainer.md}>
      <div onClick={() => router.back()} className=" cursor-pointer w-10 h-10 rounded-full flex justify-center items-center bg-[var(--weak-gray-color)]">
        <ArrowLeft className="w-5" />
      </div>

      <div className="flex-1">
        <h1 className="font-bold text-[30px] leading-none pb-5">Confirm and pay</h1>

        <div className="grid grid-cols-9 gap-20">
          <div className="col-span-5 flex flex-col gap-5">
            {formBoxes.map((box, index) => (
              <Box key={box.id} className="p-5">
                <h2 className="text-[20px] font-semibold">{index + 1}. {box.title}</h2>
                {box.component()}
            </Box>
            ))}
          </div>
          <div className="col-span-4">
            <OrderDetails/>
          </div>
        </div>
      </div>
    </Container>
  );
}
