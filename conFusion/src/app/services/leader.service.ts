import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: number): Observable<Leader>{
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000
      ));
  }
  
  getFeaturedLeader(): Observable<Leader>{
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000
      ));
  }

  getDishIds(): Observable<string[] | any> {
    return of(LEADERS.map(leader => leader.id ));
  }

}

// import { Injectable } from '@angular/core';
// import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';
// import { Restangular } from 'ngx-restangular';

// import { of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class LeaderService {

//   constructor(private restangular: Restangular) { }

//   getLeaders(): Observable<Leader[]>{
//     return this.restangular.all('leaders').getList();
//   }

//   getLeader(id: number): Observable<Leader>{
//     return this.restangular.one('leaders', id).get();
//   }

//   getFeaturedLeader(): Observable<Leader>{
//     return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000
//       ));
//   }

//   getDishIds(): Observable<string[] | any> {
//     return this.restangular.all('leaders').getList({ featured: true })
//     .pipe(map(leaders => leaders[0]));
//   }

// }