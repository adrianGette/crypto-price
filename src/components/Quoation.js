import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const DivResult = styled.p`
    color: #0d2235;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10px;
    background-color: #FFF;
    border-radius: 10px;
`;

const Paragraph = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

// const Price = styled.p`
//     font-size: 30px;

//     span {
//         font-weight: bold;
//     }
// `;

const Quoation = ({result}) => {
    if(Object.keys(result).length === 0) return null;

    return (
        <DivResult>
            <Paragraph>El precio es: <span>{result.PRICE}</span></Paragraph>
            <Paragraph>Precio más alto del día: <span>{result.HIGHDAY}</span></Paragraph>
            <Paragraph>Precio más bajo del día: <span>{result.LOWDAY}</span></Paragraph>
            <Paragraph>Variación últimas 24 hs: <span>{result.CHANGEPCT24HOUR}</span></Paragraph>
            <Paragraph>Última actualización: <span>{result.LASTUPDATE}</span></Paragraph>
        </DivResult>
    );
}

Quoation.propTypes = {
    result: PropTypes.object.isRequired
}
 
export default Quoation;