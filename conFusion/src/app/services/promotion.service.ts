import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PromotionService {

  constructor() { }
  getPromotions(): Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: number): Observable<Promotion>{
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion(): Observable<Promotion>{
    return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(PROMOTIONS.map(promo => promo.id ));
  }

}

// import { Injectable } from '@angular/core';
// import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';
// import { Restangular } from 'ngx-restangular';

// import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class PromotionService {

//   constructor(private restangular: Restangular) { }

//   getPromotions(): Observable<Promotion[]>{
//     return this.restangular.all('promotions').getList();
//   }

//   getPromotion(id: number): Observable<Promotion>{
//     return this.restangular.one('promotions', id).get();
//   }

//   getFeaturedPromotion(): Observable<Promotion>{
//     return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
//   }

//   getDishIds(): Observable<string[] | any> {
//     return this.restangular.all('promotions').getList({ featured: true })
//     .pipe(map(promotions => promotions[0]));
//   }

// }