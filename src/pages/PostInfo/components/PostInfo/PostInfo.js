import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import Post from "../../../../entites/Post/components/Post/Post";
import ButtonBack from "../../../../shared/ButtonBack/ButtonBack";
import { getPost } from "../api/playseholder/playseholer";

export default function PostInfo() {
  const [ post, setPost ] = useState({});
  const { postID }  = useParams();

  const renderPost = useCallback(async () => {
    const { hasError, data } = await getPost({ postID });

    if (!hasError && data) {
      setPost(data);
    }
  }, [postID]);

  useEffect(() => {
    renderPost();
  }, [renderPost]);

  return (
    <main>
      <Post post={post} />
      <ButtonBack />
    </main>
  )
}