import {Component, OnInit, ViewChild} from '@angular/core';
import {Vacancy} from '../shared/models/vacancy.model';
import {VacanciesService} from '../shared/services/vacancies.service';
import {PositionService} from '../shared/services/position.service';
import {Position} from '../shared/models/position.model';
import {DxDataGridComponent} from 'devextreme-angular';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css'],
  providers: [NgbActiveModal]
})
export class VacanciesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  vacancies: Vacancy[];
  vacanciesLength: number;
  positions: Position[];
  positionsStr: string[] = [];
  vacancyExperiences: string[];
  experiences: string[] = ['Junior', 'Middle', 'Senior'];
  selectedPosition: string = '';
  isPositionInvalid: boolean = false;
  isPositionHintVisible: boolean = false;
  positionHint: string = '';
  selectedExperience: string = '';
  isExperienceInvalid: boolean = false;
  selectedSalary: string;
  isSalaryInvalid: boolean = false;
  isSalaryHintVisible: boolean = false;
  salaryHint: string = '';

  constructor(private vacanciesService: VacanciesService,
              private positionService: PositionService,
              private modalService: NgbModal,
              private activeModal: NgbActiveModal) {
    this.vacancyExperiences = ['All', 'Junior', 'Middle', 'Senior'];
  }

  selectVacancyExperience(data) {
    if (data.value === 'All') this.dataGrid.instance.clearFilter();
    else this.dataGrid.instance.filter(['experience', '=', data.value]);
  }

  changeDateFormat(vacancy: Vacancy) {
    let now: number = new Date().getTime() / 1000;
    let dateOfAddVacancy: number = (now - +vacancy.date) / 86400;
    if (dateOfAddVacancy < 1) vacancy.date = 'today';
    else if (2 < dateOfAddVacancy && 7 > dateOfAddVacancy) vacancy.date = Math.ceil(dateOfAddVacancy) + ' days later';
    else if (7 < dateOfAddVacancy && 27 > dateOfAddVacancy) vacancy.date = 'about ' + this.getWeek(dateOfAddVacancy) + ' week' + this.getEnding(this.getWeek(dateOfAddVacancy)) + ' later';
    else if (27 < dateOfAddVacancy) vacancy.date = 'a month ago';
  }

  getWeek(num) {
    return Math.ceil(num / 7);
  }

  getEnding(number) {
    return number > 1 ? 's' : '';
  }

  openCreateVacancyWindow(content) {
    this.clearModalWindow();
    this.activeModal = this.modalService.open(content, {size: 'sm', centered: true});
  }

  updateExperience(event: Event) {
    this.selectedExperience = this.experiences[+(<HTMLSelectElement>event.target).value - 1];
  }

  updateSalary(event: Event) {
    this.selectedSalary = (<HTMLInputElement>event.target).value;
  }

  checkPosition() {
    for (let i = 0; i < this.positions.length; i++) {
      if ((this.selectedPosition).toLowerCase() === (this.positions[i].name).toLowerCase()) {
        this.isPositionInvalid = false;
        this.isPositionHintVisible = false;
        this.positionHint = '';
        return true;
      }
    }

    this.isPositionInvalid = true;
    this.isPositionHintVisible = true;
    this.positionHint = 'You have to select position from the available';
    return false;
  }

  checkExperience() {
    if (this.selectedExperience) {
      this.isExperienceInvalid = false;
      return true;
    } else {
      this.isExperienceInvalid = true;
      return false;
    }
  }

  checkSalary() {
    if (isNaN(+this.selectedSalary) || +this.selectedSalary <= 0) {
      this.isSalaryInvalid = true;
      this.isSalaryHintVisible = true;
      this.salaryHint = 'You have to enter a positive number';
      return false;
    } else {
      this.isSalaryInvalid = false;
      this.isSalaryHintVisible = false;
      this.salaryHint = '';
      return true;
    }
  }

  checkFieldsValidation() {
    const correctnessOfFields = [];

    correctnessOfFields.push(this.checkPosition());
    correctnessOfFields.push(this.checkExperience());
    correctnessOfFields.push(this.checkSalary());

    for (let i = 0; i < correctnessOfFields.length; i++) {
      if (!correctnessOfFields[i]) {
        return false;
      }
    }

    return true;
  }

  saveVacancy() {
    if (!this.checkFieldsValidation()) return;

    let newVacancy: Vacancy = {
      position: this.selectedPosition.toUpperCase(),
      experience: this.selectedExperience,
      salary: `${+this.selectedSalary.toString()}$`, // delete redundant zeros in front
      date: `${new Date().getTime()}`,
      id: ++this.vacanciesLength
    };


    this.vacanciesService.saveVacancy(newVacancy)
      .subscribe();

    this.vacancies.push(newVacancy);
    this.changeDateFormat(this.vacancies[this.vacanciesLength - 1]);

    this.closeModalWindow();
    this.clearModalWindow();
  }

  closeModalWindow() {
    /*this.clearModalWindow();*/
    this.activeModal.close();
  }

  clearModalWindow() {
    this.selectedPosition = '';
    this.isPositionInvalid = false;
    this.isPositionHintVisible = false;
    this.positionHint = '';

    this.selectedExperience = '';
    this.isExperienceInvalid = false;

    this.selectedSalary = '';
    this.isSalaryInvalid = false;
    this.isSalaryHintVisible = false;
    this.salaryHint = '';
  }

  ngOnInit() {
    this.vacanciesService.getVacancies()
      .subscribe(vacancies => {
        this.vacancies = vacancies;
        this.vacanciesLength = vacancies.length;
        for (let i = 0; i < this.vacancies.length; i++) {
          this.changeDateFormat(this.vacancies[i]);
        }
      });
    //вот тут берем список позиций!
    this.positionService.getPositions()
      .subscribe(positions => {
        this.positions = positions;
        for (let i = 0; i < this.positions.length; i++) {
          this.positionsStr.push(this.positions[i].name);
        }
      });


  }
}
