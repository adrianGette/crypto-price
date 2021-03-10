import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const SelecT = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCrypto = (label, initialState, options) => {

    // State custom hook
    const [state, updateState] = useState(initialState);

    const SelectCrypto = () => (
        <Fragment>
            <Label>{label}</Label>
            <SelecT
                onChange = { e => updateState(e.target.value) }
                value = { state }
            >
                <option value="">-- Seleccionar --</option>
                { options.map(opt => (
                    <option key={opt.CoinInfo.Id} value={opt.CoinInfo.Name}>{opt.CoinInfo.FullName}</option>
                )) }
            </SelecT>
        </Fragment>
    );

    // Retornar State, Interfaz y Funcion que modifica el state
    return [state, SelectCrypto, updateState];
}

export default useCrypto;