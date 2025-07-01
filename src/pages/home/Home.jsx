import * as H from '@home/HomeStyle';
import { useNavigate } from 'react-router-dom';
import Books from '@components/Books/Books';
import Arrow20 from '@assets/home/arrow-up_right-20.svg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <H.UserContainer>
        <H.User>
          <H.Title>
            <p>
              <span>조희원</span>님의 책장
            </p>
            <H.ArrowDiv onClick={() => navigate('/view')}>
              <img src={Arrow20} alt="이미지 생성하러 가기" />
            </H.ArrowDiv>
          </H.Title>
          <Books />
        </H.User>
      </H.UserContainer>
    </>
  );
};

export default Home;
