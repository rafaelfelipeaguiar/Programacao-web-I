let dinheiro = 1000; // Valor inicial em reais

// Função para atualizar o relógio
function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  document.getElementById('relogio').innerText = `${horas}:${minutos}`;
}

// Função para atualizar o valor de "Dinheiro" na tela
function atualizarDinheiro() {
  document.getElementById('dinheiro').innerText = `Dinheiro: R$ ${dinheiro.toFixed(2).replace('.', ',')}`;
}

// Função para girar a roleta
function girarRoleta() {
  const roleta = document.getElementById('roleta');
  const agora = new Date();
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  
  // Ângulo para o item "Prêmio" e para itens "Perdeu"
  const anguloPremio = 0; // Ângulo correspondente ao item "Prêmio" (no topo)
  const perderPosicoes = [
    { angulo: 90, valor: -500 },
    { angulo: 180, valor: -1000 },
    { angulo: 270, valor: 20 }
  ]; // Ângulos e valores para os itens "Perdeu"
  
  // Verifica se é horário pagante
  let angulo;
  let valor;
  if ((horas === 19 && minutos === 50) || (horas === 20 && minutos === 22 ||
      horas === 19 && minutos === 40) || (horas === 20 && minutos === 10 ||
      horas === 19 && minutos === 30) || (horas === 20 && minutos === 35 ||
      horas === 20 && minutos === 5) || (horas === 20 && minutos === 30 ||
      horas === 20 && minutos === 0) || (horas === 20 && minutos === 15 ||
      horas === 20 && minutos === 45) || (horas === 20 && minutos === 25 ||
      horas === 19 && minutos === 45) || (horas === 20 && minutos === 20 ||
      horas === 19 && minutos === 55) || (horas === 20 && minutos === 40 ||
      horas === 21 && minutos === 10) || (horas === 21 && minutos === 50 ||
      horas === 21 && minutos === 20) || (horas === 22 && minutos === 0 ||
      horas === 21 && minutos === 30) || (horas === 22 && minutos === 30
  )) {
    angulo = anguloPremio;
    valor = 100000; // Valor do prêmio
  } else {
    // Seleciona aleatoriamente um dos itens "Perdeu"
    const itemPerdedor = perderPosicoes[Math.floor(Math.random() * perderPosicoes.length)];
    angulo = itemPerdedor.angulo;
    valor = itemPerdedor.valor;
  }
  
  // Remover transição temporariamente para redefinir o ângulo
  roleta.style.transition = 'none';
  roleta.style.transform = 'rotate(0deg)';
  
  // Forçar o navegador a aplicar o estilo anterior antes de adicionar a rotação (trigger reflow)
  requestAnimationFrame(() => {
    // Adicionar a transição de volta
    roleta.style.transition = 'transform 2s ease';
    // Definir o novo ângulo com várias voltas
    roleta.style.transform = `rotate(${angulo + 720}deg)`;
  });
  
  // Atualiza o valor de "Dinheiro" com base no resultado
  setTimeout(() => {
    dinheiro += valor; // Adiciona ou subtrai o valor
    atualizarDinheiro(); // Atualiza a exibição do dinheiro
    
    // Exibe a mensagem de vitória ou perda
    if (dinheiro <= 0) {
      document.getElementById('mensagemPerda').style.display = 'block';
    } else if (angulo === anguloPremio) {
      document.getElementById('mensagemVitoria').style.display = 'block';
    } else {
      alert(`Resultado: ${valor > 0 ? '+' : ''}R$ ${Math.abs(valor).toFixed(2).replace('.', ',')}`);
    }
  }, 2000);
}

// Função para fechar a mensagem de vitória
function fecharMensagem() {
  document.getElementById('mensagemVitoria').style.display = 'none';
}

// Função para recarregar a página (Depositar mais dinheiro)
function recarregarPagina() {
  location.reload();
}

// Atualizar o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
atualizarDinheiro(); // Inicializa o valor do dinheiro na tela
