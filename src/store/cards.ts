
import { AirVent, Anvil, Baby, Bandage, Bath, Bed, Blinds, Camera, Car, Cigarette, Coffee, Columns2, Dog, Droplet, Fence, Flame, FlameKindling, House, Inbox, Microwave, Proportions, Refrigerator, ShowerHead, ThermometerSun, Tv, WashingMachine, WavesLadder, Wifi, Wind } from 'lucide-react';
import { create } from 'zustand';


export enum MarkerCondition  {
  DEFAULT = "",
  ACTIVE = "marker-active",
  VISITED = "marker-visited",
}

export type Review = {
    id: number,
    user_id: number,
    user_name: string,
    user_avatar: string,
    rating: {
      Cleanliness: number,
      Accuracy: number,
      Check_in: number,
      Communication: number,
      Location: number,
      Value: number,
    },
    comment: string,
    created_at: string,  
    images: [string?],
    responses: number[],
}


export type Response = {
  id: number,
  owner_id: number,
  created_at: string,
  message: string,
}


export const response:Response[] = [
  {
    id: 1,
    owner_id: 1,
    created_at: '2025-07-06T13:30:00Z',
    message: 'Спасибо большое за ваш добрый отзыв, Иван! 😊 Нам очень приятно, что вам понравилось. Всегда рады видеть вас снова — возвращайтесь в любое время!',
  },
  {
    id: 2,
    owner_id: 2,
    created_at: '2025-07-06T13:30:00Z',
    message: 'Спасибо большое за ваш добрый отзыв',
  }
]

