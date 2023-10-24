import './Post.scss';

export default function Post({ post }) {
  const { id, title, body } = post;

  return (
    <div className='post'>
      <div className='post__container'>
        <h3 className='post__title'>{title}</h3>
        <p>{id}</p>
      </div>
      <p className='post__duration'>{body}</p>
    </div>
  )
}