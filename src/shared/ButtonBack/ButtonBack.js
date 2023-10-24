import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ButtonBack() {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <button type="button" onClick={handleClick}>Назад</button>
  )
}