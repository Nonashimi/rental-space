
import { create } from 'zustand';


export enum MarkerCondition  {
  DEFAULT = "",
  ACTIVE = "marker-active",
  VISITED = "marker-visited",
}


export interface CardItem{
        images: string[];
        place: string;
        description: string;
        date: string;
        price: number;
        rate: number;
        id: number;
        coordinates: {lat: number, lng: number},
        condition?: MarkerCondition;
}


interface State{
    cardList: CardItem[],
    updateCardCondition: (id: number, condition: MarkerCondition) => void,
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

export const useCardListStore = create<State>((set) => ({
   cardList : [
    {
      images,
      place: "Shangarh (Индия)",
      description: "Национальный парк Большие Гималаи в 13 км",
      date: "3-8 фев.",
      price: 15000,
      rate: 4.8,
      id: 1,
      coordinates: { lat: 31.9665, lng: 77.3514 }
    },
    {
      images,
      place: "Бали (Индонезия)",
      description: "Райский остров с вулканами и водопадами",
      date: "10-15 марта",
      price: 18000,
      rate: 4.9,
      id: 2,
      coordinates: { lat: -8.3405, lng: 115.0920 }
    },
    {
      images,
      place: "Тбилиси (Грузия)",
      description: "Старинный город с уютными улочками",
      date: "5-10 мая",
      price: 12000,
      rate: 4.7,
      id: 3,
      coordinates: { lat: 41.6938, lng: 44.8015 }
    },
    {
      images,
      place: "Киото (Япония)",
      description: "Древняя столица с храмами и садами",
      date: "15-20 апреля",
      price: 20000,
      rate: 5.0,
      id: 4,
      coordinates: { lat: 35.0116, lng: 135.7681 }
    },
    {
      images,
      place: "Рим (Италия)",
      description: "Колизей, Ватикан и потрясающая кухня",
      date: "20-25 июня",
      price: 25000,
      rate: 4.9,
      id: 5,
      coordinates: { lat: 41.9028, lng: 12.4964 }
    },
    {
      images,
      place: "Кейптаун (Южная Африка)",
      description: "Столовая гора и потрясающие пляжи",
      date: "12-18 сентября",
      price: 22000,
      rate: 4.8,
      id: 6,
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    {
      images,
      place: "Сан-Франциско (США)",
      description: "Золотые Ворота и технология Кремниевой долины",
      date: "8-14 ноября",
      price: 27000,
      rate: 4.7,
      id: 7,
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      images,
      place: "Сидней (Австралия)",
      description: "Оперный театр и пляж Бонди",
      date: "1-7 декабря",
      price: 30000,
      rate: 4.9,
      id: 8,
      coordinates: { lat: -33.8688, lng: 151.2093 }
    },
    {
      images,
      place: "Барселона (Испания)",
      description: "Гауди, пляжи и атмосфера праздника",
      date: "5-10 июля",
      price: 24000,
      rate: 4.8,
      id: 9,
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    {
      images,
      place: "Прага (Чехия)",
      description: "Староместская площадь и Карлов мост",
      date: "10-15 августа",
      price: 17000,
      rate: 4.7,
      id: 10,
      coordinates: { lat: 50.0755, lng: 14.4378 }
    },
    {
      images,
      place: "Дубай (ОАЭ)",
      description: "Бурдж-Халифа и роскошные пляжи",
      date: "15-20 октября",
      price: 35000,
      rate: 5.0,
      id: 11,
      coordinates: { lat: 25.276987, lng: 55.296249 }
    },
    {
      images,
      place: "Венеция (Италия)",
      description: "Гондолы, каналы и романтика",
      date: "20-25 марта",
      price: 26000,
      rate: 4.9,
      id: 12,
      coordinates: { lat: 45.4408, lng: 12.3155 }
    },
    {
      images,
      place: "Куско (Перу)",
      description: "Город инков и путь к Мачу-Пикчу",
      date: "3-9 апреля",
      price: 21000,
      rate: 4.8,
      id: 13,
      coordinates: { lat: -13.5319, lng: -71.9675 }
    },
    {
      images,
      place: "Осло (Норвегия)",
      description: "Фьорды, викинги и северное сияние",
      date: "10-16 мая",
      price: 23000,
      rate: 4.7,
      id: 14,
      coordinates: { lat: 59.9139, lng: 10.7522 }
    },
    {
      images,
      place: "Сеул (Южная Корея)",
      description: "Ночная жизнь, храмы и K-Pop",
      date: "5-11 июня",
      price: 28000,
      rate: 4.9,
      id: 15,
      coordinates: { lat: 37.5665, lng: 126.9780 }
    },
  ],
  updateCardCondition(id, condition) {
    set((state) => ({
      cardList: state.cardList.map((card) =>
        card.id === id ? { ...card, condition } : card
      ),
    }));
  }
  
    
  }));