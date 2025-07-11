import * as A from '@ai/AiStyle';
import * as H from '@home/HomeStyle';
import { useLocation } from 'react-router-dom';

const Ai = () => {
  const location = useLocation();
  const selectedImg = location.state?.selectedImg.thumbnail;

  if (!selectedImg) return null;

  return (
    <A.Ai>
      <H.UploadDiv>
        <H.SelectedImg>
          <img src={selectedImg} alt="사진 선택" />
          <A.Scan />
        </H.SelectedImg>
      </H.UploadDiv>

      <A.TextSkeleton>
        <A.Skeleton $width={206} $height={20} />
        <A.Skeleton $width={164} $height={40} />
      </A.TextSkeleton>

      <A.Wrapper>
        <A.TopSkeleton>
          <A.Skeleton $width={24} $height={24} />
          <A.Skeleton $height={22} $flex={1} />
        </A.TopSkeleton>

        <A.GridSkeleton>
          <A.Skeleton />
          <A.Skeleton />
          <A.Skeleton />
          <A.Skeleton />
        </A.GridSkeleton>
      </A.Wrapper>
    </A.Ai>
  );
};

export default Ai;
