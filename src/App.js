import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './crypto3.png';
import Form from './components/Form';
import Quoation from './components/Quoation';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media(min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [coin, saveCoin] = useState('');

  const [crypto, saveCRypto] = useState('');

  const [result, saveResult] = useState({});

  const [loading, saveLoading] =  useState(false);

  useEffect(() => {

    const quoation = async () => {
      // Evitamos la ejecucion la primera vez
      if(coin === '') return;

      // Consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

      const result = await axios.get(url);

      // mostrar Spinner
      saveLoading(true);

      // Ocultar el Spinner y mostrar el resultado
      setTimeout(() => {

        // Cambiar el estado de cargando
        saveLoading(false);

        // Guardar cotizacion
        saveResult(result.data.DISPLAY[crypto][coin]);
      }, 1000);

      
    }
    quoation();

  }, [coin, crypto]);

  // Mostrar Spinner  o resultado
  const component = (loading) ? <Spinner /> : <Quoation result = {result} />



  return (
    <Container>
      <div>
        <Image 
          src = {image}
          alt = "crypto image"
        />
      </div>

      <div>
        <Heading>Cotizador Crypto</Heading>
        <Form 
          saveCoin = {saveCoin}
          saveCRypto = {saveCRypto}
        />

        {component}        
      </div>
    </Container>
  );
}

export default App;
