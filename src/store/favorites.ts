import { create } from 'zustand';

const favBlocks: FavBlock[] = [
  {
    id: 1,
    title: "Избранные фильмы",
    favoriteItems: [1, 4, 5],
  },
  {
    id: 2,
    title: "Любимые книги",
    favoriteItems: [6, 7],
  },
  {
    id: 3,
    title: "Любимый спорт",
    favoriteItems: [9],
  },
];


export enum TypeOfToaster{
  ItemDeleted = "ItemDeleted",
  ItemAddedOrChanged = "ItemAdded",
  noneOfThem = "noneOfThem",
}

export interface FavBlock {
    id: number;
    title: string;
    favoriteItems: number[];
  }

interface State{
    favBlockList: FavBlock[],
    lastEditList: number | null,
    currentCard: number | null,
    isAddModalOpen: boolean,
    isCreateModalOpen: boolean,
    deleteFromList: (id: number) => void,
    inFavList: (id: number) => boolean,
    clickToFav: (id: number) => void,
    chooseOneOfBlocks: (id: number) => void,
    createNewBlock: (title: string) => void,
    clickCreateButton: () => void,
    closeCreateModal: () => void,
    constFuctions: (id: number) => void,
    openAddModal: () => void,
    closeAddModal: () => void,
    openCreateModal: () => void,
    switchFromCreateToAdd: () => void,
    toaster: TypeOfToaster,
    setToaster: (toaster: TypeOfToaster) => void,
    deleteBlockFromList: (id: number) => void,

}

export const useFavoritesStore = create<State>((set, get) => ({
   favBlockList: favBlocks,
   lastEditList: null,
   currentCard: null,
   isAddModalOpen: false,
  isCreateModalOpen: false,
  toaster: TypeOfToaster.noneOfThem,
  setToaster(toaster: TypeOfToaster) {
    set(() => ({
      toaster: toaster 
    }));
  },

   deleteFromList: (id: number) => {
    set((state) => ({
        favBlockList: state.favBlockList.map((block) => {
          if (block.favoriteItems.some((item) => item === id)) {
            const updatedItems = block.favoriteItems;
            return { ...block, favoriteItems: updatedItems.filter((item) => item !== id) };
          }
          return block;
        }),
        lastEditList: state.favBlockList.find((block) => block.favoriteItems.some((item) => item === (id)))?.id || null,
        currentCard: null,
        toaster: TypeOfToaster.ItemDeleted
      }));
  },
  deleteBlockFromList: (id: number) => {
    set((state) => ({
        favBlockList: state.favBlockList.filter((block) => block.id !== id),
        lastEditList: state.favBlockList.find((block) => block.id === state.lastEditList)?.id || null,
      }));
  },

   inFavList: (id: number) => {
    return get().favBlockList.some((block) => block.favoriteItems.includes(id));
  },
   clickToFav:  (id: number) => {

    set(() => ({currentCard: id,}))

    if(get().favBlockList.length === 0){
        get().openCreateModal();
        return;
    }
    
    if (get().inFavList(id)) {
      get().deleteFromList(id);
    } else if (get().lastEditList === null){
        get().openAddModal();
    }else {
      set((state) => ({ 
          favBlockList: state.favBlockList.map((block) => {
            if (block.id === state.lastEditList) {
              return { ...block, favoriteItems: [...block.favoriteItems, id]};
            }
            return block;
          }),
          toaster: TypeOfToaster.ItemAddedOrChanged
        }));
    }
  },
   chooseOneOfBlocks: (id: number) => {
    const currentCard = get().currentCard;
    set(() => ({
      favBlockList: get().favBlockList.map((block) => {
        return {...block, favoriteItems: block.favoriteItems.filter((item) => item !== currentCard)};
      }),
    }))
    if (currentCard === null) return;
    set((state) => ({
        favBlockList: state.favBlockList.map((block) => {
          if (block.id === id) {
            return { ...block, favoriteItems: [...block.favoriteItems, currentCard] };
          }
          return block;
        }),
        toaster: TypeOfToaster.ItemAddedOrChanged,
    }));
    get().constFuctions(id);
  },
   createNewBlock: (title: string) => {
    set(() => ({
      favBlockList: get().favBlockList.map((block) => {
        return {...block, favoriteItems: block.favoriteItems.filter((item) => item !== get().currentCard)};
      }),
    }))
    const id = Math.max(...get().favBlockList.map(el => el.id), 0) + 1;
    set((state) => ({
        favBlockList: [...state.favBlockList, {
            id: id,
            title: title,
            favoriteItems: state.currentCard !== null ? [state.currentCard] : [],
        }],
        toaster: TypeOfToaster.ItemAddedOrChanged,
        lastEditList: id,
    }))
    get().closeCreateModal();
  },
  constFuctions: (id: number) => {  
    set(() => ({
        lastEditList: id,
    }))
    get().closeAddModal();
    },
    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
    openCreateModal: () => set({ isCreateModalOpen: true }),
    closeCreateModal: () => set({ isCreateModalOpen: false }),

  
    clickCreateButton: () => {
      set({ isAddModalOpen: false, isCreateModalOpen: true });
    },
    switchFromCreateToAdd: () => {
        if(get().favBlockList.length === 0){
            get().closeCreateModal();
            return;
        }
      set({ isCreateModalOpen: false, isAddModalOpen: true });
    }
  }));