import styled from "styled-components";

import {
  MenuLogo,
  BaseButton,
  BaseMenu,
  BaseInput,
  Color,
} from "../../index.styled";

export const Menu = styled(BaseMenu)``;

export const ChatsListButton = styled(BaseButton)``;

export const LogoWrapper = styled(MenuLogo)``;

export const ContactNameWrapper = styled.p`
  margin: 0 0 30px;
`;

export const ContactName = styled.span`
  color: ${Color.Primary};
  font-size: 22px;
  font-weight: 700;
`;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const Field = styled(BaseInput)`
  flex: 1;
`;

export const SendButton = styled(BaseButton)`
  &:disabled {
    background-color: #aaa;
    cursor: default;
    border: none;
    &:hover {
      color: #fff;
    }
  }
`;

export const ChatWrapper = styled.div`
  border-top: 1px solid #aaa;
  padding-top: 20px;
`;

export const Message = styled.div`
  margin-bottom: 5px;
  color: ${props => props.isSender ? "black" : props.isReceiver ? Color.Primary : "#aaa"};
  ${props => props.isReceiver && "font-style: italic;"}
`;