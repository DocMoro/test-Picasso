import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ButtonCard({ id }) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/posts/${id}`);
  }, [navigate, id]);

  return (
    <button type="button" onClick={handleClick}>Просмотр</button>
  )
}