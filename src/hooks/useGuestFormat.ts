import { guestData } from "@/store/search-datas";

type Props = {
  guestData: guestData,
}
export const useGuestFormat = ({guestData}: Props) => {
  const quests = guestData.adults + guestData.children;
  const questString = quests === 1 ? '1 guest' : quests > 0 ? `${quests} guests` : '';
  const infantString = guestData.infants === 1 ? '1 infant' : guestData.infants > 0 ? `${guestData.infants} infants` : '';
  const petString = guestData.pets === 1 ? '1 pet' : guestData.pets > 0 ? `${guestData.pets} pets` : '';

  return [questString, infantString, petString].filter(Boolean).join(', ');
};