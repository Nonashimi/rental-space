import Box from "@/shared/components/box";
import Container, { SizeOfContainer } from "@/shared/components/container";
import Button, { VariantsOfButton } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Booking() {
  const variants = [
    {id: 1, title: 'Pay ₸44,785.52 now'},
    {id: 2, title: 'Pay part now, part later', description: '₸22,392.76 now, ₸22,392.76 charged on Aug 14. No extra fees.'}
  ]
  return (
        <Container className="py-7 flex gap-4" size={SizeOfContainer.md}>
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[var(--weak-gray-color)]">
              <ArrowLeft className="w-[20px]"/>
            </div>
            <div className="flex-1">
              <div className="font-bold text-[30px] leading-none pb-5">Confirm and pay</div>
              <div className="grid grid-cols-9 gap-20">
                  <Box className="p-5 col-span-5">
                    <div className="text-[20px] font-semibold">
                      1. Choose when to pay
                    </div>
                    <div className="py-4">
                      {
                        variants.map(variant => 
                          <div key={variant.id} className="flex justify-between py-4 border-b border-[var(--line-color)]">
                            <div className="">
                              <p>{variant.title}</p>
                              {variant.description && <p>{variant.description}</p>}
                            </div>
                            <input type="radio" />
                          </div>
                        )
                      }
                    </div>
                    <div className="flex justify-end">
                      <Button className="py-3 px-10" variant={VariantsOfButton.filling}>Next</Button>
                    </div>
                  </Box>
                <div className="col-span-4">
                  <div className="">Booking</div>
                </div>
              </div>
            </div>
        </Container>   
  );
}
