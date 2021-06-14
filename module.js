'use strict';

import {
    $inputCep,
    $submitBtn,
    $clearBtn,
    $returnedError,
    $returnedAddress,
    $returnedDistrict,
    $returnedCity,
    $returnedState
} from './variables.js';

export const getCleanCep = () => {
    const getCep = () => { return $inputCep.value };
    let cleanCep = getCep().replace(/[^\d]/g, '');
    return cleanCep
};

export const clear = () => {
    $returnedAddress.textContent = '⠀';
    $returnedDistrict.textContent = '⠀';
    $returnedCity.textContent = '⠀';
    $returnedState.textContent = '⠀';
    $returnedError.textContent = '⠀';
    $inputCep.value = "";
};

export const requestData = async () => {
    try {
        const requestUrl = `https://ws.apicep.com/cep.json?code=${getCleanCep()}`;
        const response = await fetch(requestUrl);
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error(error);
    }

};

export function requestClick() {
    requestData().then(
        (data) => {

            console.log(data)

            if (data.statusText === 'ok') {
                $returnedAddress.textContent = '⠀' + data.address;
                $returnedDistrict.textContent = '⠀' + data.district;
                $returnedCity.textContent = '⠀' + data.city;
                $returnedState.textContent = '⠀' + data.state;
                $returnedError.textContent = `CEP pesquisado: ${data.code}`;
            }
            if (data.statusText === 'bad_request') {

                $returnedError.textContent = data.message;
            }
            if (data.statusText === 'not_found') {

                $returnedError.textContent = data.message;
            }
        }
    );
};

