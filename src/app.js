/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

class Produto {
  constructor({
    code, description, buyPrice, sellPrice, tags,
  }) {
    this.id = uuid();
    this.code = code;
    this.description = description;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.tags = tags;
    this.lovers = 0;
  }
}

let products = [	
//   {
//   code: 1,
//   description: "Teste teste",
//   buyPrice: 10.00,
//   sellPrice: 800.00,
//   tags: ["tecnologia', 'computador', 'gamer"],
//   lovers: 18
// }
];

app.get('/products', (request, response) => {
  // TODO: listagem de todos os produtos
  response.status(200).json(products);
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const { code } = request.body;

  const novoProduto = new Produto(request.body);

  const codeCadastrado = products.find(v => v.code == code);

  if (codeCadastrado) {
    novoProduto.lovers = codeCadastrado.lovers;
  }
    products.push(novoProduto);
    response.status(201).json(novoProduto);
});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const id = request.params.id;

  const {code, description, buyPrice, sellPrice, tags} = request.body;

  let produto = products.find(v => v.id == id);

  if(produto != undefined) {
    produto.code = code; 
    produto.description = description; 
    produto.buyPrice = buyPrice; 
    produto.sellPrice = sellPrice; 
    produto.tags = tags;
    response.status(200).json(produto); 
  } else {
    response.status(400).send();
    }
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const {code} = request.params;

  const index = products.findIndex((value) => value.code == code);
  
  if(index == -1) {
    response.status(400).send();
  } else {
    products.splice(index, 1);
    response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  const {code} = request.params;

  let newProducts = products.filter(v => v.code == code);

  newProducts.map(v => v.lovers = v.lovers+=1);

  response.status(200).json(newProducts[0]);
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;

  let newProducts = products.filter(v => v.code == code);

  response.status(200).json(newProducts);
});

export default app;
