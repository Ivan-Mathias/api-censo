# API censo USP

Esse é o repositório para a API do projeto de censo da USP.

Ele é composto por uma aplicação em [Node.js](https://nodejs.org/) que usa o framework [express](https://expressjs.com/pt-br/) para implementar uma arquitetura MVC.

## Requisitos

- [Node JS (LTS)](https://nodejs.org/en/download/) >= v14.17.1
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Instalação

Clone o repositório e rode os seguintes comandos dentro da pasta principal do projeto:
- `npm install` para instalar todas as dependências.
- `docker-compose up` para instanciar o container do banco de dados postgress.
- `npx prisma db push` para colocar todas as tabelas no banco de dados.

Antes de rodar o programa criar um arquivo .env com os segredos no molde encontrado em `.env.example`.

- `npm run dev` para inicializar o programa.

## Autores

Esse projeto foi desenvolvido por Ivan Mathias (ivanmathias@usp.br).
