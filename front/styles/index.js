import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
`
export const Container = styled.div`
  max-width: 1100px;
  margin: 30px auto;

  div {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 350px;
    }

    div {
      flex-direction: row;
      margin: 20px;
      height: 50px;
      background-color: #fff;
      padding: 15px;

      input {
        font-size: 15px;
        width: 400px;
        height: 40px;
        border: none;
        margin-right: 5px;
        color: #9b9b9b;

        :focus{
          outline: none;
        }
      }

      button {
        height: 30px;
        border: none;
        width: 50px;
        margin: 2px;

        font-weight: bold;
        font-size: 18px;
        color: #fff;
        background-color: ${props => props.loading ? 'red' : '#00A9FF'};

        justify-content: center;
        display: flex;
        align-items: center;

        :hover {
          cursor: pointer;
        }

        svg{
            animation: ${rotate} linear 2s infinite;
        }
      }
    }
  }
`;

export const ContainerInputButton = styled.div`
  display: flex;
`;
