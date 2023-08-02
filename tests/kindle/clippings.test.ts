import { KindleClippingsParser } from '../../src/kindle/clippings';

describe('testing title & author line parsing', () => {
  let parser = new KindleClippingsParser();

  test('without nonstandard characters', () => {
    let input = "Eating Animals (Foer, Jonathan Safran)";
    let [title, authors] = parser.parse_clippings_title_authors(input);
    expect(title).toBe("Eating Animals");
    expect(authors).toBe(["Foer, Jonathan Safran"]);
  });

  test('stripping nonstandard characters', () => {
    // trust me this input is different that the previous
    let input = "Eating Animals (Foer, Jonathan Safran)";
    let [title, authors] = parser.parse_clippings_title_authors(input);
    expect(title).toBe("Eating Animals");
    expect(authors).toBe(["Foer, Jonathan Safran"]);
  });

  test('multiple authors', () => { // TODO
  });
});
// TODO add a bunch of lines from my clippings file and unit test these
// TODO commit hook for running unit tests