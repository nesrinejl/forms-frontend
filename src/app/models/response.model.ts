import { QuestionResponseTypesEnum } from './../enumerations/question-response-types.enum';


export class Response {

    _id: string;
    question?: string;
    responseType?: QuestionResponseTypesEnum;
    content?: string;
    choiceResponses?: string[] = [];

}
