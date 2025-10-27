import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { theme } from '@/styles/theme';
import { ContentCard } from './ContentCard';

interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
}

interface ContentSliderProps {
  contents: SlideContent[];
}

export const ContentSlider = ({ contents }: ContentSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || contents.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === contents.length - 1 ? 0 : prevIndex + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, contents.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? contents.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === contents.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (contents.length === 0) return null;

  return (
    <SliderSection>
      <SliderContainer>
        <SliderWrapper>
          <SliderTrack
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${contents.length * 100}%`,
            }}
          >
            {contents.map((content) => (
              <SlideItem key={content.id}>
                <ContentCard
                  title={content.title}
                  subtitle={content.subtitle}
                  buttonText={content.buttonText}
                  backgroundColor={content.backgroundColor}
                />
              </SlideItem>
            ))}
          </SliderTrack>
        </SliderWrapper>

        {contents.length > 1 && (
          <>
            <PrevButton onClick={goToPrevious}>
              <ArrowIcon>‹</ArrowIcon>
            </PrevButton>
            <NextButton onClick={goToNext}>
              <ArrowIcon>›</ArrowIcon>
            </NextButton>
          </>
        )}
      </SliderContainer>

      {contents.length > 1 && (
        <IndicatorContainer>
          {contents.map((_, index) => (
            <Indicator
              key={index}
              $isActive={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </IndicatorContainer>
      )}
    </SliderSection>
  );
};

const SliderSection = styled.section`
  padding: ${theme.spacing(4)};
  background-color: #ffffff;
  position: relative;
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.spacing(3)};
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  border-radius: ${theme.spacing(3)};
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const SlideItem = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: ${theme.spacing(-3)};
`;

const NextButton = styled(NavigationButton)`
  right: ${theme.spacing(-3)};
`;

const ArrowIcon = styled.span`
  font-size: 30px;
  font-weight: regular;
  color: #363636;
  line-height: 0.8;
  transform: scaleY(1.5);
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(3)};
`;

const Indicator = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.$isActive ? '#333' : '#ccc')};
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0;
  margin: 0;
  min-width: 8px;
  max-width: 8px;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#333' : '#999')};
  }
`;
