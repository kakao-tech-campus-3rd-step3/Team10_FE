### 1. Emotion 사용법
- src/styles 폴더 확인
- theme.ts 파일, colors는 피그마 컬러팔레트 기준
- 스페이싱은 상수 입력하면 상수*4값으로 나옴
- 폰트는 우리팀은 pretendard만 써서, bold, regular 로 사용하면 됨.
- 폰트 사이즈, 폰트 컬러, 등 나머지는 굳이 할 의미 없어서 (사용한 숫자 너무 많음) 그냥 그때그때 따로 설정하는 걸로
- css 작업 예시 : 
import styled from '@emotion/styled';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.font.bold.fontFamily};
  font-weight: ${({ theme }) => theme.font.bold.fontWeight};
`;

### 2. 폴더 구조 관련
- src 안에 MockData, Pages, Shared 폴더 만들었습니다.
- 페이지 작업은 Pages 파일 안에 tsx파일 만들어서 해주시고, 만들 때 MockData 필요하면 MockData 폴더에, 공통 요소 만들게 되면 (버튼, 등. 일단은 안해도됨) Shared안에 components에 파일 만드시면 됩니다.
- 일단은 Pages파일에 만들기!

### 3. @/... 절대 경로 관련
- 저희 2단계 때 import 해오던 방식대로 절대경로 alias 설정 해두었습니다.

### 4. 병합시 충돌 안나게 조심~ 본인 파일만 건들기 ~