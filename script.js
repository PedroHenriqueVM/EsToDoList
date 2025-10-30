// ======= EsToDoList =======
// CRUD Básico de Tarefas
// Objetivo: Aprender JavaScript com exemplos básicos
// ============

// 1 - Selecionar os elementos da página
const campoNovaTarefa = document.getElementById('nova-tarefa-input')
console.log(campoNovaTarefa)

const botaoAdicionar = document.getElementById('adicionar-btn')
console.log(botaoAdicionar)

const listaTarefas = document.getElementById('lista-de-tarefas')
const campoPesquisa = document.getElementById('pesquisa-input')
const seletorFiltro = document.getElementById('filtro-select')

// Array principal que armazenará todas as tarefas
let tarefas = []

// 2 - Função para carregar tarefas salvas no navegador (localStorage)
function carregarTarefasSalvas(){
    const tarefasSalvas = localStorage.getItem('tarefas')
    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas) // converte o texto para array/json
        exibirTarefas(tarefas)
    }
}

// 3 - Função que irá salvar as tarefas no navegador
function salvarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// 4 - Função para adicionar uma nova tarefa
function adicionarTarefa(){
   let textoTarefa = campoNovaTarefa.value.trim() // remove espaços em branco

   if (textoTarefa === ""){
    alert('Digite uma nova tarefa antes de adicionar!')
    return
   }

   const novaTarefa = {
    id: Date.now(),
    texto: textoTarefa,
    concluida: false
   }

   // Adicionamos a nova tarefa ao array e salvamos no navegador
   tarefas.push(novaTarefa)
   salvarTarefas()

   // Atualizamos a lista de tarefas
   exibirTarefas(tarefas)

   // Limpamos o campo de texto/input
   campoNovaTarefa.value =''
}

// 5 - Função para mostrar as tarefas no navegador
function exibirTarefas(listaParaMostrar){
    // Limpar as tarefas antes de exibir
    listaTarefas.innerHTML = ''

    // Se não houver tarefas, mostra mensagem
    if (!listaParaMostrar || listaParaMostrar.length === 0) {
        const liVazio = document.createElement('li')
        liVazio.className = 'text-center p-3 text-zinc-600 dark:text-zinc-300'
        liVazio.textContent = 'Nenhuma tarefa encontrada'
        listaTarefas.appendChild(liVazio)
        return
    }

    // Estrutura de repetição para adicionar novas tarefas
    for (let tarefa of listaParaMostrar){

        // Criar um <li> para cada tarefa
        const item = document.createElement('li')
        item.className = `
            flex justify-between items-center p-3 
            border rounded-lg shadow-sm 
            bg-white dark:bg-zinc-700 
            hover:bg-gray-100 dark:hover:bg-zinc-600 
            transition duration-150
            ${tarefa.concluida ? 'opacity-75' : ''}
        `

        // Criar um span para o texto da tarefa
        const textoTarefa = document.createElement('span')
        textoTarefa.textContent = tarefa.texto
        
        // Define classes base e condicionais para o texto
        textoTarefa.className = `
            flex-grow cursor-pointer select-none
            text-zinc-900 dark:text-zinc-100
            ${tarefa.concluida ? 'line-through text-zinc-500 dark:text-zinc-400' : ''}
        `

        textoTarefa.onclick = () => alternarConclusao(tarefa.id)

        // Criar os botões
        const botoes = document.createElement('div')
        botoes.className = 'flex space-x-2'

        const botaoEditar = document.createElement('button')
        botaoEditar.className = 'p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-150'
        botaoEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/>
            </svg>
        `
        botaoEditar.onclick = (ev) => {
            ev.stopPropagation()
            editarTarefa(tarefa.id)
        }

        const botaoExcluir = document.createElement('button')
        botaoExcluir.className = 'p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-150'
        botaoExcluir.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
            </svg>
        `
        botaoExcluir.onclick = (ev) => {
            ev.stopPropagation()
            excluirTarefa(tarefa.id)
        }

        // Montagem do elemento
        botoes.appendChild(botaoEditar)
        botoes.appendChild(botaoExcluir)
        item.appendChild(textoTarefa)
        item.appendChild(botoes)
        listaTarefas.appendChild(item)
    }
}

// 6. Função para alternar entre concluída e ativa
function alternarConclusao(id) {
    for (let tarefa of tarefas){
        if (tarefa.id === id ){
            tarefa.concluida = !tarefa.concluida
        }
    }
    salvarTarefas()
    exibirTarefas(tarefas)
}

// 7. Função para editar o texto de uma tarefa
function editarTarefa(id){
    const novaDescricao = prompt('Edite a tarefa: ')
    if (novaDescricao === null || novaDescricao.trim() === ""){
        return // Se cancelar ou deixar em branco não faz nada
    }
    for (let tarefa of tarefas){
        if (tarefa.id === id){
            tarefa.texto = novaDescricao.trim()
        }
    }

    salvarTarefas()
    exibirTarefas(tarefas)
}

// 8. Função para excluir uma tarefa
function excluirTarefa(id) {
    const confirmar = window.confirm('Você realmente deseja excluir a tarefa?')

    if (confirmar) {
        tarefas = tarefas.filter(function (tarefa){
            return tarefa.id !== id
        })
        salvarTarefas()
        exibirTarefas(tarefas)
    }
}

// -------------------------------
// 9. Função de pesquisa
// -------------------------------
function pesquisarTarefas() {
  const termo = campoPesquisa.value.toLowerCase()
  const filtradas = tarefas.filter(function (tarefa) {
    return tarefa.texto.toLowerCase().includes(termo)
  })
  exibirTarefas(filtradas)
}

// -------------------------------
// 10. Filtro: todos / ativos / concluídos
// -------------------------------
function filtrarTarefas() {
  const tipo = seletorFiltro.value
  let filtradas = []

  if (tipo === 'todos') {
    filtradas = tarefas
  } else if (tipo === 'ativos') {
    filtradas = tarefas.filter(tarefa => !tarefa.concluida)
  } else if (tipo === 'concluidos') {
    filtradas = tarefas.filter(tarefa => tarefa.concluida)
  }

  exibirTarefas(filtradas)
}

// -------------------------------
// 11. Eventos (interações do usuário)
// -------------------------------
botaoAdicionar.addEventListener('click', adicionarTarefa)
campoPesquisa.addEventListener('input', pesquisarTarefas)
seletorFiltro.addEventListener('change', filtrarTarefas)

// -------------------------------
// 12. Permitir adicionar tarefa ao pressionar Enter
// -------------------------------
campoNovaTarefa.addEventListener('keydown', function (evento) {
  // Verifica se a tecla pressionada foi "Enter"
  if (evento.key === 'Enter') {
    adicionarTarefa()
  }
})

// -------------------------------
// 13. Quando a página carregar, buscamos as tarefas salvas
// -------------------------------
window.onload = carregarTarefasSalvas