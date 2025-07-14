import * as R from '@readStory/ReadStoryStyle';
import StorySplash from '@components/StorySplash/StorySplash';
import { useState } from 'react';

const ReadStory = () => {
  const [showSplash, setShowSplash] = useState(true);
  return <>{showSplash && <StorySplash setShowSplash={setShowSplash} />}</>;
};

export default ReadStory;
