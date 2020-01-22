import styled from "styled-components";

import {
  MenuLogo,
  BaseButton,
  BaseMenu,
  BaseInput,
} from "../../index.styled";

export const Container = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    padding-top: 75px;
  }
`;

export const Menu = styled(BaseMenu)``;

export const ChatsListButton = styled(BaseButton)``;

export const LogoWrapper = styled(MenuLogo)``;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled(BaseInput)`
  margin-bottom: 25px;
`;

export const SearchButton = styled(BaseButton)``;