export default abstract class MMeta {
  id: number;

  name: string;

  constructor({ id, name }: IrMeta) {
    this.id = id;
    this.name = name;
  }
}
