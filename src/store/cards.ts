
import { create } from 'zustand';

export interface CardItem{
        images: string[];
        place: string;
        description: string;
        date: string;
        price: number;
        rate: number;
        id: number;
}


interface State{
    cardList: CardItem[]
}

const images =  [
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/1479b1a0-ee19-49a6-94e4-3c43049776c0.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/3ac04d3f-b4f5-4d01-8258-8083979c792e.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/cd0c1eba-74bd-4d6b-9ec3-20c6dd8b5226.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/ac259f95-bc29-4466-89f9-12a97f2b0977.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/1479b1a0-ee19-49a6-94e4-3c43049776c0.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/3ac04d3f-b4f5-4d01-8258-8083979c792e.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/cd0c1eba-74bd-4d6b-9ec3-20c6dd8b5226.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/ac259f95-bc29-4466-89f9-12a97f2b0977.jpeg?im_w=720&im_format=avif",
];

export const useCardListStore = create<State>(() => ({
    cardList: [
        {
          images,
          place: "Shangarh (Индия)",
          description: "Национальный парк Большие Гималаи в 13 км",
          date: "3-8 фев.",
          price: 15000,
          rate: 4.8,
          id: 1,
        },
        {
          images,
          place: "Бали (Индонезия)",
          description: "Райский остров с вулканами и водопадами",
          date: "10-15 марта",
          price: 18000,
          rate: 4.9,
          id: 2,
        },
        {
          images,
          place: "Тбилиси (Грузия)",
          description: "Старинный город с уютными улочками",
          date: "5-10 мая",
          price: 12000,
          rate: 4.7,
          id: 3,
        },
        {
          images,
          place: "Киото (Япония)",
          description: "Древняя столица с храмами и садами",
          date: "15-20 апреля",
          price: 20000,
          rate: 5.0,
          id: 4,
        },
        {
          images,
          place: "Рим (Италия)",
          description: "Колизей, Ватикан и потрясающая кухня",
          date: "20-25 июня",
          price: 25000,
          rate: 4.9,
          id: 5,
        },
        {
          images,
          place: "Кейптаун (Южная Африка)",
          description: "Столовая гора и потрясающие пляжи",
          date: "12-18 сентября",
          price: 22000,
          rate: 4.8,
          id: 6,
        },
        {
          images,
          place: "Сан-Франциско (США)",
          description: "Золотые Ворота и технология Кремниевой долины",
          date: "8-14 ноября",
          price: 27000,
          rate: 4.7,
          id: 7,
        },
        {
          images,
          place: "Сидней (Австралия)",
          description: "Оперный театр и пляж Бонди",
          date: "1-7 декабря",
          price: 30000,
          rate: 4.9,
          id: 8,
        },
      ]
  }));