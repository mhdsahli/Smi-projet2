export class News {

  constructor(
    public id: number = 1,
    public date: string = new Date().toISOString().split('T')[0],
    public titre: string = '',
    public description: string = '',
    public imageUrl: string = ''
  ) {}
}
