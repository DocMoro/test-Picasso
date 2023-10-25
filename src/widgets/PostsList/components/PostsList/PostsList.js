import './PostsList.scss';

import { useCallback, useEffect, useState } from 'react';

import { getPosts } from '../../api/playseholder/playseholer';
import CardPost from '../../../../features/CardPost/components/CardPost/CardPost';

export default function PostsList() {
  const [currentStart, setCurrentStart] = useState(0);
  const [isMyFetchingDown, setIsMyFetchingDown] = useState(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState(false);
  const [posts, setPosts] = useState([])

  console.log(posts)

  const scrollHandler = e => {
    const element = e.target.documentElement

    if(element.scrollTop < 150) {
      setIsMyFetchingUp(true);
    }
    if(element.scrollHeight - element.scrollTop - window.innerHeight < 100) {
      setIsMyFetchingDown(true);
      window.scrollTo(0, element.scrollHeight + element.scrollTop);
    }
  }

  const renderPosts = useCallback( async () => {
    const { data, hasError } = await getPosts(currentStart, 10);

    if(data && !hasError) {
      setPosts(data);
    }
  }, [currentStart]);

  useEffect( () => {
    renderPosts()
  }, [renderPosts]);

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
    <div>
      <ul className='post__list'>
        {posts?.map(post => 
          <CardPost post={post} key={post.id} />
        )}
      </ul>
    </div>
  )
}