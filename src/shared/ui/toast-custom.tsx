import React from 'react';
import { Toast } from 'react-hot-toast';
import Button, { VariantsOfButton } from './button';
import { TypeOfToaster } from '@/store/favorites';

type Props = {
  t: Toast;
  title?: string;
  image?: string;
  clickBtn?: () => void,
  type?: TypeOfToaster
};


function ToastCustom({ t, title, image, clickBtn, type = TypeOfToaster.ItemAddedOrChanged }: Props) {
  return (
    <div
      className={`bg-[var(--modal-bg-color)] p-4 shadow-md rounded-lg flex justify-between items-center gap-4 
      ${t.visible ? "animate-enter" : "animate-leave"}`}
    >
        <img src={image} className='max-w-[50px] max-h-[50px] rounded-lg' alt="" />
      <span className="text-gray-800 dark:text-[#fff] font-medium">
        {
            type === TypeOfToaster.ItemAddedOrChanged && (
                <>Сохранено в <strong>"{title}"</strong></>
            )
        }
        {
            type === TypeOfToaster.ItemDeleted && (
                <>Удалено из <strong>"{title}"</strong></>
            )
        }
       
      </span>
      {
        type === TypeOfToaster.ItemAddedOrChanged && (
                <Button onClick={clickBtn} variant={VariantsOfButton.transparent}>
                    Изменить 
                </Button>
        )
      }
    </div>
  );
}

export default ToastCustom;
