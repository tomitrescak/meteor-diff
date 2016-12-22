const expect = require('chai').expect;
const diff = require('..').DiffViewSimple;

describe('DiffViewSimple', () => {
  it('compare', () => {
    const a = 'mmmmmm';
    const b = 'mmmmmm\nnnnnn';

    expect(diff.compare(a, b).trim()).to.equal('+ (,2) nnnnn');
  });

  it('renderDelta', () => {
    const final = 'mmmmmm\nnnnnn';
    const history = [{delta: '+ (,1) mmmmmm'}, { delta: '+ (,3) nnnnn'}, { delta: '- (,3) nnnnn'}];

    expect(diff.renderDelta(history, 1, 0, '').trim()).to.equal('mmmmmm\n\nnnnnn');
  });
})