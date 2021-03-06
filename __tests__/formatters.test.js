import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadSource } from '../src/utils';
import { getFormatter } from '../src/formatters';

/* eslint-disable */
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
/* eslint-enable */

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', 'formatters', fileName);

const sources = [
  loadSource(getFixturePath('simpleValues.json')),
  loadSource(getFixturePath('nestedValue.json')),
  loadSource(getFixturePath('fullComplexTest.json')),
];

test.each(sources)('%s', (title, source) => {
  expect(getFormatter('jsonLike').format(source.tree)).toEqual(source.jsonLike);
  expect(getFormatter('plain').format(source.tree)).toEqual(source.plain);
  expect(getFormatter('json').format(source.tree)).toEqual(source.json);
});
