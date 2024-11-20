// // src/services/log.service.js
// const calcularTempoMedioPorPagina = (logs) => {
//     const pageTimes = {};
//     logs.forEach(log => {
//       const { detalhes, timestamp } = log;
//       const page = detalhes.split(' ')[4]; // Exemplo de como extrair a página dos detalhes
//       const timeSpent = new Date(timestamp).getTime();
  
//       if (!pageTimes[page]) {
//         pageTimes[page] = [];
//       }
//       pageTimes[page].push(timeSpent);
//     });
  
//     const avgPageTimes = {};
//     for (const page in pageTimes) {
//       const times = pageTimes[page];
//       const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
//       avgPageTimes[page] = avgTime;
//     }
  
//     return avgPageTimes;
//   };
  
//   const calcularPadroesDeNavegacao = (logs) => {
//     const navigationPatterns = {};
//     logs.forEach(log => {
//       const { id_usuario, acao } = log;
//       if (!navigationPatterns[id_usuario]) {
//         navigationPatterns[id_usuario] = [];
//       }
//       navigationPatterns[id_usuario].push(acao);
//     });
  
//     return navigationPatterns;
//   };
  
//   const calcularMomentosDePico = (logs) => {
//     const usageTimes = {};
//     logs.forEach(log => {
//       const { timestamp } = log;
//       const hour = new Date(timestamp).getHours();
//       if (!usageTimes[hour]) {
//         usageTimes[hour] = 0;
//       }
//       usageTimes[hour]++;
//     });
  
//     return usageTimes;
//   };
  
//   const calcularMetricas = (logs) => {
//     const tempoMedio = calcularTempoMedioPorPagina(logs);
//     const padroesNavegacao = calcularPadroesDeNavegacao(logs);
//     const momentosPico = calcularMomentosDePico(logs);
  
//     return {
//       tempoMedio,
//       padroesNavegacao,
//       momentosPico
//     };
//   };
  
//   module.exports = { calcularMetricas };
  

const calcularTempoMedioPorPagina = (logs) => {
  const pageTimes = {};
  logs.forEach(log => {
    const { pageUrl, duracao } = log;  // Pega o tempo de duração e a URL da página
    if (!pageTimes[pageUrl]) {
      pageTimes[pageUrl] = [];
    }
    pageTimes[pageUrl].push(duracao);  // Adiciona a duração ao tempo total da página
  });

  const avgPageTimes = {};
  for (const page in pageTimes) {
    const times = pageTimes[page];
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length; // Média de tempo por página
    avgPageTimes[page] = avgTime;
  }

  return avgPageTimes;
};

const calcularPadroesDeNavegacao = (logs) => {
  const navigationPatterns = {};
  logs.forEach(log => {
    const { sessionId, acao } = log;  // Pega o ID da sessão e a ação (como navegação)
    if (!navigationPatterns[sessionId]) {
      navigationPatterns[sessionId] = [];
    }
    navigationPatterns[sessionId].push(acao);  // Adiciona a ação ao padrão de navegação
  });

  return navigationPatterns;
};

const calcularMomentosDePico = (logs) => {
  const usageTimes = {};
  logs.forEach(log => {
    const { timestamp } = log;  // Usa o timestamp para calcular momentos de pico
    const hour = new Date(timestamp).getHours();
    if (!usageTimes[hour]) {
      usageTimes[hour] = 0;
    }
    usageTimes[hour]++;
  });

  return usageTimes;
};

const calcularMetricas = (logs) => {
  const tempoMedio = calcularTempoMedioPorPagina(logs);
  const padroesNavegacao = calcularPadroesDeNavegacao(logs);
  const momentosPico = calcularMomentosDePico(logs);

  return {
    tempoMedio,
    padroesNavegacao,
    momentosPico
  };
};

module.exports = { calcularMetricas };