const form = document.querySelector('#form-tarefa');
const listaUl = document.querySelector('#lista-tarefas');
const tabBtns = document.querySelectorAll('.tab-btn');

let tarefas = JSON.parse(localStorage.getItem('tasks')) || [];
let filtroAtual = 'todas';

renderizarTarefas();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const novaTask = {
        id: Date.now(),
        titulo: document.querySelector('#titulo').value,
        descricao: document.querySelector('#descricao').value,
        prioridade: document.querySelector('#prioridade').value,
        periodo: document.querySelector('#periodo').value,
        status: 'andamento'
    };
    tarefas.push(novaTask);
    salvarERenderizar();
    form.reset();
});

function renderizarTarefas() {
    listaUl.innerHTML = '';
    const filtradas = tarefas.filter(t => filtroAtual === 'todas' || t.status === filtroAtual);
    
    filtradas.sort((a, b) => a.prioridade - b.prioridade);

    filtradas.forEach(t => {
        const li = document.createElement('li');
        li.className = `tarefa-item prio-${t.prioridade} ${t.status === 'finalizadas' ? 'concluida' : ''}`;
        
        li.innerHTML = `
            <div class="info">
                <strong>${t.titulo}</strong>
                <p>${t.descricao}</p>
                <small>${t.periodo.toUpperCase()}</small>
            </div>
            <div class="actions">
                <button class="btn-check" onclick="toggleStatus(${t.id})" title="Concluir/Desmarcar">
                    ${t.status === 'finalizadas' ? '↩' : '✓'}
                </button>
                <button class="btn-delete" onclick="deletarTarefa(${t.id})" title="Excluir">✕</button>
            </div>
        `;
        listaUl.appendChild(li);
    });

    document.getElementById('empty-state').className = filtradas.length === 0 ? '' : 'hidden';
}

function toggleStatus(id) {
    tarefas = tarefas.map(t => {
        if(t.id === id) t.status = t.status === 'andamento' ? 'finalizadas' : 'andamento';
        return t;
    });
    salvarERenderizar();
}

function deletarTarefa(id) {
    if(confirm("Deseja excluir esta tarefa?")) {
        tarefas = tarefas.filter(t => t.id !== id);
        salvarERenderizar();
    }
}

function salvarERenderizar() {
    localStorage.setItem('tasks', JSON.stringify(tarefas));
    renderizarTarefas();
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tab-btn.active').classList.remove('active');
        btn.classList.add('active');
        filtroAtual = btn.dataset.filter;
        renderizarTarefas();
    });
});

document.getElementById('data-atual').innerText = new Date().toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });
