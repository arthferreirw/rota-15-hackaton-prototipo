export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    link: string;
  };
}

export const initialAgentMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'agent',
    text: 'Olá! Sou o **Assistente Virtual Rota Gastronômica** 🤖. Analisei os dados mais recentes do restaurante **Sabor & Arte** em Viçosa-MG.',
    timestamp: '15:30'
  },
  {
    id: 'm2',
    sender: 'agent',
    text: 'Identifiquei **3 pontos de atenção** na sua operação:\n1. 🥩 **Oportunidade**: Entrar no Cluster C08 de Carne Bovina pode economizar **R$ 384/mês**.\n2. 🔴 **Alerta**: O Prato Executivo está com margem baixa (22.8%).\n3. 🟡 **Desperdício**: Perda de hortaliças 22% acima da média.\n\nComo posso ajudar você hoje?',
    timestamp: '15:30'
  }
];

export const queryAiKnowledgeBase = (query: string): { text: string; actionButton?: { label: string; link: string } } => {
  const q = query.toLowerCase();

  if (q.includes('margem') || q.includes('lucro') || q.includes('rentabilidade')) {
    return {
      text: 'Sua **margem de lucro atual é 29.8%** (R$ 15.610/mês de lucro líquido sobre R$ 52.430 de faturamento).\n\n💡 **Destaques de Cardápio**:\n• **Maior margem**: Porção de Batata Frita (68%) e Suco Natural (65%).\n• **Menor margem**: Prato Executivo (22.8%) — recomendo simular um reajuste de R$ 3,00.',
      actionButton: { label: 'Ver Rentabilidade', link: '/rentabilidade' }
    };
  }

  if (q.includes('desperdicio') || q.includes('desperdício') || q.includes('perda') || q.includes('estoque')) {
    return {
      text: '⚠️ O seu maior gargalo de desperdício é a **Alface Americana**, com custo de **R$ 480/mês em descarte** (7kg descartados).\n\n💡 **Recomendação**: Altere a frequência de entrega com o *Hortifruti Santa Rita* de semanal para 2x por semana.',
      actionButton: { label: 'Gerenciar Estoque', link: '/estoque' }
    };
  }

  if (q.includes('carne') || q.includes('cluster') || q.includes('compra coletiva') || q.includes('c08')) {
    return {
      text: '🥩 O **Cluster C08 (Proteínas e Carnes)** reúne 12 estabelecimentos de Viçosa. Comprando carne bovina (patinho/coxão) em conjunto com o *Frigorífico Zona da Mata*:\n\n• **Preço varejo**: R$ 32,00/kg\n• **Preço negociado**: R$ 27,20/kg (-15%)\n• **Sua economia**: R$ 384,00/mês (baseado em 80kg/mês).',
      actionButton: { label: 'Participar da Compra Coletiva', link: '/compra-coletiva' }
    };
  }

  if (q.includes('diagnostico') || q.includes('diagnóstico') || q.includes('saude') || q.includes('resumo')) {
    return {
      text: '📊 **Diagnóstico Operacional Integrado**:\n\n1. **Financeiro**: Faturamento saudável (R$ 52,4k), mas Insumos consomem 54% dos custos.\n2. **Compras**: Você está pagando preço de varejo no tomate (R$ 8,90/kg) enquanto fornecedores parceiros oferecem por R$ 7,20/kg.\n3. **Geoespacial**: Seu restaurante está em uma zona 100% andável (Centro/Ramos), com alta densidade de clientes.',
      actionButton: { label: 'Ver Comparativo de Preços', link: '/comparar-precos' }
    };
  }

  if (q.includes('fornecedor') || q.includes('preço') || q.includes('preco') || q.includes('tomate')) {
    return {
      text: '🛒 Encontrei diferenças de preço em Viçosa:\n\n• **Tomate Italiano**: O *Hortifruti Santa Rita* está R$ 7,20/kg vs R$ 8,90/kg no Mercado Central.\n• **Economia estimada**: R$ 255/mês trocando de fornecedor.',
      actionButton: { label: 'Comparar Fornecedores', link: '/comparar-precos' }
    };
  }

  return {
    text: 'Entendi sua dúvida! Posso ajudar analisando sua **margem de lucro**, **alertas de desperdício**, **compras coletivas de carne** ou **preços de fornecedores em Viçosa**. O que deseja consultar?',
  };
};
