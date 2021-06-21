import Head from 'next/head';
import { Container, ContainerInputButton } from '../styles/index';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [input, setInput ] = useState("");
  const router = useRouter();

  function handleClick(e){
    router.push(`/summoner/${input}`)
  }
  return (
    <div >
      <Head>
        <title>A</title>
        {<style>{`body {background: #5383E8}`}</style>}
      </Head>
      <Container>
        <div>
          <img src="https://opgg-static.akamaized.net/logo/20210605060544.919267eac7b748a791aa844894e4073a.png" alt="" />
          <div>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={() => handleClick()}>
                .GG
            </button>
            <Link href="/summoner/GK2">
              <a>a</a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
};
