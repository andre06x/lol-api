import Head from 'next/head';
import { Container } from '../styles/index';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ImSpinner8 } from 'react-icons/im';

export default function Home() {
  const [input, setInput ] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleClick(e){
    setLoading(true);
    if(input !== ''){
      router.push(`/summoner/${input}`)
    }
  }
  return (
    <div >
      <Head>
        <title>A</title>
        {<style>{`body {background: #5383E8}`}</style>}
      </Head>
      <Container loading={loading}>
        <div>
          <img src="https://opgg-static.akamaized.net/logo/20210605060544.919267eac7b748a791aa844894e4073a.png" alt="" />
          <div>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={() => handleClick()}>
                { loading ? (
                  <ImSpinner8 size={20}/>
                ) : (
                  '.GG'
                )}
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
};
