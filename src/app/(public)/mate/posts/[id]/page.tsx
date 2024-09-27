"use client";

import DetailMatePost from "../_components/detailMatePost";
import LoadingComponent from "@/components/loadingComponents/Loading";
import { useMatePost } from "@/hooks/useMatePost";

const MatePost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { post, isPending, error} = useMatePost(id);

  if (!post) {
    return;
  }

  if (isPending) {
    <div className="mt-[30%] flex h-full w-full items-center justify-center">
      <LoadingComponent />
    </div>
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-[420px]">
      <DetailMatePost post={post} />
    </div>
  );
};

export default MatePost;
