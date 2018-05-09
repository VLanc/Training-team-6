export class Candidate {
  constructor(
    public id: number,
    public date: number,
    public position: string,
    public status: string,
    public name: string,
    public address: string,
    public city: string,
    public email: string,
    public skills: string,
    public salary?: number,
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
