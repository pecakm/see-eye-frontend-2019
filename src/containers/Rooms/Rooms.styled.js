import styled from "styled-components";

import {
  MenuLogo, BaseButton, BaseMenu
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

export const LogoutButton = styled(BaseButton)``;
export const SearchButton = styled(BaseButton)``;

export const LogoWrapper = styled(MenuLogo)``;

export const ContactsWrapper = styled.div`
  text-align: center;
`;

export const ContactButton = styled(BaseButton)`
  display: block;
  width: 100%;
`;