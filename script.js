const form = document.querySelector('#form-tarefa');
const listaUl = document.querySelector('#lista-tarefas');
const contadorElemento = document.querySelector('#contador');

let totalTarefas = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura dos dados
    const tarefa = {
        titulo: document.querySelector('#titulo').value,
        descricao: document.querySelector('#descricao').value,
        prioridade: document.querySelector('#prioridade').value,
        periodo: document.querySelector('#periodo').value
    };

    criarCardTarefa(tarefa);
    form.reset();
    atualizarContador(1);
});

function criarCardTarefa(tarefa) {
    const li = document.createElement('li');
    li.className = `tarefa-item prio-${tarefa.prioridade}`;

    li.innerHTML = `
        <div class="info">
            <strong style="display:block; font-size: 1.1rem;">${tarefa.titulo}</strong>
            <small style="color: #666;">${tarefa.descricao}</small>
            <div style="margin-top: 8px;">
                <span style="font-size: 0.75rem; background: #eee; padding: 3px 8px; border-radius: 10px;">
                    ⏱ ${tarefa.periodo.toUpperCase()}
                </span>
            </div>
        </div>
        <button class="btn-concluir" title="Marcar como finalizada">✓</button>
    `;

    // Evento de conclusão
    li.querySelector('.btn-concluir').addEventListener('click', function() {
        li.style.opacity = '0.4';
        li.style.textDecoration = 'line-through';
        this.remove(); // Remove o botão após concluir
        atualizarContador(-1);
    });

    listaUl.appendChild(li);
}

function atualizarContador(valor) {
    totalTarefas += valor;
    contadorElemento.innerText = totalTarefas;
}
