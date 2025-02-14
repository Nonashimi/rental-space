import CardList from "@/shared/components/card-list";
import Container from "@/shared/components/container";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
    <section>
    <Toaster position="bottom-left" toastOptions={{ duration: 3000 }}/>
      <Container>
        <CardList/>
      </Container>
    </section>
    </>
  );
}
