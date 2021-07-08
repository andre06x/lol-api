import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Document, { Head } from 'next/document';
import Image from 'next/image';

import axios from 'axios';

import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { ChartDonut } from '@patternfly/react-charts';

import Container, {
  SecundaryProfile,
  KDA,
  LastMatchs,
  LastMatchMap,
  LastMatchItem
} from './styles';

export default function Member({ nick, name }) {
  const [data, setData] = useState(false);
  const { isFallback } = useRouter();

  useEffect(() => {
    if (nick) {
      console.log(nick)
      axios.get(`http://localhost:3333/summoner/${name}`)
        .then((response) => {
          console.log(response.data)
          setData(response.data);
        })
    };
  }, [nick])

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div className="profile">
        <div className="primary">
          <img src={nick.iconUrl} alt="" />
          <div>
            <h1>{name}</h1>
            <h3>{nick.summonerLevel}</h3>
          </div>
        </div>
        <SecundaryProfile>
          <div>
            <h4>Ranqueada Solo</h4>
            <div>
              {
                nick.l0 ? (
                  <>
                    <Image src={`/${nick.l0[0].tier}.png`} width={500} height={500} />
                    <div>
                      <span>{nick.l0[0].tier + " " + nick.l0[0].rank}</span>
                      <span style={{fontSize: '10px'}}>
                        <b style={{}}>{nick.l0[0].leaguePoints} LP </b>/
                        {`${nick.l0[0].wins} / ${nick.l0[0].losses}`}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://opgg-static.akamaized.net/images/medals/default.png?image=q_auto:best&v=1" alt="" />
                    <div>
                      <span>Ranqueada Solo</span>
                      <span>Unranked</span>
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div>
            <h4>Ranqueada Flex 5x5</h4>
            <div>
              {
                nick.l1 ? (
                  <>
                    <Image src={`/${nick.l1[0].tier}.png`} width={500} height={500} />
                    <div>
                      <span>{nick.l1[0].tier + " " + nick.l1[0].rank}</span>
                      <span>Ranqueada Solo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://opgg-static.akamaized.net/images/medals/default.png?image=q_auto:best&v=1" alt="" />
                    <div>
                      <span>Ranqueada Flex 5x5</span>
                      <span>Unranked</span>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </SecundaryProfile>
      </div>

      <KDA>
        {
          data ? (
            <>
              <div style={{ height: '230px', width: '170px' }}>
                <ChartDonut
                  constrainToVisibleArea={true}
                  data={[{ x: 'Vitoria', y: data.vitoria }, { x: 'Derrota', y: 10 - data.vitoria }]}
                  labels={({ datum }) => `${datum.x + '0'}: ${datum.y + '0'}%`}
                  legendOrientation="vertical"
                  legendPosition="right"
                  subTitle="Vitoria"
                  title={data.vitoria + '0%'}
                  width={170}
                />
              </div>
              <div>
                <span>{`10P ${data.vitoria}W ${10 - data.vitoria}L`}</span>
                <h3>
                  {`${data.mediaKills}/${data.mediaDeaths}/${data.mediaAssists}`}
                </h3>
                <span>{data.kda10}</span>
              </div>
            </>
          ) : (
            <>
              <Skeleton variant="circle" width={90} height={90} animation="wave" />
              <Skeleton width="50%" animation="wave">
                <Typography style={{ margin: '50px' }}>.</Typography>
                <br />
                <Typography>.</Typography>
              </Skeleton>
            </>
          )
        }
      </KDA>
      <LastMatchs>
        {data ? (
          data.dadosPartida.map(d => (
            <LastMatchMap colors={d.win}>
              <div>
                <span>{d.gameMode}</span>
                <span>{d.win ? <b>Vitória</b> : 'Derrota'}</span>
                <span>{d.gameMinuteDuration}</span>
              </div>

              <div style={{ flexDirection: 'row', padding: '0 30px' }}>
                <img src={d.championIcon} alt="" width="50" height="50" style={{ borderRadius: '25px', }} />
                <div style={{ flexDirection: 'column', padding: '0 30px' }}>
                  <span>{`${d.kills}/${d.deaths}/${d.assists}`}</span>
                  <span>{`${(d.kills + d.assists / d.deaths).toFixed(1)} KDA`}</span>
                </div>
              </div>

              <div>
                <span>{`Nivel ${d.champLevel}`}</span>
                <span>{`CS ${d.totalMinionsKilled}`}</span>
              </div>

              <LastMatchItem>
                {d.itens.map(d => (
                  <img src={d.item == "https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/0.png" ? "https://opgg-static.akamaized.net/images/pattern/opacity.1.png" : d.item} alt="" width="30" height="30"/>
                ))}
              </LastMatchItem>
            </LastMatchMap>
          ))
        ) : (
          <>
            <Skeleton variant="rect" width={700} height={118} style={{ margin: "30px 30px" }} animation="wave" />
            <Skeleton variant="rect" width={700} height={118} style={{ margin: "30px 30px" }} animation="wave" />
            <Skeleton variant="rect" width={700} height={118} style={{ margin: "30px 30px" }} animation="wave" />
          </>
        )}
      </LastMatchs>


    </Container>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/summoner`);
  const data = await response.json();

  const paths = data.map(member => {
    return { params: { nick: member.login } }
  });

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { nick } = context.params;

  const response = await fetch(`http://localhost:3333/summonner/${nick}`);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      nick: data,
      name: nick
    },
    revalidate: 10,
  }
}
