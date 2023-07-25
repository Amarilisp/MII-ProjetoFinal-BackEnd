## PharmaSystem - Software para gestão de depósitos e medicamentos
<p>
Este programa tem como finalidade organizar o estoque de medicamentos das farmácias que ficam dentro dos postos de saúde da cidade.
Cada farmácia possui um estoque de medicamentos e por meio deste software será possível acompanhar todos os movimentos de todos os estoques. 
Como? Todo usuário terá um login, ou seja, uma identidade de usuario. Esse login nos permite saber quem cadastrou os produtos, os detalhes 
  dos medicamento, em qual estoque (farmácia) ele foi cadastrado, também mostra a exclusão, e quantidade de cada produto. É um sistema 
  integrado em rede que tem resposta rápida, organizada e clara.  Evitando atrasos e perdas de medicamentos. Resulta em um excelente sistema 
  de gerenciamento e monitoramento dos estoques das farmácias populares.
</p>

## O diagrama abaixo demonstra como as planilhas do banco de dados são conectadas:

<p float="left">

 <img src="https://github.com/Amarilisp/MII-ProjetoFinal-BackEnd/assets/86123419/0896fe1f-7a96-4a1b-9a30-61226916957b" width="200" />

</p>

## Para utilizar este projeto como base, faça o seguinte passo-a-passo:

Clone o projeto para a sua máquina:
No GitHub.com, navegue até a página principal do repositório.
Abra Git Bash.
Altere o diretório de trabalho atual para o local em que deseja ter o diretório clonado.
Digite git clone e cole a URL já copiada.
git clone (https://github.com/Amarilisp/MII-ProjetoFinal-BackEnd.git)
Pressione ENTER para criar seu clone local.

Obs: necessário configurar SSH [(veja como clicando aqui)](https://www.youtube.com/watch?v=n-H1eFSsugo)

Depois de clonado, abra o programa no VSCode ou outro de sua preferência e instale as dependências.
Nota - para rodar este comando é necessário ter instalado no computador o NodeJS e o Node Package Manager(NPM)
comece com npm install e coloque as dependencias citadas abaixo.


### Tecnologias utilizadas:
- NodeJS
- Express.js
- PostgresSQL

### Dependências utilizadas:
* cors
* dotenv
* express
* express-validator
* jsonwebtoken
* pg
* pg-connection-string
* sequelize
* sequelize-cli
* nodemon
 
- Rode o projeto, ainda no terminal, digite:
npm run start:dev

Não esqueça de configurar as variáveis de ambiente. 
Porta, banco de dados, senha... para se conectar ao seu banco de dados. 
Veja os requisitos necessários no arquivo .env_example salvo na pasta raiz do projeto.

### Lista de endpoints criados para esse Sistema

| Item       | Descrição                                            
| -----------| ---------------------------------------------------|
|  01        | Cadastro de Usuário                  							|
|  02        | Login do Usuário       											      |
|  03  	     | Atualização dos dados de Usuário            			  |
|  04        | Atualização do Status do Usuário no Sistema  			|        
|  05        | Atualização de Senha do Usuário 								    |
|  06        | Listagem de Usuário pelo identificador					  	|
|  07        | Cadastro de Depósito.											        |
|  08        | Atualização dos dados de Depósitos                 |
|  09        | Atualização do Status do Depósito no Sistema       |
|  10        | Listagem de Depósitos                  						|
|  11        | Listagem de Depósito pelo identificador       		  |
|  12        | Exclusão de Depósito            								    |
|  13    	   | Cadastro de Medicamento  										      |        
|  14 		   | Atualização dos dados de Medicamento							  |
|  15        | Listagem de Medicamentos										        |
|  16        | Listagem de Medicamento pelo identificador				  |
|  17        | Exclusão de Medicamento                           	|






## Autor

Amarilis Pequeno -
Aluna do curso Dev FullStack do
LAB365/2023
