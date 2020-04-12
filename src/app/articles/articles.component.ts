import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
export class ArticlesComponent implements OnInit {
  ngOnInit() {}

  private highlighted: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, 
    private highlightService: HighlightService) {
  }

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
