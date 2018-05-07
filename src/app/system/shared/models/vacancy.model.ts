export class Vacancy {
  constructor(
    public position: string,
    public experience: string,
    public salary: number,
    public date: Date,
    public id?: number
  ) {}
}
