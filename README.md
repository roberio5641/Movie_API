paizao
🎬 Movie Catalog API
Uma API RESTful completa para catálogo de filmes desenvolvida em Node.js com SQLite.

🚀 Tecnologias
Node.js - Ambiente de execução

Express.js - Framework web

SQLite - Banco de dados

Sequelize - ORM para SQLite

JWT - Autenticação

bcryptjs - Hash de senhas

Helmet - Segurança

CORS - Cross-Origin Resource Sharing

📦 Instalação
bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd API_Filmes

# Instale as dependências
npm install

# Execute o projeto
npm run dev
⚙️ Configuração
Crie um arquivo .env na raiz do projeto:

env
NODE_ENV=development
PORT=5000
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
🗄️ Estrutura do Projeto
text
movie-catalog-api/
│
├── src/
│   ├── config/
│   │   └── database.js      # Configuração SQLite
│   ├── controllers/         # Lógica dos endpoints
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   └── userController.js
│   ├── models/              # Modelos do banco
│   │   ├── User.js
│   │   ├── Movie.js
│   │   └── index.js
│   ├── routes/              # Definição de rotas
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── userRoutes.js
│   └── app.js               # Aplicação principal
│
├── database.sqlite          # Banco SQLite (criado automaticamente)
├── package.json
└── README.md
📋 Endpoints da API
🔐 Autenticação
Registrar Usuário
http
POST /auth/register
Body:

json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
Login
http
POST /auth/login
Body:

json
{
  "email": "joao@email.com",
  "password": "senha123"
}
🎬 Filmes
Listar Filmes
http
GET /movies
Query Params:

genre - Filtrar por gênero

year - Filtrar por ano

title - Filtrar por título

page - Paginação (padrão: 1)

limit - Limite por página (padrão: 10)

Exemplo:

http
GET /movies?genre=Ação&year=2020&page=1&limit=5
Detalhes do Filme
http
GET /movies/:id
Criar Filme
http
POST /movies
Headers:

text
Authorization: Bearer <token>
Body:

json
{
  "title": "Inception",
  "description": "Um ladrão que rouba segredos corporativos...",
  "genre": "Ficção Científica",
  "year": 2010,
  "director": "Christopher Nolan",
  "duration": 148,
  "cast": ["Leonardo DiCaprio", "Marion Cotillard"]
}
Avaliar Filme
http
POST /movies/:id/rate
Headers:

text
Authorization: Bearer <token>
Body:

json
{
  "rating": 4.5
}
Favoritar Filme
http
POST /movies/:id/favorite
Headers:

text
Authorization: Bearer <token>
👤 Usuário
Perfil do Usuário
http
GET /users/me
Headers:

text
Authorization: Bearer <token>
Favoritos do Usuário
http
GET /users/me/favorites
Headers:

text
Authorization: Bearer <token>
🎯 Exemplos de Uso
1. Registrar e Logar
bash
# Registrar
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria","email":"maria@email.com","password":"senha123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","password":"senha123"}'
2. Listar Filmes
bash
curl http://localhost:5000/movies
3. Criar Filme (com autenticação)
bash
curl -X POST http://localhost:5000/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token>" \
  -d '{
    "title": "The Matrix",
    "description": "Um hacker descobre a verdadeira natureza de sua realidade...",
    "genre": "Ficção Científica",
    "year": 1999,
    "director": "Lana Wachowski, Lilly Wachowski",
    "duration": 136
  }'
🔧 Desenvolvimento
bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start

# Verificar saúde da API
curl http://localhost:5000/health
🗃️ Modelos de Dados
User
javascript
{
  id: Integer,
  name: String,
  email: String,
  password: String (hashed),
  createdAt: DateTime,
  updatedAt: DateTime
}
Movie
javascript
{
  id: Integer,
  title: String,
  description: Text,
  genre: String,
  year: Integer,
  director: String,
  duration: Integer,
  averageRating: Float,
  createdAt: DateTime,
  updatedAt: DateTime
}
🛡️ Autenticação
A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

text
Authorization: Bearer <seu_jwt_token>
❌ Tratamento de Erros
A API retorna respostas padronizadas:

Sucesso:

json
{
  "data": {...}
}
Erro:

json
{
  "message": "Descrição do erro",
  "code": "CODIGO_ERRO"
}
📊 Status Codes
200 - Sucesso

201 - Criado com sucesso

400 - Requisição inválida

401 - Não autorizado

404 - Recurso não encontrado

500 - Erro interno do servidor

🚧 Próximas Funcionalidades
Upload de capas de filmes

Sistema de comentários

Recomendações personalizadas

Exportação de dados

Documentação Swagger/OpenAPI

🤝 Contribuição
Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Autor
Desenvolvido com ❤️ por [Seu Nome]

⭐️ Se este projeto te ajudou, deixe uma estrela no repositório!

🎉 Saúde da API
Para verificar se a API está funcionando:

bash
curl http://localhost:5000/health
Resposta esperada:

json
{
  "message": "API está funcionando!",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "database": "SQLite"
}
Agora é só começar a usar! 🚀🎬

