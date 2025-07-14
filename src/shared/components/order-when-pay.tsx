'use client';
import { useOrderDatas, WhenToPayVariants } from "@/store/order-datas";
import { RadioBox } from "../ui/radiobox";
import { FC } from "react";
import { cn } from "@/lib/utils";

type Props = {
  button?: () => React.ReactNode;
  isActiveBox: boolean
}

export const WhenToPayForm: FC<Props> = ({ button, isActiveBox }) => {
  const { WhenToPay, handleWhenToPay } = useOrderDatas();

  const variants = [
    {
      id: WhenToPayVariants.payNow,
      title: 'Pay ₸44,785.52 now',
    },
    {
      id: WhenToPayVariants.payPartNowPartLater,
      title: 'Pay part now, part later',
      description: '₸22,392.76 now, ₸22,392.76 charged on Aug 14. No extra fees.'
    }
  ];

  return (
    <div className={cn("flex flex-col gap-4 overflow-y-hidden transition-all duration-200", { 'max-h-[500px]': isActiveBox, 'max-h-0': !isActiveBox })} role="radiogroup">
      {variants.map(({ id, title, description }) => (
        <div key={id} className="flex justify-between items-start py-4 border-b border-[var(--line-color)]">
          <div>
            <p>{title}</p>
            {description && (
              <p className="text-[var(--text-gray-color)] text-sm">{description}</p>
            )}
          </div>

          <RadioBox
            checked={WhenToPay === id}
            value={id}
            onChange={() => handleWhenToPay(id)}
          />
        </div>
      ))}

      {button && (
        <div className="flex justify-end">
          {button()}
        </div>
      )}
    </div>
  );
};