export const reviews:Review[] = [
  {
    id: 1,
    user_id: 42,
    user_name: "Иван Иванов",
    user_avatar: "https://example.com/avatar1.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 4.8,
      Check_in: 5,
      Communication: 5,
      Location: 4.9,
      Value: 1,
    },
    comment: "Отличное место! Всё чисто и удобно. Обязательно вернусь.",
    created_at: "2025-07-05T14:30:00Z",
    images: ["https://example.com/review1.jpg"],
    responses: [1, 2],
  },
  {
    id: 2,
    user_id: 53,
    user_name: "Алия Сулейменова",
    user_avatar: "https://example.com/avatar2.jpg",
    rating: {
      Cleanliness: 4.5,
      Accuracy: 4.7,
      Check_in: 4.8,
      Communication: 5,
      Location: 5,
      Value: 4.6,
    },
    comment: "Всё понравилось, кроме немного шумных соседей.",
    created_at: "2025-06-28T11:00:00Z",
    images: [],
    responses: []
  },
  {
    id: 3,
    user_id: 101,
    user_name: "Жанна Ахметова",
    user_avatar: "https://example.com/avatar3.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 5,
      Check_in: 5,
      Communication: 5,
      Location: 5,
      Value: 5,
    },
    comment: "Просто сказка! Спасибо хозяевам!",
    created_at: "2025-07-01T09:45:00Z",
    images: [],
    responses: []
  },
  {
    id: 4,
    user_id: 102,
    user_name: "Тимур Баймухаметов",
    user_avatar: "https://example.com/avatar4.jpg",
    rating: {
      Cleanliness: 4.7,
      Accuracy: 4.5,
      Check_in: 4.8,
      Communication: 4.9,
      Location: 4.7,
      Value: 4.5,
    },
    comment: "Удобное расположение, немного пыльно было.",
    created_at: "2025-07-02T16:20:00Z",
    images: [],
    responses: []
  },
  {
    id: 5,
    user_id: 103,
    user_name: "Алексей Смирнов",
    user_avatar: "https://example.com/avatar5.jpg",
    rating: {
      Cleanliness: 4.9,
      Accuracy: 4.9,
      Check_in: 5,
      Communication: 4.8,
      Location: 4.6,
      Value: 4.8,
    },
    comment: "Всё супер, кроме трудностей с парковкой.",
    created_at: "2025-07-03T08:00:00Z",
    images: [],
    responses: []

  },
  {
    id: 6,
    user_id: 104,
    user_name: "Марина Ли",
    user_avatar: "https://example.com/avatar6.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 5,
      Check_in: 5,
      Communication: 5,
      Location: 4.9,
      Value: 4.9,
    },
    comment: "Хозяйка очень гостеприимна! Рекомендую.",
    created_at: "2025-07-03T10:00:00Z",
    images: ["https://example.com/review6.jpg"],
    responses: []
  },
  {
    id: 7,
    user_id: 105,
    user_name: "Нурсултан Есимов",
    user_avatar: "https://example.com/avatar7.jpg",
    rating: {
      Cleanliness: 4.4,
      Accuracy: 4.6,
      Check_in: 4.7,
      Communication: 4.8,
      Location: 5,
      Value: 4.5,
    },
    comment: "Очень удобное расположение, но немного шумно ночью.",
    created_at: "2025-07-04T12:15:00Z",
    images: [],
    responses: []
  },
  {
    id: 8,
    user_id: 106,
    user_name: "Айгуль Нурсеитова",
    user_avatar: "https://example.com/avatar8.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 4.9,
      Check_in: 5,
      Communication: 5,
      Location: 4.8,
      Value: 4.7,
    },
    comment: "Все было отлично! Спасибо большое!",
    created_at: "2025-07-05T08:45:00Z",
    images: [],
    responses: []
  },
  {
    id: 9,
    user_id: 107,
    user_name: "Владимир Ким",
    user_avatar: "https://example.com/avatar9.jpg",
    rating: {
      Cleanliness: 4.8,
      Accuracy: 4.8,
      Check_in: 4.9,
      Communication: 4.8,
      Location: 5,
      Value: 4.6,
    },
    comment: "Красивое место, рядом много кафе и магазинов.",
    created_at: "2025-07-06T13:30:00Z",
    images: [],
    responses: []
  },
  {
    id: 10,
    user_id: 108,
    user_name: "Галина Ткаченко",
    user_avatar: "https://example.com/avatar10.jpg",
    rating: {
      Cleanliness: 4.9,
      Accuracy: 5,
      Check_in: 5,
      Communication: 5,
      Location: 5,
      Value: 5,
    },
    comment: "10 из 10! Обязательно вернусь!",
    created_at: "2025-07-06T18:00:00Z",
    images: ["https://example.com/review10.jpg"],
    responses: []
  },
  {
    id: 11,
    user_id: 109,
    user_name: "Бекзат Кайратулы",
    user_avatar: "https://example.com/avatar11.jpg",
    rating: {
      Cleanliness: 4.5,
      Accuracy: 4.7,
      Check_in: 4.6,
      Communication: 5,
      Location: 4.9,
      Value: 4.4,
    },
    comment: "Хорошее жилье, но хотелось бы чуть лучше чистоту.",
    created_at: "2025-07-07T07:30:00Z",
    images: [],
    responses: []
  },
  {
    id: 12,
    user_id: 110,
    user_name: "Раяна Мусаева",
    user_avatar: "https://example.com/avatar12.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 4.9,
      Check_in: 4.9,
      Communication: 5,
      Location: 4.7,
      Value: 4.8,
    },
    comment: "Очень уютно и атмосферно!",
    created_at: "2025-07-07T09:00:00Z",
    images: [],
    responses: []
  },
  {
    id: 13,
    user_id: 111,
    user_name: "Канат Нурланулы",
    user_avatar: "https://example.com/avatar13.jpg",
    rating: {
      Cleanliness: 4.6,
      Accuracy: 4.6,
      Check_in: 4.8,
      Communication: 4.9,
      Location: 4.5,
      Value: 4.3,
    },
    comment: "Немного старый ремонт, но в целом хорошо.",
    created_at: "2025-07-07T12:00:00Z",
    images: [],
    responses: []
  },
  {
    id: 14,
    user_id: 112,
    user_name: "Сергей Павлов",
    user_avatar: "https://example.com/avatar14.jpg",
    rating: {
      Cleanliness: 5,
      Accuracy: 5,
      Check_in: 5,
      Communication: 5,
      Location: 5,
      Value: 5,
    },
    comment: "Просто идеальное место! Спасибо!",
    created_at: "2025-07-07T15:45:00Z",
    images: [],
    responses: []
  },
  {
    id: 15,
    user_id: 113,
    user_name: "Асель Мырзабаева",
    user_avatar: "https://example.com/avatar15.jpg",
    rating: {
      Cleanliness: 4.7,
      Accuracy: 4.6,
      Check_in: 5,
      Communication: 5,
      Location: 4.8,
      Value: 4.6,
    },
    comment: "Подходит для семейного отдыха. Рядом тихо.",
    created_at: "2025-07-07T19:10:00Z",
    images: [],
    responses: []
  },
  {
    id: 16,
    user_id: 114,
    user_name: "Екатерина Орлова",
    user_avatar: "https://example.com/avatar16.jpg",
    rating: {
      Cleanliness: 4.9,
      Accuracy: 5,
      Check_in: 4.9,
      Communication: 5,
      Location: 5,
      Value: 4.8,
    },
    comment: "Очень понравилось! Всё как на фото.",
    created_at: "2025-07-08T10:30:00Z",
    images: [],
    responses: []
  },
  {
    id: 17,
    user_id: 115,
    user_name: "Женисбек Ерболов",
    user_avatar: "https://example.com/avatar17.jpg",
    rating: {
      Cleanliness: 4.8,
      Accuracy: 4.9,
      Check_in: 5,
      Communication: 4.8,
      Location: 4.9,
      Value: 4.7,
    },
    comment: "Всё очень удобно, особенно понравилась терраса.",
    created_at: "2025-07-08T14:00:00Z",
    images: ["https://example.com/review17.jpg"],
    responses: []
  }
];



