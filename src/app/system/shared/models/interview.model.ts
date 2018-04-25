export class Interview  {
  constructor(
    public id: number,
    public title: string,
    public allDay: boolean,
    public start: Date,
    public end: Date,
    public color: string,
    public participant: string,
    public participantIndex: number,
    public location: string,
    public description: string
  ) {}
}
