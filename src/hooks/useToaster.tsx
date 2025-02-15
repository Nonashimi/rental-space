import { useEffect } from 'react';
import { toast, Toast } from 'react-hot-toast';
import { useCardListStore } from '@/store/cards';
import { TypeOfToaster, useFavoritesStore } from '@/store/favorites';
import ToastCustom from '@/shared/ui/toast-custom';

export const useToaster = () => {
  const favBlockList = useFavoritesStore().favBlockList;
  const cards = useCardListStore();
  const lastEditList = useFavoritesStore().lastEditList;
  const currentCard = useFavoritesStore().currentCard;
  const toaster = useFavoritesStore().toaster;
  const { setToaster } = useFavoritesStore();
  const { openAddModal } = useFavoritesStore(); 

  useEffect(() => {
    if (toaster === TypeOfToaster.noneOfThem) return;

    let title = favBlockList.find(el => el.id === lastEditList)?.title;
    let image = cards.cardList.find(el => el.id === currentCard)?.images[0];

    switch (toaster) {
      case TypeOfToaster.ItemAddedOrChanged:
        toast.custom((t: Toast) => (
          <ToastCustom t={t} title={title} image={image} clickBtn={openAddModal} />
        ));
        break;
      case TypeOfToaster.ItemDeleted:
        toast.custom((t: Toast) => (
          <ToastCustom t={t} title={title} image={image} type={TypeOfToaster.ItemDeleted} />
        ));
        break;
    }

    setToaster(TypeOfToaster.noneOfThem);
  }, [toaster, setToaster, favBlockList, lastEditList, cards.cardList, currentCard, openAddModal]);
};
