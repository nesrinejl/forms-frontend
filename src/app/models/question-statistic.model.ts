import { ChoiceStatistic } from './choice-statistic.model';

import { QuestionResponseTypesEnum } from './../enumerations/question-response-types.enum';


export class QuestionStatistic {

    _id: string;
    content?: string;
    questionType?: QuestionResponseTypesEnum;
    choices?: ChoiceStatistic[] = [];
    responses?: string[];

}