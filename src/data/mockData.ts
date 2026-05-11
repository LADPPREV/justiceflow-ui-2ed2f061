export interface Advogado {
  id: string;
  nome: string;
  cpf: string;
  email: string;
}

export interface Movimentacao {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  advogado: string;
}

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  senhaINSS: string;
  beneficioDesejado: string;
  agenteCaso: string;
  indicadoPor?: string;
  movimentacoes: Movimentacao[];
}

export const advogadosMock: Advogado[] = [
  { id: "1", nome: "Dr. Carlos Mendes", cpf: "123.456.789-00", email: "carlos@escritorio.com" },
  { id: "2", nome: "Dra. Ana Beatriz Silva", cpf: "987.654.321-00", email: "ana@escritorio.com" },
  { id: "3", nome: "Dr. Roberto Almeida", cpf: "456.789.123-00", email: "roberto@escritorio.com" },
];

export const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "Maria da Silva Santos",
    cpf: "111.222.333-44",
    senhaINSS: "abc12345",
    beneficioDesejado: "Aposentadoria por Idade",
    agenteCaso: "Indicação",
    indicadoPor: "João Pereira (cliente antigo)",
    movimentacoes: [
      { id: "m1", titulo: "Protocolo inicial no INSS", descricao: "Protocolo inicial realizado junto ao INSS com toda a documentação básica do segurado.", data: "2024-01-15", advogado: "Dr. Carlos Mendes" },
      { id: "m2", titulo: "Juntada de documentos", descricao: "Juntada de documentos complementares solicitados pelo perito do INSS.", data: "2024-02-20", advogado: "Dra. Ana Beatriz Silva" },
      { id: "m3", titulo: "Perícia médica agendada", descricao: "Perícia médica agendada para 15/04/2024 na agência do INSS mais próxima.", data: "2024-03-10", advogado: "Dr. Carlos Mendes" },
    ],
  },
  {
    id: "2",
    nome: "José Pereira de Oliveira",
    cpf: "555.666.777-88",
    senhaINSS: "xyz98765",
    beneficioDesejado: "Auxílio-Doença",
    agenteCaso: "Instagram",
    movimentacoes: [
      { id: "m4", titulo: "Consulta inicial", descricao: "Consulta inicial e análise de documentação apresentada pelo cliente.", data: "2024-03-01", advogado: "Dr. Roberto Almeida" },
      { id: "m5", titulo: "Requerimento protocolado", descricao: "Requerimento administrativo protocolado junto ao INSS.", data: "2024-03-15", advogado: "Dr. Roberto Almeida" },
    ],
  },
  {
    id: "3",
    nome: "Ana Carolina Ferreira",
    cpf: "999.888.777-66",
    senhaINSS: "fer2024",
    beneficioDesejado: "BPC/LOAS",
    agenteCaso: "Facebook",
    movimentacoes: [
      { id: "m6", titulo: "CadÚnico verificado", descricao: "Cadastro no CadÚnico verificado e atualizado junto ao CRAS local.", data: "2024-02-10", advogado: "Dra. Ana Beatriz Silva" },
    ],
  },
  {
    id: "4",
    nome: "Francisco Alves Costa",
    cpf: "333.444.555-66",
    senhaINSS: "fac2023",
    beneficioDesejado: "Aposentadoria por Invalidez",
    agenteCaso: "Indicação",
    indicadoPor: "Dra. Paula Ramos",
    movimentacoes: [],
  },
];