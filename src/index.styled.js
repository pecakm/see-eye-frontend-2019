import styled from "styled-components";

export const Color = {
  Primary: "#5B6395",
  Secondary: "#BAF7CD",
};

export const GlobalStyle = styled.div`
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Roboto',sans-serif;
  background-color: #fafafa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-box-shadow: 0px 0px 30px 10px rgba(231,166,26,1);
  -moz-box-shadow: 0px 0px 30px 10px rgba(231,166,26,1);
  box-shadow: 0px 0px 30px 10px rgba(231,166,26,1);
  padding: 20px;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;

  * {
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
      outline: none;
    }
  }
`;

export const BaseTitle = styled.h1`
  text-align: center;
  margin: 0;
  color: ${Color.Primary};
  margin-bottom: 25px;
`;

export const BaseButton = styled.button`
  padding: 0.3em 1.2em;
  border-radius: 2em;
  box-sizing: border-box;
  border: 2px solid ${Color.Primary};
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 16px;
  color: #fff;
  background-color: ${Color.Primary};
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  height: 47px;

  &:hover {
    background-color: #fff;
    color: ${Color.Primary};
  }
`;

export const BaseInput = styled.input`
  font-size: 20px;
  padding: 10px 15px;
  border-radius: 2em;
  border: 1px solid ${Color.Primary};
`;

export const BaseError = styled.p`
  color: red;
  text-align: center;
`;

export const BaseLink = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  color: ${Color.Primary};
  padding: 0;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const BaseMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const MenuLogo = styled.img`
  width: 60px;
`;