export type Project = {
  name: string
  status: 'Em desenvolvimento' | 'Concluído' | 'Em estudo'
  summary: string
  highlights: string[]
  tags: string[]
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'ShopFlow',
    status: 'Em desenvolvimento',
    summary:
      'E-commerce full-stack fictício: serviços documentados com ADRs, diagramas C4 e fluxo de dados.',
    highlights: [
      'Ports and Adapters (Hexagonal) em cada serviço',
      'CDC com Debezium e busca com Elasticsearch',
      'Gateway (Kong), identity-service com JWT e roles',
    ],
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Elasticsearch', 'Docker'],
    repo: 'https://github.com/Matheuscrz/ShopFlow',
  }
]
