import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PostSkeleton from "@/components/Post/Loading"
import CategoriesSkeleton from "@/components/Categories/Loading";

function Loading() {
  return (
    <div className="h-full w-full">
    <Header />
    <CategoriesSkeleton />
    <div className="xl:px-88 lg:px-28 md:px-12 px-4">
      <div className="w-full">
        <h1 className="text-base pt-4">If you're looking for secret background information to Google Search, you've come to the wrong place.</h1>
        <PostSkeleton/>
        <PostSkeleton/>
        <PostSkeleton/>
        <PostSkeleton/>
        <PostSkeleton/>
      </div>
      <Footer />
    </div>
  </div>
  )
}

export default Loading