export enum RoomType {
  Bedroom = "Bedroom",
  LivingRoom = "Living Room",
  ChildrenRoom = "Children's Room",
  HomeOffice = "Home Office",
  GuestRoom = "Guest Room",
  TeenRoom = "Teen Room",
  Kitchen = "Kitchen",
  DiningRoom = "Dining Room",
  KitchenIsland = "Kitchen Island",
  Bathroom = "Bathroom",
  Toilet = "Toilet",
  ShowerRoom = "Shower Room",
  Laundry = "Laundry",
  WalkInCloset = "Walk-in Closet",
  Entryway = "Entryway",
  Balcony = "Balcony",
  Terrace = "Terrace",
  Attic = "Attic",
  Basement = "Basement",
  BoilerRoom = "Boiler Room",
  StorageRoom = "Storage Room",
  Garage = "Garage",
  Yard = "Yard",
  Garden = "Garden",
  SwimmingPool = "Swimming Pool",
  Sauna = "Sauna",
  Gazebo = "Gazebo"
}

export const groupedAmenitiesArray = [
  {
    id: 1,
    title: "Ванная комната",
    items: [
      { id: 1, amenity_id: 101, title: "Душ / ванна", icon: Bath, description: "Современная ванная комната." },
      { id: 2, amenity_id: 102, title: "Фен", icon: Wind, description: "Фен для сушки волос." },
      { id: 3, amenity_id: 103, title: "Стиральная машина", icon: WashingMachine, description: "Предоставляются банные и для рук." },
      { id: 4, amenity_id: 104, title: "Горячая вода", icon: Droplet, description: "Круглосуточная подача." },
      { id: 5, amenity_id: 105, title: "Сауна / баня", icon: ShowerHead, description: "Парилка для отдыха." },
    ],
  },
  {
    id: 2,
    title: "Кухня",
    items: [
      { id: 1, amenity_id: 201, title: "Сушильная машина", icon: WashingMachine, description: "Полностью оборудованная кухня." },
      { id: 2, amenity_id: 202, title: "Микроволновка", icon: Microwave, description: "Для разогрева и готовки." },
      { id: 3, amenity_id: 203, title: "Холодильник", icon: Refrigerator, description: "С морозильной камерой." },
      { id: 4, amenity_id: 204, title: "Чайник", icon: Coffee, description: "Электрический чайник." },
      { id: 5, amenity_id: 205, title: "Кофемашина", icon: Coffee, description: "Для приготовления кофе." },
      { id: 6, amenity_id: 206, title: "Посудомоечная машина", icon: WashingMachine, description: "Мойка посуды без усилий." },
      { id: 7, amenity_id: 207, title: "Посуда и столовые приборы", icon: Bandage, description: "Тарелки, ложки, вилки и пр." },
    ],
  },
  {
    id: 3,
    title: "Спальня",
    items: [
      { id: 1, amenity_id: 301, title: "Постельное бельё", icon: Bed, description: "Свежие комплекты для гостей." },
      { id: 2, amenity_id: 302, title: "Затемнённые шторы", icon: Blinds, description: "Для комфортного сна и приватности." },
    ],
  },
  {
    id: 4,
    title: "Гостиная",
    items: [
      { id: 1, amenity_id: 401, title: "Телевизор", icon: Tv, description: "С кабельными или Smart-TV функциями." },
      { id: 2, amenity_id: 402, title: "Рабочее место", icon: Proportions, description: "Стол и стул для удалённой работы." },
      { id: 3, amenity_id: 403, title: "Камин", icon: FlameKindling, description: "Живой огонь и уют в доме (где есть)." },
      { id: 4, amenity_id: 404, title: "Утюг", icon: Anvil, description: "С гладильной доской." },
    ],
  },
  {
    id: 5,
    title: "На улице",
    items: [
      { id: 1, amenity_id: 501, title: "Балкон / терраса", icon: House, description: "Место для отдыха на свежем воздухе." },
      { id: 2, amenity_id: 502, title: "Двор / участок", icon: Fence, description: "Пространство вокруг дома." },
      { id: 3, amenity_id: 503, title: "Парковка", icon: Car, description: "Бесплатная парковка на территории или рядом." },
      { id: 4, amenity_id: 504, title: "Мангал / барбекю", icon: Flame, description: "Для приготовления еды на открытом воздухе." },
      { id: 5, amenity_id: 505, title: "Бассейн", icon: WavesLadder, description: "Открытый или крытый бассейн." },
      { id: 6, amenity_id: 506, title: "Детская площадка", icon: Columns2, description: "Для игр с детьми." },
    ],
  },
  {
    id: 6,
    title: "Технологии",
    items: [
      { id: 1, amenity_id: 601, title: "Wi-Fi", icon: Wifi, description: "Быстрый беспроводной интернет." },
      { id: 2, amenity_id: 602, title: "Кондиционер", icon: AirVent, description: "Охлаждение воздуха летом." },
      { id: 3, amenity_id: 603, title: "Отопление", icon: ThermometerSun, description: "Центральное или индивидуальное." },
      { id: 5, amenity_id: 605, title: "ТВ-приставка", icon: Inbox, description: "Netflix, YouTube и т.п." },
    ],
  },
  {
    id: 7,
    title: "Безопасность",
    items: [
      { id: 1, amenity_id: 701, title: "Видеонаблюдение / охрана", icon: Camera, description: "Безопасность на территории." },
    ],
  },
  {
    id: 8,
    title: "Другое",
    items: [
      { id: 1, amenity_id: 801, title: "Домашние животные разрешены", icon: Dog, description: "Можно с питомцами." },
      { id: 2, amenity_id: 802, title: "Курение разрешено", icon: Cigarette, description: "В определённых зонах." },
      { id: 3, amenity_id: 803, title: "Детская кроватка", icon: Baby, description: "По запросу для малышей." },
    ],
  },
];



