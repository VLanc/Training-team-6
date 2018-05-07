export class Candidate {
  constructor(
    public id: number,
    public date: string,
    public position: string,
    public status: string,
    public name: string,
    public address: string,
    public city: string,
    public email: string,
    public skills: string,
    public salary?: string,
    public photo?: string,
    public reviews?: [{
      name: string,
      content: string
    }],
    public experiences?: [{
      timeStart: string,
      timeEnd: string,
      job: number,
      position: string,
      company: string,
      responsibility: string
    }],
    public phone?: string
  ){}
}
