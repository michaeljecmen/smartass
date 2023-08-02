import {KindleClippingsParser} from '../../src/kindle/clippings';

describe('testing title & author line parsing', () => {
  const parser = new KindleClippingsParser();

  test('without nonstandard characters', () => {
    const input = 'Eating Animals (Foer, Jonathan Safran)';
    const [title, authors] = parser.parse_clippings_title_authors(input);
    expect(title).toStrictEqual('Eating Animals');
    expect(authors).toStrictEqual(['Foer, Jonathan Safran']);
  });

  test('stripping nonstandard characters', () => {
    // trust me this input is different that the previous
    const input = 'Eating Animals (Foer, Jonathan Safran)';
    const [title, authors] = parser.parse_clippings_title_authors(input);
    expect(title).toStrictEqual('Eating Animals');
    expect(authors).toStrictEqual(['Foer, Jonathan Safran']);
  });

  test('multiple authors', () => {
    // TODO
  });
});
// TODO add a bunch of lines from my clippings file and unit test these
// TODO commit hook for running unit tests
