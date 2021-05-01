// Evento para chamar a função apertando enter, não sendo necessário clicar no botão

let form = document.forms[0];
var input = form.querySelector('input[name="cep"]');
var btn = form.querySelector('button[type="button"]');

input.addEventListener('keydown', function (event) {
    if (event.keyCode !== 13) return;
        event.preventDefault();
        btn.click(); 
});


function buscaCep(){
    let form = document.forms[0];
    let inputCep = form.querySelector('input[name="cep"]');
    let cep = inputCep.value.replace('-','');
    let url = 'http://viacep.com.br/ws/' + cep + '/json';

    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                preencheCampos(JSON.parse(xhr.responseText));
            }
        }
    }
    xhr.send();
}

function preencheCampos(json){
    form = document.forms[0];
    form.querySelector('input[name="endereco"]').value = json.logradouro;
    form.querySelector('input[name="bairro"]').value = json.bairro;
    form.querySelector('input[name="complemento"]').value = json.complemento;
    form.querySelector('input[name="cidade"]').value = json.localidade; 
    form.querySelector('input[name="estado"]').value = json.uf; 
}