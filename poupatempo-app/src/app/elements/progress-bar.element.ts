import {Component, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'progress-bar-element',
  templateUrl: 'progress-bar.element.html'
})
export class ProgressBarElement {
    show = false;
    constructor(private loaderService:LoaderService){
        this.loaderService.notify.subscribe(s => this.show = s)
    }
}