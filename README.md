# **Desafio técnico Smart NX**

Essa API foi criada com o propósito de satisfazer os requisitos do desafio técnico proposto pela empresa Smart NX.

O objetivo da API é de prover endpoints para um CRUD de posts: Inserir, Apagar, Alterar e Listar
posts. Também possui endpoints para adicionar um ou mais comentários a um post e apagar um comentário de um post.

# **Instalação**
## Instalar os seguintes softwares:

* Node
* MySql
* Redis
* DBeaver (opcional)
* VSCode
* yarn / npm
* Insomnia ou Postman
## Clone o repositório em sua máquina

* O arquivo .env.example está disponível no repositório para você colocar as informações do seu banco de dados.
* utilize o comando yarn ou npm para instalar as dependências necessárias do projeto.
* Utilize o DBeaver(opcional) ou o MySql Workbench para o acompanhamento das tabelas
* Insomnia para o envio de requisições
* *yarn dev* ou *yarn start* para subir a aplicação
<br/><br/>
# **Endpoints**

 ## Create Post

> ### [POST] BaseURL/post 
````
	{
		"text": "Exemplo de publicação"
	}
````
## Create Comment
> ### [POST] BaseURL/comment
````
	{
	    "idPost": "1",
	    "comment": "Exemplo de comentário"
    }
````
## Get Posts
> ### [GET] BaseURL/posts
````
````
## Get Post by Id
> ### [GET] BaseURL/post/id
````
````
## Update Post
> ### [PATCH] BaseURL/post/id
````
	{
		"text": "Exemplo de publicação"
    }
````
## Delete Post
> ### [Delete] BaseURL/post/id
````
````
## Delete Comment
> ### [Delete] BaseURL/comment/id
````
````



