import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  links$: Observable<ScullyRoute[]>;
  posts$: Observable<ScullyRoute[]>;
  articles$: Observable<ScullyRoute[]>;
  aboutLink: Observable<ScullyRoute[]>;

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {
    this.links$ = this.srs.available$;
    console.log(this.links$);

    this.posts$ = this.srs.available$.pipe(
      map(routes => {
      return routes.filter((route: ScullyRoute) =>
        route.route.startsWith(`/blog/`),
      );
    })
  );
    this.articles$ = this.srs.available$.pipe(
      map(routes => {
      return routes.filter((route: ScullyRoute) =>
        route.route.startsWith(`/articles/`),
      );
    })
  );
  }
}