'use client';
import { FC, useState } from "react";
import Modal from "./modal";
import Button from "../ui/button";
import { CircleCheck, Copy } from "lucide-react";
import { CardItem } from "@/store/cards";

type Props = {
  handleClose: () => void,
  roomItem: CardItem
};

export const SharedModal:FC<Props> = ({handleClose, roomItem}) => {
  const [isCopied, setIsCopied] = useState(false);
  const images = roomItem.rooms.flatMap(room => room.images);
  const handleClick = (text:string) => {
      const href = window.location.href;
      const encodedUrl = encodeURIComponent(href);
      if(text === 'Telegram'){
          window.location.href = `https://t.me/share/url?url=${encodedUrl}`;
      }else if(text === 'Whatsapp'){
          window.location.href = `https://wa.me/?text=${encodedUrl}`;
      }
  };

  const handleCopy = () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url)
      .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
      })
      .catch((err) => {
      console.error("Ошибка при копировании:", err);
      });
  };

  const links = [
    {
        url: 'https://t.me/share/url?url=',
        title: 'Telegram',
        component: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0088cc" viewBox="0 0 24 24">
            <path d="M9.993 15.5c-.356 0-.294-.135-.417-.472L8.5 11.28 18.997 6.5" />
            <path d="M9.993 15.5c.25 0 .36-.115.5-.25l1.25-1.22 2.61 1.96c.48.26.83.12.95-.45l1.72-8.13c.17-.76-.29-1.12-.76-.93l-13.3 5.1c-.9.36-.89.88-.16 1.1l3.4 1.05 7.9-5-5.03 5.64Z" />
        </svg>
        )
    },
    {
        url: 'https://wa.me/?text=',
        title: 'Whatsapp',
        component: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#25D366" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.5 0-9.96 4.44-9.96 9.92 0 1.75.46 3.46 1.33 4.97l-1.4 5.12 5.25-1.38a9.92 9.92 0 0 0 4.78 1.2h.01c5.5 0 9.96-4.45 9.96-9.93C22 6.44 17.54 2 12.04 2zm.08 17.82h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.2-.31a7.9 7.9 0 0 1-1.22-4.24c0-4.39 3.58-7.97 7.97-7.97 2.13 0 4.13.83 5.63 2.33a7.93 7.93 0 0 1 2.33 5.64c-.01 4.39-3.59 7.98-7.99 7.98zm4.44-5.96c-.24-.12-1.43-.7-1.65-.77-.22-.08-.39-.12-.55.13-.16.24-.63.77-.77.93-.14.16-.28.17-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.64-1.18-1.43-1.32-1.67-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3 0-.42-.04-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.5.1.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z"/>
        </svg>
        )
    }
  ];
  return <Modal clickClose={handleClose} title='Share this place'>
            <div className="p-5 flex flex-col gap-6 relative">
                <div className="grid grid-cols-8 items-center gap-3">
                    <img className='col-span-1 rounded-xl' src={images[0]} alt="" />
                    <div className="col-span-7">{roomItem.place}</div>
                </div>
                <div className="grid grid-cols-6 gap-3">
                    <Button onClick={handleCopy} className='col-span-3'>
                        <div className="flex gap-2">
                            <Copy/>
                            <div className="">Copy Link</div>
                        </div>
                    </Button>
                    {
                        links.map(link => (
                            <Button key={link.title} onClick={() => handleClick(link.title)} className='col-span-3'>
                                <div className="flex gap-2">
                                    <div className="">{link.component()}</div>
                                    <div className="">{link.title}</div>
                                </div>
                            </Button>
                        ))
                    }
                </div>
                <div
                    className={`
                        py-1 px-3 flex items-center gap-2 
                        absolute bottom-2 left-1/2 -translate-x-1/2
                        bg-[var(--bg-color)] shadow-xl rounded-xl border border-[var(--line-color)]
                        transition-all duration-500
                        ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                    `}
                    >
                    <CircleCheck className='text-green-500 w-[17px]'/>
                    <p className='text-[14px]'>Link Copied</p>
                </div>
            </div>
        </Modal>
};