import { raw } from './raw';


export class Parser {
  readonly actions;
  readonly MAX_VALUE = Math.pow(2, 32) - 1;

  constructor(actions) {
    this.actions = actions;
  }

  public pack(table: Array<raw>): Buffer {
    let buffer: Buffer = Buffer.alloc(0);
    table.forEach(raw => {
      buffer = Buffer.concat([buffer, this.serialize(raw)]);
    });

    return buffer;
  }

  public unpack(buffer: Buffer): Array<raw> {
    if (buffer.length && buffer.length % 5)
      throw new Error('Provided buffer has invalid length!');

    const result = [];
    for (let offset = 0; offset < buffer.length; offset += 5) {
      result.push(this.deserialize(buffer, offset));
    }

    return result;
  }

  private serialize(data: raw): Buffer {
    if (data.entityId < 0) throw new Error('Invalid entityId. entityId cant be negative!');

    const buf = Buffer.alloc(5);
    buf.writeInt8(this.actions[data.action]);

    if (data.entityId === 'All')
      buf.writeUInt32BE(this.MAX_VALUE, 1);
    else
      buf.writeUInt32BE(data.entityId, 1);

    return buf;
  }

  private deserialize(buffer: Buffer, offset: number): raw {
    const action = this.actions[buffer.readUInt8(offset)];
    const eId = buffer.readUInt32BE(++offset);

    return {
      action,
      entityId: eId === this.MAX_VALUE ? 'All' : eId,
    };
  }

}


