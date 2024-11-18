function Post({post}) {
    return (
        <div className="post my-12 pb-10">
            <a href="posts/1234" className="post-title text-3xl font-bold hover:underline hover:underline-offset-8 hover:decoration-1 hover:decoration-dotted cursor-pointer">
                Midjourney / Discord to Lightroom automation - step by step - for 2023 {post.id}
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
            <a className="cursor-pointer underline underline-offset-4 decoration-1 decoration-dotted">
                Midjourney / Discord to Lightroom automation - step by step - for 2023 »
            </a>
        </div>
    )
}

export default Post