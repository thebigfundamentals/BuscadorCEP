/*
 No HTML:
 - Crie um formulário com um input de texto que receberá um CEP e um botão
 de submit;
 - Crie uma estrutura HTML para receber informações de endereço:
 "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
 preenchidas com os dados da requisição feita no JS.
 - Crie uma área que receberá mensagens com o status da requisição:
 "Carregando, sucesso ou erro."
 No JS:
 - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
 deve ser limpo e enviado somente os números para a requisição abaixo;
 - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
 "https://ws.apicep.com/cep.json?code=CEP", onde [CEP] será o CEP passado
 no input criado no HTML;
 - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
 com os dados recebidos.
 - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
 a mensagem: "Buscando informações para o CEP [CEP]..."
 - Se não houver dados para o CEP entrado, mostrar a mensagem:
 "Não encontramos o endereço para o CEP [CEP]."
 - Se houver endereço para o CEP digitado, mostre a mensagem:
 "Endereço referente ao CEP [CEP]:"
 - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
 adicionar as informações em tela.
 */

'use strict';

let $inputCep = document.querySelector('#inputCep');
let $submitBtn = document.querySelector('.submitBtn');
let $returnedError = document.querySelector('.returnedError');
let $returnedAddress = document.querySelector('.returnedAddress');
let $returnedDistrict = document.querySelector('.returnedDistrict');
let $returnedCity = document.querySelector('.returnedCity');
let $returnedState = document.querySelector('.returnedState');


// callback

const getCep = () => { return $inputCep.value };
const getCleanCep = () => {
    let cleanCep = getCep().replace(/[^\d]/g, '');
    return cleanCep
};

const request = async () => {
    try {
        const requestUrl = `https://ws.apicep.com/cep.json?code=${getCleanCep()}`;
        const response = await fetch(requestUrl);
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error(error);
    }

};

function requestClick() {
    request().then(
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

$inputCep.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $submitBtn.click();
    }
});
$submitBtn.addEventListener('click', requestClick, false);








