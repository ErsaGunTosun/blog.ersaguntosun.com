import Categories from "@/components/Categories/Categories"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { MarkdownViewer } from "@/components/Editor/Editor"

//API
import { GetPost, GetCategoriesWithID } from "@/utils/blogFunc"

export default async function PostPage({ params }) {
  let post = await GetPost(params.id);
  let categories = await GetCategoriesWithID(params.id);
  const date = new Date(post.data.created_at);

  return (
    <div className="h-full w-full">
      <Categories />
      <Header />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="post my-12 pb-10">

          <a href={"posts/" + post.data.id} className="post-title text-3xl font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
            {post.data.title}
          </a>
          <p>
            {date.toDateString()}
            {
              categories.data?.map(item => {
                return <span key={item?.id} className="category"> · {item?.name} </span>
              })
            }
          </p>
          <div className="mt-5">
            <MarkdownViewer content={post.data.content} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
