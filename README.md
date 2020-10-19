# banco-capgemini-front

Estrutura

> /var/www/html
>
banco-capgemini
>
>back
>
>front 

- Criar uma pasta www/html/banco-capgemini:
    >  mkdir /var/www/html/banco-capgemini
                                                
- Dentro da pasta criada acima, clonar o repositório front-end:
    > git clone https://github.com/marcospmsantos/banco-capgemini-front.git front
                                                                 
- Entrar na pasta <strong>front</strong>:
    > cd /var/www/html/banco-capgemini/front
                                            
- Criar um arquivo .env & ajustar user (VUE_APP_CLIENT_ID) e password (VUE_APP_CLIENT_SECRET) com os dados da tabela (oauth_clients->id e oauth_clients->secret, respectivamente) do banco, e ajustar a URL da API (VUE_APP_API e VUE_APP_BASE_URL)
     > sudo cp .env.example .env && sudo chmod 777 -R .env
                  
- Instalar as dependências:                  
    > yarn install ou npm install

- Rodar servidor:
    > yarn serve ou npm run servve
