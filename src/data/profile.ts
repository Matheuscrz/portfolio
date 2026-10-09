export const profile = {
  name: 'Matheus Lima da Cruz',
  title: 'Desenvolvedor Java & Spring Boot',
  subtitle: 'Foco em backend, com atuação fullstack',
  location: 'Aracaju, Sergipe',
  about:
    'Construo sistemas internos de ponta a ponta, do levantamento de requisitos ao deploy. No dia a dia: APIs REST em Java 21 e Spring Boot com DDD, CI/CD com Docker e Jenkins, e interfaces em React para fechar o ciclo. Minha base em infraestrutura e redes me dá uma visão sistêmica do que desenvolvo.',
  links: {
    github: 'https://github.com/Matheuscrz',
    linkedin: 'https://www.linkedin.com/in/matheuslcz',
    email: 'mailto:matheuslimasof.eng@gmail.com',
  },
}

export const stack = [
  { group: 'Backend', main: true, items: ['Java 21', 'Spring Boot', 'Hibernate/JPA', 'DDD', 'Arquitetura Hexagonal', 'REST', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Keycloak', 'Kafka (estudo)'] },
  { group: 'DevOps & Infra', main: true, items: ['Docker', 'Docker Swarm', 'Jenkins', 'Nginx', 'MinIO', 'Redes (VLAN, firewall)'] },
  { group: 'Frontend', main: false, items: ['React', 'TypeScript', 'TailwindCSS'] },
]

export const experience = [
  {
    role: 'Desenvolvedor de Software Júnior',
    org: 'Sergipe Parque Tecnológico (SergipeTec)',
    period: 'mai/2024 – atual',
    points: [
      'Ciclo completo de sistemas internos: requisitos, modelagem, implementação e deploy',
      'APIs REST em Java 21 e Spring Boot com DDD/MVC, testes unitários e de integração',
      'CI/CD com Docker e Jenkins, orquestração em Docker Swarm',
      'PostgreSQL, Redis e RabbitMQ; interfaces em React e TailwindCSS',
    ],
  },
  {
    role: 'Estagiário de TI',
    org: 'SergipeTec',
    period: 'set/2023 – abr/2024',
    points: [
      'Primeiras entregas em Java e Spring Boot e apoio ao levantamento de requisitos',
      'Ajustes de CI/CD e configuração de MinIO, RabbitMQ e Redis',
    ],
  },
  {
    role: 'Estagiário de TI',
    org: 'SEJUC – Secretaria de Estado da Justiça',
    period: 'ago/2021 – ago/2023',
    points: ['Suporte técnico, infraestrutura, redes e manutenção de sistemas'],
  },
]
