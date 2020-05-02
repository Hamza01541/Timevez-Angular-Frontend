import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services';
@Component({
    selector: 'loader-component',
    templateUrl: 'loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    show: boolean = false;

    constructor(private loaderService: LoaderService) {
        this.loaderService.getLoaderState().subscribe(state => {
            this.show = state.show;

        });
    }

    ngOnInit() {
    }

    getImagePath() {
        return "assets/images/loader/loader.gif";
    }
}