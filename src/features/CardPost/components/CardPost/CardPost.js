import './CardPost.scss';

import Post from "../../../../entites/Post/components/Post/Post";
import ButtonCard from "../../../../shared/ButtonCard/ButtonCard";

export default function CardPost({ post }) {
  const { id } = post;

  return (
    <li className={`card-post ${id % 2 ? 'card-post_color_greey' : 'card-post_color_black'}`}>
      <Post post={post} />
      <ButtonCard id={id} />
    </li>
  );
}