import { Question } from './question.model';


export class Form {

    _id: string;
    nameForm?: string;
    description?: string;
    questions?: Question[] = [];
    user?: string;

}
