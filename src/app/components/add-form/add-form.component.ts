import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../services/local-storage.service';
import { FormService } from './../../services/form.service';

import { blankValidator } from './../../utils/validators.util';

import { Form } from './../../models/form.model';
import { User } from './../../models/user.model';

import { QuestionResponseTypesEnum } from './../../enumerations/question-response-types.enum';


@Component({
    templateUrl: './add-form.component.html',
    styleUrls: [ './add-form.component.scss' ]
})
export class AddFormComponent {

    addFormFormGroup: FormGroup = this.formBuilder.group({
        nameForm: [ '', Validators.required, blankValidator() ],
        description: [ '', [ Validators.required, Validators.maxLength(250) ], [ blankValidator() ] ],
        questions: this.formBuilder.array([
            this.formBuilder.group({
                content: [ '', Validators.required, blankValidator() ],
                questionType: [ '', Validators.required ],
                requiredQuestion: [ true ]
            })
        ])
    });

    get questions() {
        return this.addFormFormGroup.get('questions') as FormArray;
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private formService: FormService
    ) {}

    onAddQuestion() {
        this.questions.push(this.formBuilder.group({
            content: [ '', Validators.required, blankValidator() ],
            questionType: [ '', Validators.required ],
            requiredQuestion: [ true ]
        }));
    }

    onRemoveQuestion(index: number) {
        this.questions.removeAt(index);
    }

    onQuestionTypeSelectionChange(index: number) {
        if (this.questions.at(index).get('questionType').value === QuestionResponseTypesEnum.MULTIPLE_CHOICE) {
            (this.questions.at(index) as FormGroup).addControl('choices', this.formBuilder.array([
                this.formBuilder.group({
                    choiceContent: [ '', Validators.required, blankValidator() ]
                })
            ]));
        } else if (this.questions.at(index).get('questionType').value === QuestionResponseTypesEnum.OPEN) {
            (this.questions.at(index) as FormGroup).removeControl('choices');
        }
    }

    getQuestionChoices(index: number) {
        return this.questions.at(index).get('choices') as FormArray;
    }

    onAddChoice(index: number) {
        this.getQuestionChoices(index).push(this.formBuilder.group({
            choiceContent: [ '', Validators.required, blankValidator() ]
        }));
    }

    onRemoveChoice(questionIndex: number, choiceIndex: number) {
        this.getQuestionChoices(questionIndex).removeAt(choiceIndex);
    }

    onAddForm() {
        const FORM: Form = { ...this.addFormFormGroup.value };
        if (!FORM.questions || FORM.questions.length === 0) {
            this.snackBar.open('Form must have at least one question, please verify your input and try again later.');
            return;
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < FORM.questions.length; i++) {
            if (FORM.questions[i].questionType === QuestionResponseTypesEnum.MULTIPLE_CHOICE && (!FORM.questions[i].choices || FORM.questions[i].choices.length === 0)) {
                this.snackBar.open('Multiple choice questions must have at least one valid choice, please verify your input and try again later.');
                return;
            }
        }
        const CURRENT_USER: User = this.localStorageService.getCurrentUser();
        if (CURRENT_USER) {
            FORM.user = CURRENT_USER._id;
        }
        this.formService.createForm(FORM).subscribe(
            (response: any) => {
                this.snackBar.open('Form created successfully!');
                this.router.navigate([ '/app/dashboard' ]);
                this.addFormFormGroup.reset();
            },
            (error: any) => {
                console.log(error);
                this.snackBar.open('Oups! Something went wrong, please verify your input and try again later.');
            }
        );
    }

}
