
import { OrderPage } from "@/shared/components/order-page";

type Props = {
  params: Promise<{ id: string }>
}

 async function Booking({params}: Props) {
  const roomId = (await params).id;
  return (
    <OrderPage roomId={Number(roomId)}/>
  );
}


export default Booking;
