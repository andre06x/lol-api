import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  margin: 100px auto;
  background: #fff;
  padding: 80px;

  h1,h2,h3,h4 {
    margin: 0;
  }

  .profile {
    display: flex;
    justify-content: space-between;
  }

  .profile div {
    display: flex;
  }
  .profile img{
    width: 100px;
    border-radius: 50px;
    margin-right: 20px;
  }
  .profile .primary{
    display: flex;
    align-items: center;
  }

  .profile .primary div{
    display: flex;
    flex-direction: column;
  }

  .profile .secundary div{
    display: flex;
    flex-direction:  column;
  }


    .profile .secundary div{
    display: flex;
    flex-direction:  column;
  }
`;

export const SecundaryProfile = styled.div`
  background-color: #E5E5E5;
  display: flex;
  padding: 0px 30px;
  border-radius: 15px;

  div {
    display: flex;
    flex-direction: column;
  }

  div div {
    align-items: center;
    flex-direction: row;
  }

  div div div {
    flex-direction: column;
    /* margin: 0px 10px; */
  }
`

export const KDA = styled.div`
  margin-top: 40px;
  width: 400px;
  display: flex;
  background: #F8F8F8;
  align-items: center;

  h3{
    font-size: 23px;
    margin-left: 10px;
  }
  span{
    margin-left: 20px;
  }
  img {
    margin-right: 20px;

  }
  div {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

export const LastMatchs = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;

`;

export const LastMatchMap = styled.div`
  background-color: ${props => props.colors ? '#A3CFEC' : '#E2B6B3'};
  margin: 25px;
  display: flex;
  align-items: center;

  div {
    padding: 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export const LastMatchItem = styled.div`
  max-width: 150px;
  flex-direction: row !important;
  flex-grow: 3;
  flex-wrap: wrap;
  margin: 0 40px;


`;
