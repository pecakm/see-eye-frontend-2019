import styled from "styled-components";

import {
  BaseTitle,
  BaseButton,
  BaseInput,
  BaseError,
  BaseLink,
} from "../../index.styled";

export const Container = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    padding-top: 75px;
  }
`;

export const Title = styled(BaseTitle)``;

export const LogoWrapper = styled.img`
  width: 150px;
  margin: 0 auto;
`;

export const LoginButton = styled(BaseButton)``;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled(BaseInput)`
  margin-bottom: 25px;
`;

export const Error = styled(BaseError)``;

export const RegisterWrapper = styled.div`
  margin-top: 45px;
  text-align: center;
`;

export const RegisterLink = styled(BaseLink)``;