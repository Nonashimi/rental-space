'use client';
import { FC, useState } from "react";
import { WhenToPayForm } from "./order-when-pay";
import { PaymentForm } from "./PaymentForm";
import Button, { VariantsOfButton } from "../ui/button";
import Box from "./box";
import { useOrderDatas } from "@/store/order-datas";
import { useComputionDay } from "@/hooks/useComputionPrice";
import { useCardListStore } from "@/store/cards";

type Props = {
  roomId: number;
}
export default function OrderFormBoxes({roomId}: Props) {
  const [activeBox, setActiveBox] = useState(1);
  const {value} = useOrderDatas();
  const {fullCount} = useComputionDay({dates: value.dates});
  const price = useCardListStore().cardList.find(el => el.id === roomId)?.price;
  const formBoxes = [
    {
      id: 1,
      title: 'Choose when to pay',
      Component: WhenToPayForm,
      props: {
        isActiveBox: activeBox === 1,
        fullCount: fullCount,
        price: price ?? 0,
        button: (
          <Button
            onClick={() => setActiveBox(2)}
            className="py-3 px-10"
            variant={VariantsOfButton.filling}
          >
            Next
          </Button>
        ),
      },
    },
    {
      id: 2,
      title: 'Add a payment method',
      Component: PaymentForm,
      props: {
        isActiveBox: activeBox === 2,
        fullCount: fullCount,
        price: price ?? 0,
        button: undefined,
      },
    },
  ];

  return (
    <div className="col-span-5 flex flex-col gap-5">
      {formBoxes.map((box, index) => (
        <Box key={box.id} className="p-5">
          <h2 className="text-[20px] font-semibold">
            {index + 1}. {box.title}
          </h2>
          <box.Component {...box.props} />
        </Box>
      ))}
    </div>
  );
}
