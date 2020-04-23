import {Component, OnInit, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { HighlightService } from '../highlight.service';

declare var ng: any;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class ArticlesComponent implements OnInit, AfterViewChecked {

  constructor(private router: Router, private route: ActivatedRoute, 
    private highlightService: HighlightService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
