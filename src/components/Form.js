import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error'
import useCoin from '../hooks/useCoin';
import useCrypto from '../hooks/useCrypto';
import axios from 'axios';
import PropTypes from 'prop-types';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({saveCoin, saveCRypto}) => {

    // State del listado de criptomonedas
    const [ cryptoList, saveCrypto ] = useState([]);

    const [ error, saveError ] = useState(false);

    const COINS = [
        { code: 'USD', name: 'Dolar Estadounidense' },
        { code: 'ARS', name: 'Peso Argentino' },
        { code: 'MXN', name: 'Peso Mexicano' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Libra Esterlina' }
    ]

    // Utilizar useCoin
    const [coin, SelectCoin] = useCoin('Elegir Moneda', '', COINS);

    // Utilizar useCrypto
    const [crypto, SelectCrypto] = useCrypto('Elegir criptomoneda', '', cryptoList);

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

            const result = await axios.get(url);

            saveCrypto(result.data.Data);
        }
        consultAPI();
    }, []);

    // Cuando el usuario hace submit
    const quoteCurrency = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(coin === '' || crypto === '') {
            saveError(true);
            return;
        }

        // Pasar los datos al componente principal
        saveError(false);
        saveCoin(coin);
        saveCRypto(crypto);

    }

    return (
        <form
            onSubmit = {quoteCurrency}
        >

            {error ? <Error message="Todos los campos son obligatorios" /> : null}

            <SelectCoin />
            <SelectCrypto />
            <Button
                type = "submit"
                value = "Calcular"
            />
        </form>
    );
}

Form.propTypes = {
    saveCoin: PropTypes.func.isRequired,
    saveCRypto: PropTypes.func.isRequired
}
 
export default Form;