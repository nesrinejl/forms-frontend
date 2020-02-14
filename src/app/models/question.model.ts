import { Choice } from './choice.model';

import { QuestionResponseTypesEnum } from './../enumerations/question-response-types.enum';


export class Question {

    _id: string;
    content?: string;
    questionType?: QuestionResponseTypesEnum;
    requiredQuestion?: boolean;
    choices?: Choice[] = [];

}