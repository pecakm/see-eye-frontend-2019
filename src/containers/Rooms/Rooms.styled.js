import styled from "styled-components";

import {
  MenuLogo,
  BaseButton,
  BaseMenu,
  Color,
} from "../../index.styled";

export const Menu = styled(BaseMenu)``;

export const LogoutButton = styled(BaseButton)`
  background-color: white;
  color: ${Color.Primary};

  &:hover {
    color: ${Color.Secondary};
    background-color: ${Color.Primary};
  }
`;

export const SearchButton = styled(BaseButton)`
  margin-right: 5px;
`;

export const LogoWrapper = styled(MenuLogo)``;

export const MenuButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const ContactsWrapper = styled.div`
  text-align: center;
`;

export const ContactButton = styled(BaseButton)`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;