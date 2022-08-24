import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette';

// - 사실 이 컴포넌트에서 StyledButton을 바로 내보내도 상관없음
// - 굳이 Button 리액트 컴포넌트를 만들어서 그 안에 StyledButton을 렌더링 한 이유는 추후 이 컴포넌트를 사용할 때 자동으로 import가 되게 하기 위함
//     - styled-components로 만든 컴포넌트를 바로 내보내면 자동 import가 제대로 작동하지 않음
const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
  props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
  props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

// Button 컴포넌트를 만드는 과정에서 {…props}를 StyledButton에 설정해 줬는데 이는 Button이 받아 오는 props를 모두 StyledButton에 전달한다는 의미
const Button = (props) => <StyledButton {...props} />;

export default Button;
