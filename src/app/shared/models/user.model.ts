export class User {
  constructor(
    public email: string,
    public password: string,
    public role?: string,
    public roleIndex?: number,
    public name?: string,
    public surname?: string,
    public photo?: string,
    public id?: number
  ) {}
}
