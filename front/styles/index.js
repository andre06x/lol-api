import styled from 'styled-components';

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
        background-color: #00A9FF;

        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export const ContainerInputButton = styled.div`
  display: flex;
`;
