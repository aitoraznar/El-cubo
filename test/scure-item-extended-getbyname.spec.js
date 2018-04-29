const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);

describe('El Cubo - item extended getByName', () => {
  it('gets a name without stop words', () => {
    const item = scure.items.getItemByName('dado');
    const item2 = scure.items.getItemByName('dado de 6 caras');
    const item3 = scure.items.getItemByName('dado de 6 lados');

    expect(item).to.eql(item2);
    expect(item).to.eql(item3);
  });

  it('gets a name with extra spaces', () => {
    const item = scure.items.getItemByName('dado');
    const item2 = scure.items.getItemByName('dado  de  6  caras');

    expect(item).to.eql(item2);
  });

  it('does not get an item when null', () => {
    const item = scure.items.getItemByName(null);
    expect(item).to.eql(null);
  });

  it('does not mix items with stopwords', () => {
    const item = scure.items.getItem('hab108-cama');
    const item2 = scure.items.getItemByName('mi');
    const item3 = scure.items.getItemByName('su');
    const item4 = scure.items.getItemByName('el');

    expect(item).to.eql(item2);
    expect(item3).to.eql(undefined);
    expect(item4).to.eql(undefined);
  });

  it('ignores - symbols', () => {
    const item = scure.items.getItemByName('diario de a-bordo');
    const item2 = scure.items.getItemByName('diario de abordo');

    expect(item).to.eql(item2);
  });

  xit('puts numbers together', () => {
    const item = scure.items.getItemByName('combinación 4 8 15');
    const item2 = scure.items.getItemByName('combinación 4815');

    expect(item.name).to.eql(item2.name);
  });
});
