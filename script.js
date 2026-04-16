const form = document.querySelector('#form-tarefa');
const listaUl = document.querySelector('#lista-tarefas');
const contadorElemento = document.querySelector('#contador');

let tarefasAtivas = 0;

const nomesPrioridades = {
    "1": "Crítico",
    "2": "Alto",
    "3": "Médio",
    "4": "Baixo"
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;
    const prioridade = document.querySelector('#prioridade').value;
    const periodo = document.querySelector('#periodo').value;

    criarTarefa(titulo, descricao, prioridade, periodo);
    
    form.reset();
    atualizarContador(1);
});

function criarTarefa(titulo, descricao, prioridade, periodo) {
    const li = document.createElement('li');
    li.className = `tarefa-item prio-${prioridade}`;
    
    // Guardamos o nome da prioridade para o CSS usar no hover (Ponto 3)
    li.setAttribute('data-prioridade-nome', nomesPrioridades[prioridade]);

    li.innerHTML = `
        <div class="info">
            <strong style="display:block; font-size: 1.1rem; margin-bottom: 5px;">${titulo}</strong>
            <p style="color: var(--text-sub); font-size: 0.9rem; margin: 0;">${descricao}</p>
            <div style="margin-top: 10px;">
                <span style="font-size: 0.7rem; background: #f0f0f0; padding: 4px 8px; border-radius: 6px;">
                    ${periodo.toUpperCase()}
                </span>
            </div>
        </div>
        <button class="btn-status" title="Alternar status">✓</button>
    `;

    // Lógica para marcar/desmarcar (Ponto 2)
    const btnStatus = li.querySelector('.btn-status');
    btnStatus.addEventListener('click', () => {
        const estaConcluida = li.classList.toggle('concluida');
        
        if (estaConcluida) {
            btnStatus.style.background = '#51cf66';
            btnStatus.style.color = 'white';
            atualizarContador(-1);
        } else {
            btnStatus.style.background = '#eee';
            btnStatus.style.color = 'black';
            atualizarContador(1);
        }
    });

    listaUl.prepend(li); // Adiciona no topo da lista
}

function atualizarContador(valor) {
    tarefasAtivas += valor;
    contadorElemento.innerText = tarefasAtivas;
}
