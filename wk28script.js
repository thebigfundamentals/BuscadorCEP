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

import { getCleanCep, clear, requestData, requestClick } from './module.js';
import {
    $inputCep,
    $submitBtn,
    $clearBtn,
    $returnedMessage,
    $returnedAddress,
    $returnedDistrict,
    $returnedCity,
    $returnedState
} from './variables.js';

$inputCep.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $submitBtn.click();
    }
});
$submitBtn.addEventListener('click', requestClick, false);
$clearBtn.addEventListener('click', clear, false);








