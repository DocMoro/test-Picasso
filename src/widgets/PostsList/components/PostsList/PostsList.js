import './PostsList.scss';

import { FixedSizeList as List } from 'react-window';

import { getPosts } from '../../api/playseholder/playseholer';

import CardPost from '../../../../features/CardPost/components/CardPost/CardPost';
import InfiniteLoader from 'react-window-infinite-loader';

let posts = [];
let requestCache = {};

export default function PostsList() {
  const Row = ({ index, style }) => {
    const post = posts[index];
    return (
      <div style={style}>
        {post ? <CardPost post={post} /> : 'Loading...'}
      </div>
    )
  };

  const isItemLoaded = ({ index }) => !!posts[index];

  const loadMoreItems = async (visibleStartIndex, visibleStopIndex) => {
    const key = [visibleStartIndex, visibleStopIndex].join(':');
    if (requestCache[key]) {
      return;
    }

    const length = visibleStopIndex - visibleStartIndex;
    const visibleRange = [...Array(length).keys()].map(
      x => x + visibleStartIndex
    );
    const itemsRetrieved = visibleRange.every(index => !!posts[index]);

    if(itemsRetrieved) {
      requestCache[key] = key;
      return;
    }
    
    renderPage(visibleStartIndex);
  }

  const renderPage = async (visibleStartIndex) => {
    const { data, hasError } = await getPosts(20, Math.floor(visibleStartIndex / 10) + 1);

    if(data && !hasError) {
      data.forEach((data) => {
        posts[data.id - 1] = data;
      })
    }
  }

  return (
  <InfiniteLoader
    isItemLoaded={isItemLoaded}
    loadMoreItems={loadMoreItems}
    itemCount={100}
  >
    {({onItemsRendered, ref }) => (<List
      height={500}
      itemCount={100}
      itemSize={100}
      width={320}
      ref={ref}
      onItemsRendered={onItemsRendered}
    >
      {Row}
    </List>
    )}
  </InfiniteLoader>
  )
}