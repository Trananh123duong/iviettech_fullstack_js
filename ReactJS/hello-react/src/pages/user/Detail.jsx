import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  let { path } = useParams();
  return <h1>Detail with path: {path}</h1>
}

export default Detail
