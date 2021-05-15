import { actions, dataWithInvalidEID, invalidBuffer, table } from './mock';
import { Parser } from '../src/parser';

const p = new Parser(actions);

describe('Parser', () => {
  it('should be equal', done => {
    const packed = p.pack(table);
    const unpacked = p.unpack(packed);
    expect(unpacked).toStrictEqual(table);
    done();
  });

  it('should be equal', done => {
    const packed = p.pack([]);
    const unpacked = p.unpack(packed);
    expect(unpacked).toStrictEqual([]);
    done();
  });

  it('should throw Error with message: \'Provided buffer has invalid length!\'', done => {
    expect(() => p.unpack(invalidBuffer))
      .toThrowError('Provided buffer has invalid length!');

    done();
  });

  it('should throw Error with message: \'Invalid entityId. entityId cant be negative!\'', done => {
    expect(() => p.pack(dataWithInvalidEID))
      .toThrowError('Invalid entityId. entityId cant be negative!');

    done();
  });
});
