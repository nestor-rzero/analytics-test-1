'use client';

import { useEffect } from 'react';
import Chart from './chart';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Container({ votes }) {
  useEffect(() => {
    socket.on('change-event', (message) => {
      console.log(message);
    });
  }, []);

  return (
    <Chart votes={votes} />
  )
};
