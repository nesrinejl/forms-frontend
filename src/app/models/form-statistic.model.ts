import { QuestionStatistic } from './question-statistic.model';


export class FormStatistic {

    _id: string;
    nameForm?: string;
    description?: string;
    questions?: QuestionStatistic[] = [];
    user?: string;
    formSubmissionsCount?: number;

}
