'use strict';

import {
    $inputCep,
    $submitBtn,
    $clearBtn,
    $returnedAddress,
    $returnedDistrict,
    $returnedCity,
    $returnedState,
    $loading,
    $returnedMessage
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
    $returnedMessage.textContent = '';
    $inputCep.value = "";
};

export const requestData = async () => {
    try {
        $returnedMessage.textContent = '';
        $loading.removeAttribute('hidden');
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
                $returnedMessage.textContent = `CEP pesquisado: ${data.code}`;
            }
            if (data.statusText === 'bad_request') {

                $returnedMessage.textContent = data.message;
            }
            if (data.statusText === 'not_found') {

                $returnedMessage.textContent = data.message;
            }
            $loading.setAttribute('hidden', '');
        }
    );
};

