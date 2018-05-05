export class Experience {
  constructor(
        public id: number,
        public timeStart: string,
        public timeEnd: string,
        public job: boolean,
        public position: string,
        public place: string,
        public company: string,
        public responsibility: string
  ) {}
}
