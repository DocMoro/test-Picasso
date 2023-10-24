import './PostsList.scss';

import { useState, useEffect, useCallback } from 'react';

import { getPosts } from '../../api/playseholder/playseholer';

import CardPost from '../../../../features/CardPost/components/CardPost/CardPost';
import Preloader from '../../../../features/Preloader/components/Preloader/Preloader';

export default function PostsList() {
  const [ posts, setPosts ] = useState([]);
  const [ isLoader, setIsLoader ] = useState(true);
  const [ postsLength, setPostsLength ] = useState(20);
  const [ format, setFormat ] = useState(0);

  const renderPosts = useCallback(async () => {
    const { hasError, data } = await getPosts();

    if (!hasError && data) {
      setPosts(data);
    }
    setIsLoader(false);
  }, []);

  useEffect(() => {
    function handleResize() {
      const width = document.documentElement.clientWidth;

      let length = 25;
  
      if(width < 630) {
        length = 5;
      } else 
        if(width < 930) {
          length = 10;
        } else 
          if(width < 1280) {
            length = 20;
          }

      setFormat(length)
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const screen = document.scrollingElement;

    if (screen && posts.length > postsLength) {
      const exeEventScroll = () => {
        if (2 * screen.clientHeight + screen.scrollTop >= screen.scrollHeight) {
          setPostsLength(postsLength + format);
        }
      };

      window.addEventListener("scroll", exeEventScroll);

      return () => {
        window.removeEventListener("scroll", exeEventScroll);
      };
    }
  }, [posts, postsLength, format]);

  useEffect(() => {
    renderPosts();
  }, [renderPosts]);

  return (
    <section className='posts'>
      {isLoader
        ? <Preloader />
        : <ul className='posts__list'>
            {posts.slice(0, postsLength).map((post) => (
              <CardPost post={post} key={post.id}/>
            ))}
          </ul>
      }
    </section>
  )
}