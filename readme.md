
# Full-Stack Development Challenge

GITHUB PRINCIPAL: https://github.com/gustavodalves

As variaveis de ambiente estão num exemplo .env.example, no Docker Compose ja tem tudo configurado pra funcionar o projeto, porém precisa criar um arquivo .env com as variaveis de ambiente configuradas., para rodar as Seeders e Migrations.

Este projeto foi desenvolvido como parte de um desafio para demonstrar habilidades de desenvolvimento Full-Stack, com ênfase na modelagem de domínio, arquitetura limpa e boas práticas de software. A aplicação utiliza uma abordagem de Domain-Driven Design (DDD) para modelar as entidades e garantir que a lógica de negócio esteja bem encapsulada.

## Estrutura e Arquitetura

O projeto foi modelado utilizando os seguintes padrões de projeto:

- **Domain-Driven Design (DDD)**: A estrutura do sistema segue os princípios do DDD, com uma clara separação entre as camadas de domínio e infraestrutura.
- **Inversão de Dependência**: Foi aplicado o princípio de inversão de dependência para desacoplar as camadas do sistema, facilitando a realização de testes e promovendo um design mais limpo.
- **Ports and Adapters**: Utilizando esse padrão para garantir que a lógica de domínio esteja isolada da infraestrutura (banco de dados, etc.), o que torna o sistema mais testável e flexível.

### Sem ORM

Em vez de utilizar um ORM (Object-Relational Mapping), foi feito o gerenciamento do banco de dados manualmente para demonstrar o conhecimento em SQL. O sistema de **migrations** e **seeders** foi implementado de forma personalizada, permitindo controle total sobre a criação e popularção do banco de dados.

### Banco de Dados

O projeto interage com um banco de dados MySQL, utilizando containers. As tabelas `company`, `driver` e `vehicle` são manipuladas diretamente via SQL.

### Funcionalidades

O backend fornece os seguintes endpoints:

1. **GET /api/v1/driver/:driver_id/vehicles**: Lista os veículos de um motorista em uma empresa.
2. **POST /api/v1/vehicle**: Cria um novo veículo.

No frontend, a interface foi construída utilizando **React** e **React Router**, permitindo que os usuários visualizem a lista de veículos e criem novos veículos, foi utilizado em uma única página.

### Tecnologias Utilizadas

- **Backend**:
  - Node.js v12+
  - Express
  - MySQL (sem ORM, SQL puro)
  - Migrations e Seeders personalizados
  - Inversão de Dependência
  - Padrões de design como DDD, Entity, Value Object e Aggregate
  - Testes com Jest

- **Frontend**:
  - React
  - React Router
  - Testes com Vitest
  - Tailwind

- **Banco de Dados**:
  - MySQL
  - Tabelas: `company`, `driver`, `vehicle`

## Como Rodar a Aplicação

1. Abra a pasta `server` no seu terminal.
2. Lá você encontrará um arquivo `docker-compose.yml` que já está configurado para rodar a aplicação com Docker.
3. Para rodar a aplicação, execute o seguinte comando:

   ```bash
   docker-compose up
   ```

4. Para rodar as migrations e seeders, utilize os seguintes comandos:

   - **Rodar Migrations**:

     ```bash
     npx ts-node ./src/command/infra/database/mysql/config/migrations/create-migration.ts
     ```

   - **Rodar Seeders**:

     ```bash
     npx ts-node ./src/command/infra/database/mysql/config/seeds/run-seeds.ts
     ```

   **Observação:** O `docker-compose` já está configurado para rodar a aplicação. Esses comandos apenas executam as migrations e seeders quando a aplicação estiver rodando.
