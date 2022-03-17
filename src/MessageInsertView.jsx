import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;

`;
const Label = styled.div`
  padding: 10px;
  height: 40px;
`;
const Button = styled.button`
  color: blue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

function MessageInsertView() {
  const formFields = {
    message: '',
    from: '',
    day: 1,
    month: 'January',
    year: 2022,
  };
  const days = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [];
  for (let i = 0; i <= 30; i += 1) days[i] = i + 1;
  for (let i = 0; i <= 30; i += 1) years[i] = i + 2022;

  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [noneFound, setNoneFound] = useState(false);
  const [message, setMessage] = useState({ ...formFields });
  const postMessage = (body) => {
    axios.post('http://localhost:8080/messages/', body)
      .then(() => {
        setPosted(true);
        setTimeout(() => setPosted(false), 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMessage = (date) => {
    axios.delete('http://localhost:8080/messages/', { data: date })
      .then((res) => {
        console.log(res);
        if (res.data.deletedCount > 0) {
          setDeleted(true);
          setTimeout(() => setDeleted(false), 1500);
        } else {
          setNoneFound(true);
          setTimeout(() => setNoneFound(false), 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <form>
        <Label>
          Message:
          <input type="text" value={message.message} onChange={(e) => setMessage((p) => ({ ...p, message: e.target.value }))} />
        </Label>
        <Label>
          From:
          <input type="text" value={message.from} onChange={(e) => setMessage((p) => ({ ...p, from: e.target.value }))} />
        </Label>
        <FlexRow>
          <Label>
            Day:
            <select
              value={message.day}
              onChange={(e) => setMessage((p) => ({ ...p, day: Number(e.target.value) }))}
            >
              {days.map((day) => <option value={day}>{day}</option>)}
            </select>
          </Label>
          <Label>
            Month:
            <select
              value={message.month}
              onChange={(e) => setMessage((p) => ({ ...p, month: e.target.value }))}
            >
              {months.map((month) => <option value={month}>{month}</option>)}
            </select>
          </Label>
          <Label>
            Year:
            <select
              value={message.year}
              onChange={(e) => setMessage((p) => ({ ...p, year: Number(e.target.value) }))}
            >
              {years.map((year) => <option value={year}>{year}</option>)}
            </select>
          </Label>
        </FlexRow>
        <Button type="button" onClick={() => postMessage(message)}>Schedule Message</Button>
      </form>
      <Button
        type="button"
        onClick={() => deleteMessage({
          day: message.day,
          month: message.month,
          year: message.year,
        })}
      >
        Delete Message
      </Button>
      {posted && <div>Message Scheduled!</div>}
      {deleted && <div>Message Deleted!</div>}
      {noneFound && <div>No messages found for that date</div>}
    </Container>
  );
}

export default MessageInsertView;
