import { Logo } from "../ui";
import Container from "./container";


export const BookHeader = () => {
  return <div className="">
    <Container className="py-3">
        <Logo className='w-[80px] lg:w-[100px]'/>
    </Container>
    <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
  </div>

};