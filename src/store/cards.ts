
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
    {
      images,
      place: "Маракеш (Марокко)",
      description: "Базары, дворцы и пустыня Сахара",
      date: "12-17 января",
      price: 19000,
      rate: 4.8,
      id: 16,
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    {
      images,
      place: "Амстердам (Нидерланды)",
      description: "Каналы, музеи и велосипедная культура",
      date: "8-13 февраля",
      price: 22000,
      rate: 4.7,
      id: 17,
      coordinates: { lat: 52.3676, lng: 4.9041 }
    },
    {
      images,
      place: "Буэнос-Айрес (Аргентина)",
      description: "Танго, стейки и колониальная архитектура",
      date: "15-21 марта",
      price: 23000,
      rate: 4.6,
      id: 18,
      coordinates: { lat: -34.6037, lng: -58.3816 }
    },
    {
      images,
      place: "Ванкувер (Канада)",
      description: "Горы, океан и культурное разнообразие",
      date: "3-9 апреля",
      price: 27000,
      rate: 4.9,
      id: 19,
      coordinates: { lat: 49.2827, lng: -123.1207 }
    },
    {
      images,
      place: "Лиссабон (Португалия)",
      description: "Трамваи, фаду и солнечные холмы",
      date: "10-16 мая",
      price: 21000,
      rate: 4.8,
      id: 20,
      coordinates: { lat: 38.7169, lng: -9.1399 }
    },
    {
      images,
      place: "Копенгаген (Дания)",
      description: "Гавань Нюхавн и скандинавский уют",
      date: "6-12 июня",
      price: 25000,
      rate: 4.7,
      id: 21,
      coordinates: { lat: 55.6761, lng: 12.5683 }
    },
    {
      images,
      place: "Мехико (Мексика)",
      description: "Пирамиды, тако и древние цивилизации",
      date: "15-21 июля",
      price: 20000,
      rate: 4.8,
      id: 22,
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    {
      images,
      place: "Стамбул (Турция)",
      description: "Босфор, мечети и восточные базары",
      date: "22-28 августа",
      price: 18000,
      rate: 4.9,
      id: 23,
      coordinates: { lat: 41.0082, lng: 28.9784 }
    },
    {
      images,
      place: "Берлин (Германия)",
      description: "История, искусство и ночная жизнь",
      date: "5-11 сентября",
      price: 24000,
      rate: 4.7,
      id: 24,
      coordinates: { lat: 52.5200, lng: 13.4050 }
    },
    {
      images,
      place: "Афины (Греция)",
      description: "Акрополь, мифология и теплое море",
      date: "10-16 октября",
      price: 21000,
      rate: 4.6,
      id: 25,
      coordinates: { lat: 37.9838, lng: 23.7275 }
    },
    {
      images,
      place: "Ханой (Вьетнам)",
      description: "Уличная еда, озёра и колониальная архитектура",
      date: "5-11 ноября",
      price: 17000,
      rate: 4.9,
      id: 26,
      coordinates: { lat: 21.0285, lng: 105.8544 }
    },
    {
      images,
      place: "Куала-Лумпур (Малайзия)",
      description: "Башни Петронас и культурное смешение",
      date: "2-8 декабря",
      price: 22000,
      rate: 4.7,
      id: 27,
      coordinates: { lat: 3.1390, lng: 101.6869 }
    },
    {
      images,
      place: "Хельсинки (Финляндия)",
      description: "Скандинавский минимализм и архипелаги",
      date: "12-18 января",
      price: 23000,
      rate: 4.6,
      id: 28,
      coordinates: { lat: 60.1699, lng: 24.9384 }
    },
    {
      images,
      place: "Рейкьявик (Исландия)",
      description: "Гейзеры, вулканы и северное сияние",
      date: "6-12 февраля",
      price: 35000,
      rate: 4.9,
      id: 29,
      coordinates: { lat: 64.1466, lng: -21.9426 }
    },
    {
      images,
      place: "Куинстаун (Новая Зеландия)",
      description: "Озёра, горы и активный отдых",
      date: "15-21 марта",
      price: 28000,
      rate: 4.8,
      id: 30,
      coordinates: { lat: -45.0312, lng: 168.6626 }
    },
    {
      images,
      place: "Эдинбург (Шотландия)",
      description: "Средневековые улочки и замки",
      date: "5-11 апреля",
      price: 21000,
      rate: 4.7,
      id: 31,
      coordinates: { lat: 55.9533, lng: -3.1883 }
    },
    {
      images,
      place: "Касабланка (Марокко)",
      description: "Атлантика, мечети и белые здания",
      date: "3-9 мая",
      price: 19000,
      rate: 4.6,
      id: 32,
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    {
      images,
      place: "Сантьяго (Чили)",
      description: "Анды, винодельни и южное солнце",
      date: "12-18 июня",
      price: 26000,
      rate: 4.7,
      id: 33,
      coordinates: { lat: -33.4489, lng: -70.6693 }
    },
    {
      images,
      place: "Торонто (Канада)",
      description: "CN Tower, Ниагара и мультикультурализм",
      date: "15-21 июля",
      price: 27000,
      rate: 4.8,
      id: 34,
      coordinates: { lat: 43.6510, lng: -79.3470 }
    },
    {
      images,
      place: "Порту (Португалия)",
      description: "Портвейн, мосты и живописные улочки",
      date: "20-26 августа",
      price: 21000,
      rate: 4.9,
      id: 35,
      coordinates: { lat: 41.1579, lng: -8.6291 }
    }
    
  ],
  updateCardCondition(id, condition) {
    set((state) => ({
      cardList: state.cardList.map((card) =>
        card.id === id ? { ...card, condition } : card
      ),
    }));
  }
  
    
  }));