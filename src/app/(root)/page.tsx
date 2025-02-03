
import Card from "@/shared/components/card";
import Container from "@/shared/components/container";
import TopPart from "@/shared/components/top-part";

export default function Home() {
  return (
    <>
    <TopPart/>
    <section>
      <Container>
        <div className="grid grid-cols-4 gap-6">
          <Card/>

        </div>
      </Container>
    </section>
    </>
  );
}
