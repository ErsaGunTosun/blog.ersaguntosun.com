import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Posts from "@/components/Posts";
import Post from "@/components/Post";
import PageNavigations from "@/components/PageNavigations";
import Footer from "@/components/Footer";

export default function pagePost({params}) {
  return (
    <div className="h-full w-full">
      <Categories />
      <Header />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="w-full">
          <h1 className="text-base pt-4">If you're looking for secret background information to Google Search, you've come to the wrong place.</h1>
          <Posts isPosts={true} page={params.id}/>
        </div>
        <Footer />
      </div>
    </div>
  );
}
