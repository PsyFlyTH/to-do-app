const form = document.querySelector('#form-tarefa');
const listaUl = document.querySelector('#lista-tarefas');
const tabBtns = document.querySelectorAll('.tab-btn');

let filtroAtual = 'todas';

// --- EVENTOS DO FORMULÁRIO ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;
    const prioridade = document.querySelector('#prioridade').value;
    const periodo = document.querySelector('#periodo').value;

    criarTarefa(titulo, descricao, prioridade, periodo);
    form.reset();
    aplicarFiltro(); // Re-aplica o filtro atual após adicionar
});

// --- LÓGICA DE CRIAÇÃO ---
function criarTarefa(titulo, descricao, prioridade, periodo) {
    const li = document.createElement('li');
    li.className = `tarefa-item prio-${prioridade}`;
    li.dataset.status = 'andamento'; // Nova tarefa nasce em andamento

    li.innerHTML = `
        <div class="info">
            <strong style="display:block; margin-bottom: 5px;">${titulo}</strong>
            <p style="color: #666; font-size: 0.9rem;">${descricao}</p>
            <small style="display:inline-block; margin-top:10px; background:#f0f0f0; padding:2px 8px; border-radius:4px;">
                ${periodo.toUpperCase()}
            </small>
        </div>
        <button class="btn-status">✓</button>
    `;

    const btnStatus = li.querySelector('.btn-status');
    btnStatus.addEventListener('click', () => {
        const isConcluida = li.classList.toggle('concluida');
        li.dataset.status = isConcluida ? 'finalizadas' : 'andamento';
        
        btnStatus.style.background = isConcluida ? '#51cf66' : '#eee';
        btnStatus.style.color = isConcluida ? 'white' : 'black';
        
        aplicarFiltro(); // Atualiza a visão se o usuário estiver em uma aba de filtro
    });

    listaUl.prepend(li);
}

// --- LÓGICA DAS ABAS (FILTRO) ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Estilo visual dos botões
        document.querySelector('.tab-btn.active').classList.remove('active');
        btn.classList.add('active');

        filtroAtual = btn.dataset.filter;
        aplicarFiltro();
    });
});

function aplicarFiltro() {
    const tarefas = document.querySelectorAll('.tarefa-item');
    
    tarefas.forEach(tarefa => {
        if (filtroAtual === 'todas') {
            tarefa.classList.remove('hidden');
        } else if (tarefa.dataset.status === filtroAtual) {
            tarefa.classList.remove('hidden');
        } else {
            tarefa.classList.add('hidden');
        }
    });
}
