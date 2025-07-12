import * as A from '@ai/AiStyle';
import * as H from '@home/HomeStyle';
import SkeletonUi from '../../components/SkeletonUi/SkeletonUi';
import { useLocation } from 'react-router-dom';

const Ai = () => {
  const location = useLocation();
  const selectedImg = location.state?.selectedImg.thumbnail;

  if (!selectedImg) return null;

  return (
    <>
      <SkeletonUi selectedImg={selectedImg} />
    </>
  );
};

export default Ai;
