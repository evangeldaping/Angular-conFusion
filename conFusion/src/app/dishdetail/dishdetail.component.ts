import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  comment: Comment;
  commentForm: FormGroup;
  formErrors={
    'author': '',
    'comment': ''
  };
  validationMessage={
    'author':{
      'required': 'Author name is required.',
      'minlength': 'Author Name must be at least 2 characters long.'
    },
    'comment':{
      'required': 'Comment is required.'
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm(){
    this.commentForm= this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: '5',
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data=> this.onValueChanged(data));
    this.onValueChanged();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    var d = new Date();
    var n = d.toDateString().slice(4);
    this.comment.date = n;
    this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
  }
  onValueChanged(data?: any){
    if(!this.commentForm){ return; }
    const form = this.commentForm;
    for(const field in this.formErrors){
      this.formErrors[field]='';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessage[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key]+' '; 
        }
      }
    }
  }

}