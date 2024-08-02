// Seleciona o formulário e seus elementos
const form = document.getElementById('form_lista');
const nomePessoaInput = document.getElementById('nome_pessoa');
const telefonePessoaInput = document.getElementById('telefone_pessoa');
const fotoPessoaInput = document.getElementById('foto_pessoa');
const tabela = document.querySelector('table tbody');

// Função para capitalizar a primeira letra de cada palavra
function capitalizeNome(nome) {
    return nome
        .toLowerCase() // Converte todo o texto para minúsculas
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
};

// Adiciona um evento de escuta ao formulário para o evento de envio (submit)
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário, que é recarregar a página

    // Obtém os valores dos campos de entrada
    const nome = nomePessoaInput.value.trim();
    const telefone = telefonePessoaInput.value.trim();
    const foto = fotoPessoaInput.files[0];

    // Verifica se o nome já existe na tabela
        for (let row of tabela.rows) {
        if (row.cells[1].innerText.toLowerCase() === nome) { // Compara de forma insensível a maiúsculas/minúsculas
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Este nome já foi adicionado.'
            });
            return;
        };
    };
    
    // Verifica se o telefone já existe na tabela
    for (let row of tabela.rows) {
        if (row.cells[2].innerText === telefone) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Este telefone já foi adicionado.'
            });
            return;
        };
    };

    // Validação do nome (Somente letras, espaços e acentuações)
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!nomeRegex.test(nome)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'O nome deve conter apenas letras, espaços e acentuações.'
        });
        return;
    }

    // Validação do telefone (Formato: (xx) xxxxx-xxxx)
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'O telefone deve estar no formato (xx) xxxxx-xxxx.'
        });
        return;
    }

    // Adiciona uma foto genérica se o usuário não selecionou uma
    const fotoUrl = foto ? URL.createObjectURL(foto) : './Material de Apoio/icon_contato.png';

    // Adiciona um novo número crescente à tabela
    const numero = tabela.children.length + 1;

    // Cria uma nova linha na tabela
    const novaLinha = document.createElement('tr');

    // Preenche a nova linha com os dados
    novaLinha.innerHTML = `
        <td>${numero}º</td>
        <td>${nome}</td>
        <td>${telefone}</td>
        <td><img src="${fotoUrl}" alt="Foto da Pessoa" height="70" border-radius="50%" object-fit="cover" ></td>
    `;

    // Adiciona a nova linha à tabela
    tabela.appendChild(novaLinha);

    // Limpa os campos do formulário
    nomePessoaInput.value = '';
    telefonePessoaInput.value = '';
    fotoPessoaInput.value = '';

    // Exibe um alerta de sucesso
    Swal.fire({
        icon: 'success',
        title: 'Adicionado',
        text: 'Contato adicionado com sucesso!'
    });
});

// Função para formatar o telefone enquanto o usuário digita
telefonePessoaInput.addEventListener('input', function(event) {
    let input = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    input = input.substring(0, 11); // Limita o número de dígitos a 11

    // Formatação para (xx) xxxxx-xxxx
    if (input.length > 0) {
        input = '(' + input.substring(0, 2) + ') ' + input.substring(2, 7) + '-' + input.substring(7, 11);
    }

    // Atualiza o valor do campo de telefone com a formatação
    event.target.value = input;
});