type Room = { 
  id: number,
  images: string[],
  title: string,
}

type Amenity = {
  title: string,
  amenity_id: number,
  id: number
}


export interface CardItem{
  rooms: Room[],
  place: string;
  description: string;
  date: string;
  price: number;
  rating: {
    Cleanliness: number,
    Accuracy: number,
    Check_in: number,
    Communication: number,
    Location: number,
    Value: number
  },
  total_rating: number,
  id: number;
  coordinates: {lat: number, lng: number},
  condition?: MarkerCondition;
  owner_id: number,
  reviews: number[],
  amenities: number[],
  settings: {
    maxGuest: number,
    minDayOrder: number,
    havePet: boolean
  }
};


interface State{
    cardList: CardItem[],
    updateCardCondition: (id: number, condition: MarkerCondition) => void,
}

const images =  [
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/1479b1a0-ee19-49a6-94e4-3c43049776c0.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/3ac04d3f-b4f5-4d01-8258-8083979c792e.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/cd0c1eba-74bd-4d6b-9ec3-20c6dd8b5226.jpeg?im_w=720&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
];

export const useCardListStore = create<State>((set) => ({
   cardList : [
  {
    id: 1,
    place: "Алматы (Казахстан)",
    description: "Современная квартира в центре города",
    date: "1-5 августа",
    price: 15000,
    rating: {
      Cleanliness: 5,
      Accuracy: 4.8,
      Check_in: 4.9,
      Communication: 5,
      Location: 4.7,
      Value: 4.8,
    },
    total_rating: 5,
    coordinates: { lat: 43.2389, lng: 76.8897 },
    owner_id: 101,
    reviews: [1, 2, 3, 4, 5, 6, 7],
    rooms: [{ id: 1, title: "Спальня", images: images }],
    amenities: [
      101, 102, 103, 301, 401
    ],
    settings: {
      maxGuest: 3,
      minDayOrder: 2,
      havePet: false,
    },
  },
  {
    id: 2,
    place: "Тбилиси (Грузия)",
    description: "Уютный домик с видом на старый город",
    date: "10-15 июля",
    price: 18000,
    rating: {
      Cleanliness: 4.7,
      Accuracy: 4.8,
      Check_in: 5,
      Communication: 4.9,
      Location: 5,
      Value: 4.6,
    },
    total_rating: 4.83,
    coordinates: { lat: 41.7151, lng: 44.8271 },
    owner_id: 102,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [
      { id: 2, title: "Гостиная", images: images },
      { id: 3, title: "Кухня", images: images },
    ],
    amenities: [
      103, 104
    ],
    settings: {
      maxGuest: 4,
      minDayOrder: 3,
      havePet: true,
    },
  },
  {
    id: 3,
    place: "Бали (Индонезия)",
    description: "Вилла у океана с бассейном",
    date: "3-8 сентября",
    price: 30000,
    rating: {
      Cleanliness: 4.9,
      Accuracy: 4.8,
      Check_in: 4.7,
      Communication: 5,
      Location: 5,
      Value: 4.9,
    },
    total_rating: 4.88,
    coordinates: { lat: -8.4095, lng: 115.1889 },
    owner_id: 103,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [
      { id: 4, title: "Спальня 1", images: images },
      { id: 5, title: "Спальня 2", images: images },
      { id: 6, title: "Ванная", images: images },
    ],
    amenities: [
      105, 102, 101, 201, 202
    ],
    settings: {
      maxGuest: 6,
      minDayOrder: 5,
      havePet: true,
    },
  },
  {
    id: 4,
    place: "Париж (Франция)",
    description: "Лофт с видом на Эйфелеву башню",
    date: "5-10 октября",
    price: 45000,
    rating: {
      Cleanliness: 5,
      Accuracy: 4.9,
      Check_in: 4.8,
      Communication: 5,
      Location: 5,
      Value: 4.7,
    },
    total_rating: 4.9,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    owner_id: 104,
    reviews: [6],
    rooms: [
      { id: 7, title: "Спальня", images: images },
      { id: 8, title: "Гостиная", images: images },
    ],
    amenities: [
     801 ,104, 102
    ],
    settings: {
      maxGuest: 2,
      minDayOrder: 1,
      havePet: false,
    },
  },
  {
    id: 5,
    place: "Барселона (Испания)",
    description: "Апартаменты в готическом квартале",
    date: "15-20 августа",
    price: 28000,
    rating: {
      Cleanliness: 4.6,
      Accuracy: 4.5,
      Check_in: 4.7,
      Communication: 4.8,
      Location: 5,
      Value: 4.4,
    },
    total_rating: 4.67,
    coordinates: { lat: 41.3851, lng: 2.1734 },
    owner_id: 105,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [{ id: 9, title: "Кухня", images: images }],
    amenities: [
      105, 201, 301, 401, 803
    ],
    settings: {
      maxGuest: 3,
      minDayOrder: 2,
      havePet: true,
    },
  },
  {
    id: 6,
    place: "Киото (Япония)",
    description: "Традиционный рёкан с садом",
    date: "10-14 апреля",
    price: 26000,
    rating: {
      Cleanliness: 5,
      Accuracy: 4.9,
      Check_in: 4.9,
      Communication: 4.8,
      Location: 4.6,
      Value: 4.7,
    },
    total_rating: 4.82,
    coordinates: { lat: 35.0116, lng: 135.7681 },
    owner_id: 106,
    reviews: [7],
    rooms: [
      { id: 10, title: "Комната с татами", images: images },
    ],
    amenities: [
      105, 201, 301, 401, 803
    ],
    settings: {
      maxGuest: 2,
      minDayOrder: 2,
      havePet: false,
    },
  },
  {
    id: 7,
    place: "Берлин (Германия)",
    description: "Минималистичная студия в центре",
    date: "8-13 июня",
    price: 19000,
    rating: {
      Cleanliness: 4.5,
      Accuracy: 4.4,
      Check_in: 4.9,
      Communication: 5,
      Location: 5,
      Value: 4.3,
    },
    total_rating: 4.68,
    coordinates: { lat: 52.52, lng: 13.405 },
    owner_id: 107,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [
      { id: 11, title: "Студия", images: images },
    ],
    amenities: [
          105, 201, 301, 401, 803
    ],
    settings: {
      maxGuest: 2,
      minDayOrder: 2,
      havePet: false,
    },
  },
  {
    id: 8,
    place: "Прага (Чехия)",
    description: "Квартира с балконом и видом на замок",
    date: "20-26 июня",
    price: 17000,
    rating: {
      Cleanliness: 4.7,
      Accuracy: 4.6,
      Check_in: 4.8,
      Communication: 5,
      Location: 5,
      Value: 4.5,
    },
    total_rating: 4.76,
    coordinates: { lat: 50.0755, lng: 14.4378 },
    owner_id: 108,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [{ id: 12, title: "Спальня", images: images }],
    amenities: [
            105, 201, 301, 401, 803
    ],
    settings: {
      maxGuest: 3,
      minDayOrder: 1,
      havePet: false,
    },
  },
  {
    id: 9,
    place: "Куала-Лумпур (Малайзия)",
    description: "Современные апартаменты с видом на город",
    date: "5-10 сентября",
    price: 25000,
    rating: {
      Cleanliness: 4.8,
      Accuracy: 4.8,
      Check_in: 4.9,
      Communication: 4.9,
      Location: 5,
      Value: 4.7,
    },
    total_rating: 4.85,
    coordinates: { lat: 3.139, lng: 101.6869 },
    owner_id: 109,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [{ id: 13, title: "Гостиная", images: images }],
    amenities: [
            105, 201, 301, 401, 803

    ],
    settings: {
      maxGuest: 2,
      minDayOrder: 2,
      havePet: true,
    },
  },
  {
    id: 10,
    place: "Лиссабон (Португалия)",
    description: "Квартира в историческом центре",
    date: "10-15 октября",
    price: 24000,
    rating: {
      Cleanliness: 4.9,
      Accuracy: 4.7,
      Check_in: 5,
      Communication: 5,
      Location: 4.9,
      Value: 4.8,
    },
    total_rating: 4.88,
    coordinates: { lat: 38.7169, lng: -9.1399 },
    owner_id: 110,
    reviews: [4, 5, 17, 14, 13, 11, 15],
    rooms: [{ id: 14, title: "Спальня", images: images }],
    amenities: [
            105, 201, 301, 401, 803
    ],
    settings: {
      maxGuest: 2,
      minDayOrder: 2,
      havePet: false,
    },
  },
  {
  id: 11,
  place: "Рим (Италия)",
  description: "Апартаменты рядом с Колизеем",
  date: "12-18 сентября",
  price: 27000,
  rating: {
    Cleanliness: 4.8,
    Accuracy: 4.7,
    Check_in: 4.9,
    Communication: 5,
    Location: 5,
    Value: 4.6,
  },
  total_rating: 4.83,
  coordinates: { lat: 41.9028, lng: 12.4964 },
  owner_id: 111,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 15, title: "Спальня", images }],
  amenities: [105, 201, 301],
  settings: { maxGuest: 3, minDayOrder: 2, havePet: true },
},
{
  id: 12,
  place: "Стамбул (Турция)",
  description: "Апартаменты с видом на Босфор",
  date: "1-7 августа",
  price: 20000,
  rating: {
    Cleanliness: 4.6,
    Accuracy: 4.7,
    Check_in: 4.8,
    Communication: 5,
    Location: 4.9,
    Value: 4.5,
  },
  total_rating: 4.75,
  coordinates: { lat: 41.0082, lng: 28.9784 },
  owner_id: 112,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 16, title: "Гостиная", images }],
  amenities: [102, 104, 401],
  settings: { maxGuest: 2, minDayOrder: 1, havePet: false },
},
{
  id: 13,
  place: "Нью-Йорк (США)",
  description: "Современные апартаменты в Манхэттене",
  date: "22-28 ноября",
  price: 50000,
  rating: {
    Cleanliness: 5,
    Accuracy: 4.9,
    Check_in: 5,
    Communication: 5,
    Location: 5,
    Value: 4.8,
  },
  total_rating: 4.95,
  coordinates: { lat: 40.7128, lng: -74.006 },
  owner_id: 113,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 17, title: "Студия", images }],
  amenities: [105, 201, 301, 401],
  settings: { maxGuest: 2, minDayOrder: 3, havePet: false },
},
{
  id: 14,
  place: "Дубай (ОАЭ)",
  description: "Небоскреб с панорамными окнами",
  date: "5-12 декабря",
  price: 60000,
  rating: {
    Cleanliness: 4.9,
    Accuracy: 4.8,
    Check_in: 5,
    Communication: 4.9,
    Location: 5,
    Value: 4.7,
  },
  total_rating: 4.9,
  coordinates: { lat: 25.2048, lng: 55.2708 },
  owner_id: 114,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 18, title: "Спальня", images }],
  amenities: [105, 102, 801],
  settings: { maxGuest: 3, minDayOrder: 2, havePet: false },
},
{
  id: 15,
  place: "Кейптаун (ЮАР)",
  description: "Дом у подножия Столовой горы",
  date: "3-9 марта",
  price: 22000,
  rating: {
    Cleanliness: 4.8,
    Accuracy: 4.6,
    Check_in: 4.9,
    Communication: 4.7,
    Location: 5,
    Value: 4.4,
  },
  total_rating: 4.73,
  coordinates: { lat: -33.9249, lng: 18.4241 },
  owner_id: 115,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 19, title: "Гостиная", images }],
  amenities: [105, 202, 803],
  settings: { maxGuest: 4, minDayOrder: 2, havePet: true },
},
{
  id: 16,
  place: "Ванкувер (Канада)",
  description: "Квартира в зелёном районе рядом с лесом",
  date: "15-20 апреля",
  price: 26000,
  rating: {
    Cleanliness: 5,
    Accuracy: 4.9,
    Check_in: 4.8,
    Communication: 4.9,
    Location: 4.9,
    Value: 4.6,
  },
  total_rating: 4.87,
  coordinates: { lat: 49.2827, lng: -123.1207 },
  owner_id: 116,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 20, title: "Спальня", images }],
  amenities: [105, 104, 102, 803],
  settings: { maxGuest: 2, minDayOrder: 1, havePet: false },
},
{
  id: 17,
  place: "Осло (Норвегия)",
  description: "Минималистичная квартира у озера",
  date: "12-18 мая",
  price: 24000,
  rating: {
    Cleanliness: 4.7,
    Accuracy: 4.6,
    Check_in: 5,
    Communication: 5,
    Location: 4.8,
    Value: 4.5,
  },
  total_rating: 4.77,
  coordinates: { lat: 59.9139, lng: 10.7522 },
  owner_id: 117,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 21, title: "Студия", images }],
  amenities: [101, 102, 104, 803],
  settings: { maxGuest: 2, minDayOrder: 2, havePet: true },
},
{
  id: 18,
  place: "Сеул (Южная Корея)",
  description: "Апартаменты в модном районе Хондэ",
  date: "5-11 ноября",
  price: 27000,
  rating: {
    Cleanliness: 4.9,
    Accuracy: 4.9,
    Check_in: 5,
    Communication: 4.9,
    Location: 5,
    Value: 4.6,
  },
  total_rating: 4.9,
  coordinates: { lat: 37.5665, lng: 126.978 },
  owner_id: 118,
  reviews: [4, 5, 17, 14, 13, 11, 15],
  rooms: [{ id: 22, title: "Гостиная", images }],
  amenities: [105, 104, 102, 201],
  settings: { maxGuest: 3, minDayOrder: 3, havePet: false },
},

]
,
  updateCardCondition(id, condition) {
    set((state) => ({
      cardList: state.cardList.map((card) =>
        card.id === id ? { ...card, condition } : card
      ),
    }));
  }
  
    
  }));