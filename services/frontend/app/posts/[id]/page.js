import Categories from "@/components/Categories"
import Content from "@/components/Content"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Posts({ params }) {
  return (
    <div className="h-full w-full">
      <Categories />
      <Content />
      <Header />
      <div className="xl:px-88 lg:px-28 md:px-12 px-4">
        <div className="post my-12 pb-10">

          <a href="posts/1234" className="post-title text-3xl font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
            Midjourney / Discord to Lightroom automation - step by step - for 2023
          </a>
          <p>
            2023-04-30 - Midjourney · Adobe · Python
          </p>
          <p className="my-6">
            Midjourney is fun, but the Discord-based interface is somewhat annoying,
            if you want to make a lot of images. To get all the images you generate, you have to upscale all 2x2 previews, and save them manually.
            It can get pretty tiring, so instead of making better images, I spent a bit of time to automate the download and import process. With this code,
            a Discord bot will monitor your server, watch for Midjourney messages, process all images, and upload them to your Lightroom CC cloud account.
          </p>
          <p>
            If you want to get started right away, the code is github.com/softplus/midjourney_lightroom
          </p>
          <p className="mt-5">
            This looks like a long post - it’s just a collection of many small steps.
            If you’ve run something from Github before, you can do it. All of this works under Ubuntu, I’m not bored enough to try it out in other operating systems. YMMV.
          </p>
          <p className="font-bold text-2xl my-5">
            Overview
          </p>
          <p>
            This is a step-by-step guide to setting up a Discord bot that will monitor your server for Midjourney messages, process all images, and upload them to your Lightroom CC cloud account.
          </p>
          <p>
            2023-04-30 - Midjourney · Adobe · Python
          </p>
          <p className="my-6">
            Midjourney is fun, but the Discord-based interface is somewhat annoying,
            if you want to make a lot of images. To get all the images you generate, you have to upscale all 2x2 previews, and save them manually.
            It can get pretty tiring, so instead of making better images, I spent a bit of time to automate the download and import process. With this code,
            a Discord bot will monitor your server, watch for Midjourney messages, process all images, and upload them to your Lightroom CC cloud account.
          </p>
          <p>
            If you want to get started right away, the code is github.com/softplus/midjourney_lightroom
          </p>
          <p className="mt-5">
            This looks like a long post - it’s just a collection of many small steps.
            If you’ve run something from Github before, you can do it. All of this works under Ubuntu, I’m not bored enough to try it out in other operating systems. YMMV.
          </p>
          <p className="font-bold text-2xl my-5">
            Overview
          </p>
          <p>
            This is a step-by-step guide to setting up a Discord bot that will monitor your server for Midjourney messages, process all images, and upload them to your Lightroom CC cloud account.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  )
}
