// using node-fetch ersion 2.6.1 for version 3 see for updates
global.fetch = require('node-fetch'); //https://www.npmjs.com/package/node-fetch


import { server } from '../src/utils/mockServer/server'

beforeAll(() => {
  // ficar escutando todas as chamadas nos testes
  server.listen()
})

afterEach(() => {
  // reseta todos os handlers para caso eles sejam chamados
  // novamente
  server.resetHandlers()
})

afterAll(() => {
  // fecha o server e limpa os testes
  server.close()
})

//! Do not define this mock in the setup.ts file because everytime
//! you create a new test it will run again the msw server
