import Post from "../../../../entites/Post/components/Post/Post";
import ButtonCard from "../../../../shared/ButtonCard/ButtonCard";

export default function CardPost({ post }) {
  const { id } = post;

  return (
    <ul className='post'>
      <Post post={post} />
      <ButtonCard id={id} />
    </ul>
  );
}