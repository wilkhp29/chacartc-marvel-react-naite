import Axios from 'axios';
import {characterRequest} from './types';
import {privateKey, publicKey} from './Access';
import md5 from 'md5';

const ts = 1585699200;
const hash = md5(`${ts}${privateKey}${publicKey}`);

const api = Axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
});

export const getCharacter = ({offset, limit}: characterRequest) =>
  api.get(
    `characters?limit=${limit}&offset=${offset}&apikey=${publicKey}&hash=${hash}&ts=${ts}`,
  );
