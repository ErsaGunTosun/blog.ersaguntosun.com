import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PanelSkeleton from "@/components/Panel/loading";

function Loading() {
  return (
    <div className="h-full w-full">
    <Header />
    <PanelSkeleton />
    <div className="xl:px-88 lg:px-28 md:px-12 px-4">
      <div className="w-full">
    
      </div>
      <Footer />
    </div>
  </div>
  )
}

export default Loading

