import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../services/local-storage.service';
import { FormService } from './../../services/form.service';
import { FormSubmissionService } from './../../services/form-submission.service';

import { blankValidator } from './../../utils/validators.util';

import { Form } from './../../models/form.model';
import { User } from './../../models/user.model';
import { FormSubmission } from './../../models/form-submission.model';
import { Question } from './../../models/question.model';
import { Response } from './../../models/response.model';
import { FormStatistic } from './../../models/form-statistic.model';
import { ChoiceStatistic } from './../../models/choice-statistic.model';

import { QuestionResponseTypesEnum } from './../../enumerations/question-response-types.enum';


@Component({
    templateUrl: './form.component.html',
    styleUrls: [ './form.component.scss' ]
})
export class FormComponent implements OnInit {

    isLoading = true;

    formId: string;
    form: Form = new Form();
    formStatistic: FormStatistic = new FormStatistic();

    currentUser: User = new User();
    isFormOwner = false;

    responsesFormGroups: FormGroup[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private formService: FormService,
        private formSubmissionService: FormSubmissionService
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            (paramMap: ParamMap) => {
                this.formId = paramMap.get('id');
                this.loadForm();
            }
        );
    }

    loadForm() {
        this.isLoading = true;
        this.formService.getFormById(this.formId).subscribe(
            (form: Form) => {
                this.form = form;
                this.currentUser = this.localStorageService.getCurrentUser();
                if (this.currentUser) {
                    this.isFormOwner = this.currentUser._id === this.form.user;
                }
                if (!this.isFormOwner) {
                    this.initializeFormSubmissionForm();
                } else {
                    this.loadFormStatistics();
                }
                this.isLoading = false;
            },
            (error: any) => {
                console.log(error);
                this.isLoading = false;
            }
        );
    }

    initializeFormSubmissionForm() {
        this.form.questions.forEach((question: Question) => {
            if (question.questionType === QuestionResponseTypesEnum.OPEN) {
                this.responsesFormGroups.push(this.formBuilder.group({
                    content: [ '', Validators.required, blankValidator() ]
                }));
            } else if (question.questionType === QuestionResponseTypesEnum.MULTIPLE_CHOICE) {
                this.responsesFormGroups.push(this.formBuilder.group({
                    choiceResponses: this.formBuilder.array([])
                }));
            }
        });
    }

    loadFormStatistics() {
        this.formService.getFormStatistics(this.formId).subscribe(
            (formStatistic: FormStatistic) => {
                this.formStatistic = formStatistic;
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getFormatedPieChartData(choiceStatistics: ChoiceStatistic[]) {
        return choiceStatistics.map((choiceStatistic) => {
            return { name: choiceStatistic.choiceContent, value: choiceStatistic.choiceCount }
        });
    }

    onChoiceSelectionChange(questionIndex: number, choiceId: string, event: any) {
        if (event.checked) {
            (this.responsesFormGroups[questionIndex].get('choiceResponses') as FormArray).push(this.formBuilder.control(choiceId));
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < (this.responsesFormGroups[questionIndex].get('choiceResponses') as FormArray).length; i++) {
                if ((this.responsesFormGroups[questionIndex].get('choiceResponses') as FormArray).at(i).value === choiceId) {
                    (this.responsesFormGroups[questionIndex].get('choiceResponses') as FormArray).removeAt(i);
                    break;
                }
            }
        }
    }

    onSubmitResponses() {
        const FORM_SUBMISSION: FormSubmission = new FormSubmission();
        FORM_SUBMISSION.form = this.form._id;
        if (this.currentUser) {
            FORM_SUBMISSION.user = this.currentUser._id;
        }
        let invalid = false;
        this.form.questions.forEach((question, index) => {
            const RESPONSE: Response = new Response();
            RESPONSE.question = question._id;
            RESPONSE.responseType = question.questionType;
            if (RESPONSE.responseType === QuestionResponseTypesEnum.OPEN) {
                RESPONSE.content = this.responsesFormGroups[index].get('content').value;
                invalid = !RESPONSE.content || RESPONSE.content.trim() === '';
            } else if (RESPONSE.responseType === QuestionResponseTypesEnum.MULTIPLE_CHOICE) {
                RESPONSE.choiceResponses = this.responsesFormGroups[index].get('choiceResponses').value;
                invalid = !RESPONSE.choiceResponses || RESPONSE.choiceResponses.length <= 0;
            }
            FORM_SUBMISSION.responses.push(RESPONSE);
        });
        if (invalid) {
            this.snackBar.open('Please make sure to respond to all questions before submitting the form!');
            return;
        }
        this.formSubmissionService.createFormSubmission(FORM_SUBMISSION).subscribe(
            (response: any) => {
                this.snackBar.open('Your responses have been submitted successfully!');
                this.router.navigate([ '/app/dashboard' ]);
            },
            (error: any) => {
                console.log(error);
                this.snackBar.open('Oups! Something went wrong, please verify your responses and try again later.');
            }
        );
    }

}
