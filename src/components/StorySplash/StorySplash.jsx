import * as S from './StorySplashStyls';

import Lottie from 'lottie-react';
import PhoneAnimation from '@assets/storybook/lottie/Tap-to-play-next-tutorial.json';

import CloseGray from '@assets/storybook/close-gray.svg';
import CloseWhite from '@assets/storybook/close-white.svg';
import StoryToggle from '../StoryToggle/StoryToggle';
import StorySplashCard from '../StorySplashCard/StorySplashCard';

import SingAlong from '@assets/storybook/sing_along-white-16.svg?react';
import TextOnly from '@assets/storybook/text_only-white-16.svg?react';
import Narration from '@assets/storybook/ai_narration-white-16.svg?react';
import Bgm from '@assets/storybook/bgm-white-16.svg?react';
import { useState, useRef } from 'react';

import { motion as M } from 'framer-motion';

const StorySplash = ({ setShowSplash }) => {
  const [level, setLevel] = useState(1);
  const dragRef = useRef(null);

  const guide = [
    {
      id: 'singalong',
      icon: SingAlong,
      title: 'Sing-along',
      text: (
        <>
          노래방처럼 내 목소리를 따라
          <br />
          글씨 색이 바뀌어요.
        </>
      ),
    },
    {
      id: 'textonly',
      icon: TextOnly,
      title: 'Text Only',
      text: (
        <>
          나만의 속도로,
          <br /> 차분하게 스토리를 즐겨보세요.
        </>
      ),
    },
    {
      id: 'narration',
      icon: Narration,
      title: 'AI Narration',
      text: 'AI가 스토리를 또박또박 읽어줘요.',
    },
    {
      id: 'bgm',
      icon: Bgm,
      title: 'Bgm',
      text: '스토리와 어울리는 음악이 흘러요.',
    },
  ];

  return (
    <>
      <S.StorySplash>
        {level === 1 && (
          <S.Close>
            <img src={CloseGray} alt="닫기" />
          </S.Close>
        )}

        {level === 2 && (
          <S.Close
            onClick={() => {
              setShowSplash((prev) => !prev);
            }}>
            <img src={CloseWhite} alt="닫기" />
          </S.Close>
        )}

        {level === 1 && (
          <M.div
            drag="x"
            dragConstraints={{ left: -100, right: 0 }}
            ref={dragRef}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                setLevel((prev) => prev + 1);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <S.Title>
              <S.SubTitle>Coming Soon</S.SubTitle>
              <S.Heading>내 취향대로</S.Heading>
              <S.Heading>스토리북을 즐겨보세요</S.Heading>

              <S.ListWrapper>
                {guide.map((g) => (
                  <StorySplashCard key={g.id} Icon={g.icon} id={g.id} title={g.title} text={g.text} />
                ))}
              </S.ListWrapper>
            </S.Title>
          </M.div>
        )}

        {level === 2 && (
          <M.div
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 30) {
                setLevel((prev) => prev - 1);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <S.Container>
              <S.Heading>좌우 클릭 또는 드래그로,</S.Heading>
              <S.Heading>스토리북을 넘겨보세요</S.Heading>

              <S.LottieWrapper>
                <Lottie animationData={PhoneAnimation} />
              </S.LottieWrapper>
            </S.Container>
          </M.div>
        )}
        <S.DotWrapper>
          <S.Dot $active={level === 1} />
          <S.Dot $active={level === 2} />
        </S.DotWrapper>
      </S.StorySplash>
    </>
  );
};
export default StorySplash;
