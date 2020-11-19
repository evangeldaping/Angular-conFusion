import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Component, OnInit, Inject } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  // errMess: string;
  // dishcopy: Dish;

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

  visibility = 'shown';
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  // constructor(private dishService: DishService,
  //   @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => 
    { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    // this.dishservice.getDish(params['id'])))
    .subscribe(dish => 
      { this.dish = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; });
    
    // this.route.params
    // .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
    //   errmess => this.errMess = <any>errmess );
    

    // this.dishService.getDishes()
    // .subscribe(dishes => this.dishes = dishes,
    //   errmess => this.errMess = <any>errmess);
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
    
    // this.dishcopy.comments.push(this.comment);
    // this.dishService.putDish(this.dishcopy)
    //   .subscribe(dish => {
    //     this.dish = dish; this.dishcopy = dish;
    //   },
    //   errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

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