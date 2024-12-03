import React, { Suspense } from "react";
import Post from "./Post/Post";
import PostSkeleton from "./Post/Loading";

export default function PostWrapper({ post, border }) {
  return (
    <Suspense fallback={<div> <PostSkeleton/></div>}>
      <Post post={post} border={border} />
    </Suspense>
  );
}
