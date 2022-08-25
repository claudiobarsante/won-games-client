import '@testing-library/jest-dom';
import 'jest-styled-components';//to improve snapshots
import dotenv from 'dotenv'; //https://www.npmjs.com/package/dotenv

dotenv.config({
  path: '.env.development'
})
