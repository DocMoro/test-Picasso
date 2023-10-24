import './Post.scss';

export default function Post({ post }) {
  const { id, title, body } = post;

     /* const handleClickCreate = useCallback(() => {
    const { id, title, body } = post;

    cbButton({ 
      country,
      director,
      duration,
      year,
      description,
      thumbnail: `https://api.nomoreparties.co/${image.url}`,
      movieId: id,
      image: `https://api.nomoreparties.co/${image.url}`,
      trailer: trailerLink,
      nameRU,
      nameEN
    })
      .then(() => {
        setIsLiked(true);
      })
      .catch(err => console.log(err));
  }, [card, cbButton, duration, image, nameRU, trailerLink])

  const handleClickDelete = useCallback(() => {
    cbButton(card)
      .then(() => {
        setIsLiked(false);
      })
      .catch(err => console.log(err));
  }, [cbButton, card])

  */

  return (
    <>
      <div className='post__container'>
        <h3 className='post__title'>{title}</h3>
        <p>{id}</p>
      </div>
      <p className='post__duration'>{body}</p>
    </>
  )
}