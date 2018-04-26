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
    public description?: [{
      name: string,
      review: string
    }],
    public info?: [{
      time: string,
      pos: string,
      header: string,
      body: string
    }],
    public education?: [{
      time: string,
      pos: string,
      header: string,
      body: string
    }],
    public mobileNumber?: string,
    public homeNumber?: string

  ){}
}
