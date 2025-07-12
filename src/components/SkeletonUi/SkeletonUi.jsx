import * as S from '@components/SkeletonUi/SkeletonUiStyle';
import * as H from '@home/HomeStyle';
import ToastMessage from '../common/ToastMessage/ToastMessage';

const SkeletonUi = () => {
  return (
    <S.SkeletonUi>
      <H.UploadDiv>
        <S.SelectedImg>
          <S.Scan />

          <S.Message>
            <ToastMessage text="스캔 중 ..." />
          </S.Message>
        </S.SelectedImg>
      </H.UploadDiv>

      <S.TextSkeleton>
        <S.Skeleton $width={206} $height={20} />
        <S.Skeleton $width={164} $height={40} />
      </S.TextSkeleton>

      <S.Wrapper>
        <S.TopSkeleton>
          <S.Skeleton $width={24} $height={24} />
          <S.Skeleton $height={22} $flex={1} />
        </S.TopSkeleton>

        <S.GridSkeleton>
          <S.Skeleton />
          <S.Skeleton />
          <S.Skeleton />
          <S.Skeleton />
        </S.GridSkeleton>
      </S.Wrapper>
    </S.SkeletonUi>
  );
};

export default SkeletonUi;
