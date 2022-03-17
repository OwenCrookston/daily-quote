import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const QuoteAndImage = styled.div`
  postion: relative;
  height: 100vh;
  width: 100vw;
  background-color: black;
`;
const Image = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
`;
const Quote = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const QuoteText = styled.div`
  font-size: 50px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: white;
  font-weight: bold;
  max-width: 70%;
`;
const Attribution = styled.div`
  font-size: 50px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  padding: 20px;
  max-width: 70%;
`;

function QuoteView() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quote, setQuote] = useState('placeholder');
  const [attribution, setAttribution] = useState('unattributed');

  const currentTime = moment().format('MMMM DD YYYY').split(' ');
  const options = { day: currentTime[1], month: currentTime[0], year: currentTime[2] };

  const getToday = () => {
    axios.get('http://localhost:8080/messages/', { params: options })
      .then((result) => {
        const responseType = Array.isArray(result.data) ? 'personal' : 'quote';
        if (responseType === 'personal') {
          const selected = Math.floor(Math.random() * (result.data.length));
          setQuote(result.data[selected].message);
          setAttribution(result.data[selected].from);
        } else {
          setQuote(result.data.quote);
          setAttribution(result.data.by);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getToday();
  }, []);

  return (
    <QuoteAndImage>
      <Image onLoad={() => setImageLoaded(true)} alt="image" src="https://source.unsplash.com/user/c_v_r/1900x800" />
      {imageLoaded && (
      <Quote>
        <QuoteText>
          {quote}
        </QuoteText>
        <Attribution>
          {attribution}
        </Attribution>
      </Quote>
      )}
    </QuoteAndImage>
  );
}

export default QuoteView;
