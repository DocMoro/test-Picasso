import './PostsList.scss';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getPosts } from '../../api/playseholder/playseholer';
import CardPost from '../../../../features/CardPost/components/CardPost/CardPost';

export default function PostsList() {
  const [currentStart, setCurrentStart] = useState(0);
  const [isMyFetchingDown, setIsMyFetchingDown] = useState(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState(false);
  const {data: posts} = useQuery(
    ['posts', currentStart], 
    () => getPosts(currentStart, 10),
    {
      keepPreviousData: true,
    }
  );

  const scrollHandler = e => {
    const element = e.target.documentElement

    if(element.scrollTop < 200) {
      setIsMyFetchingUp(true);
    }
    if(element.scrollHeight - element.scrollTop - window.innerHeight < 100) {
      setIsMyFetchingDown(true);
      window.scrollTo(0, element.scrollHeight + element.scrollTop);
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  useEffect(() => {
    if(isMyFetchingDown) {
      setCurrentStart(prev => (
        prev < 90 ? prev + 1 : prev
      ))
      setIsMyFetchingDown(false);
    }
  }, [isMyFetchingDown]);

  useEffect(() => {
    if(isMyFetchingUp) {
      setCurrentStart(prev => (
        prev > 0 ? prev - 1 : prev
      ))
      setIsMyFetchingUp(false);
    }
  }, [isMyFetchingUp]);

  return (
    <div className='posts'>
      <ul className='posts__list'>
        {posts?.map(post => 
          <CardPost post={post} key={post.id} />
        )}
      </ul>
    </div>
  )
}