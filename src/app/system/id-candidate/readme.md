##компонент **id-candidate**.

### внутренние компоненты:

* **_experience_**;
* **_skill_**;

примечание: 
- для каждого нового опыта формируется отдельный новый компонент;
- для всех скиллов формируется один компонент;

###experience:
  
  #####Входные переменные:
  
  * **editing**: boolean - всегда `false`, когда из родительского компонента `id-candidate` приходит `true`, 
                     меняется шаблон просмотра добавляются: кнопки редактирования и удаления опыта.
  * **quantityExperiences**: number - родительский компонент `id-candidate` присылает количество элементов
                               массива experience для правильного отобраления графика таймлайна.
  * **indexExperience**: number - родительский компонент `id-candidate` присылает номер элемента
                                 в массиве experience для правильного отобраления графика таймлайна и 
                                 удаления элемента.
    
  
  * **singleExperience**: {
    id: number,
    timeStart: string,
    timeEnd: string,
    job: boolean,
    position: string,
    place: string,
    company: string,
    responsibility: string
    }                       - сам опыт.
    
    
  #####Выходные переменные:
  
  будет изменено
  
  * @Output('onSaveRejected') saveRejected = new EventEmitter<boolean>();  - ивент, отправляется в родителя на счетчик открытых редакторов
  * @Output('onSaveAccepted') saveAccepted = new EventEmitter<boolean>(); - ивент, отправляется в родителя на счетчик открытых редакторов

  к переменной **editingCandidate** родительского компонента `id-candidate` данными ивентом прибавляется/отнимается 1,
  таким образом, сколько бы ни было открыто компонентов для редактирования, пока `**editingCandidate** ==! 0`, кнопка сохранения
  не появится, т.к. сохранение запрещено.
  
  #####Внутренние переменные:
  
  * editingExperience: boolean = `false` - когда `true`, шаблон просмотра опыта меняется на шаблон редактирования.
  * experienceForm: FormGroup - объект формы.
  
  ####Методы:
  
  * `saveExperience()`
  * `saveExperience()`
  
  
###skill:

  #####Входные переменные:
  
  * **editing**: boolean - всегда `false`, когда из родительского компонента `id-candidate` приходит `true`, добавляется
                           кнопка добавления навыка и появляется возможность удалить навык кликом по нему.
                             
  * **skills**: string - сами навыки.
    
  #####Выходные переменные:
  
   * @Output('onSaveRejected') saveRejected = new EventEmitter<boolean>();  - ивент, отправляется в родителя на счетчик открытых редакторов
   * @Output('onSaveAccepted') saveAccepted = new EventEmitter<boolean>(); - ивент, отправляется в родителя на счетчик открытых редакторов
  
   к переменной **editingCandidate** родительского компонента `id-candidate` данными ивентом прибавляется/отнимается 1,
   таким образом, сколько бы ни было открыто компонентов для редактирования, пока `**editingCandidate** ==! 0`, кнопка сохранения
   не появится, т.к. сохранение запрещено.
    
  * @Output('`onSaveSkills`') **saveSkillsEmitter** EventEmitter<`string`>
  
  передача новой, сохраненной строки **skills** в объект **candidate** родительского компонента `id-candidate`.

  #####Внутренние переменные:
  
  * **skillsArray**: any - для дальнейшего взаимодействия с навыками кандидата, они режутся и кладутся в массив.
  * **editingSkill**: boolean = false; - флаг, показывающий процесс редактирования.
  skillForm: FormGroup;
  
  #####Переменные шаблона:
  
  * **singleSkill**
  
  ####Методы:
  
  * `deleteSkill()`
  * `addSkill()`
  * `saveSkill()`


  
