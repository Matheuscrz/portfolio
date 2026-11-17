export type ProjectStatus = 'Em desenvolvimento' | 'Concluído' | 'Em estudo' | 'Pausado'

export type Project = {
  name: string
  status: ProjectStatus
  summary: string
  highlights: string[]
  tags: string[]
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'MarAberto',
    status: 'Em desenvolvimento',
    summary:
      'Plataforma open source de segurança balnear, prevenção de afogamentos e resposta rápida a emergências para praias e áreas litorâneas.',
    highlights: [
      'Monólito modular DDD em Java 21 + Spring Boot com PostgreSQL/PostGIS (geofencing e proximidade KNN)',
      'Despacho de SOS em tempo real via STOMP WebSockets + Outbox transacional e quórum comunitário',
      'Upload direto via Presigned URLs (Garage S3), busca fuzzy com pg_trgm e criptografia AES-256-GCM',
    ],
    tags: ['Java 21', 'Spring Boot', 'PostGIS', 'WebSockets', 'Redis', 'Garage S3', 'React PWA'],
    repo: 'https://github.com/Matheuscrz/MarAberto',
  },
  {
    name: 'ShopFlow',
    status: 'Pausado',
    summary:
      'E-commerce full-stack fictício: serviços documentados com ADRs, diagramas C4 e fluxo de dados.',
    highlights: [
      'Ports and Adapters (Hexagonal) em cada serviço',
      'CDC com Debezium e busca com Elasticsearch',
      'Gateway (Kong), identity-service com JWT e roles',
    ],
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Elasticsearch', 'Docker'],
    repo: 'https://github.com/Matheuscrz/ShopFlow',
  },
]