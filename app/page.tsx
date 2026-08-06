import Image from "next/image";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { InboxScreenPreview } from "@/components/home/InboxScreenPreview";
import { ExtractionProvider } from "@/components/extraction/ExtractionProvider";

export default function Home() {
  return (
    <ExtractionProvider>
      <div className="relative h-screen w-full overflow-hidden bg-[#090e24]">
        <div className="absolute top-[-250px] right-[-300px] h-[170vh] w-1/2">
          <Image
            src="/images/shiningLines.png"
            alt="Description"
            fill
            className="rotating-image object-cover object-center"
          />
        </div>

        <div className="absolute bottom-[-100px] left-[-300px] h-[70vh] w-1/2">
          <Image
            src="/images/shiningLines.png"
            alt="Description"
            fill
            className="rotating-image object-cover object-center"
          />
        </div>
        <LoadingScreen />
      </div>

      <section className="flex flex-col items-center gap-3 relative top-[-100px] z-10">
        <div className=" w-full px-6">
          <InboxScreenPreview />
        </div>
      </section>
    </ExtractionProvider>
  );
}
