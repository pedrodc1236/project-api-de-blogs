<h1 align="center"> Projeto API de Blogs 💻 </h1>
 
 <div align="center">

 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
 ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
 ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
 ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

</div>
<br/> <br/>

<h2 align="left"> Sobre: </h2>

<p> Nesse projeto foi desenvolvida uma aplicação em Node.js usando o pacote sequelize para fazer um CRUD de posts. Onde foi criado endpoints que foram conectados ao banco de dados seguindo os princípios do REST.
</p>

<p> 
Para a autenticação dos usuários foi utilizado o método JWT.

Amei trabalhar utilizando Sequelize, facilitou bastante o trabalho e deixou o código mais limpo (sem queries), oque torna a manutenção mais fácil. </p>

## Foram aplicadas as seguintes tecnologias no projeto:

- Node.js;
- Express.js;
- JWT;
- Sequelize/CLI
- MySql;
- Arquitetura de Software
- Sequelize/CLI
- Nodemon
- Docker
- CRUD

## Rodando o projeto localmente:

```bash
git@github.com:pedrodc1236/project-api-de-blogs.git
cd project-api-de-blogs/
npm install
npm start
```

Usando docker

```bash
docker-compose up -d
docker exec -it <container node> bash
npm install
npm run db
npm start 
```
