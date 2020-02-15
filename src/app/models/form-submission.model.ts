import { Response } from './response.model';


export class FormSubmission {

    _id: string;
    form?: string;
    user?: string;
    responses?: Response[] = [];

}
