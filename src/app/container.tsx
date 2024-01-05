'use client';

import { useEffect, useState } from 'react';
import Chart from './chart';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Container({ votes }) {
  const [votesRealtime, setVotesRealtime] = useState(votes);

  useEffect(() => {
    socket.on('change-event', (message) => {
      const msg = JSON.parse(message);
      const { operationType, fullDocument } = msg || {};

      if (operationType === 'insert') {
        setVotesRealtime((v) => [...v, fullDocument]);
      }
    });
  }, []);

  return (
    <Chart votes={votesRealtime} />
  )
};
