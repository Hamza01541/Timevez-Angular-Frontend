import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EmployeeNavigationMenu } from 'src/app/models/navigation-menu';
import { Role } from 'src/app/models/role';
import { LocalStorageService } from 'src/app/core/services/';

@Injectable()
@Component({
    selector: 'employee-root',
    templateUrl: './employee-root.component.html',
    styleUrls: ['./employee-root.component.scss']
})
export class EmployeeRootComponent implements OnInit {
    fullname: string;
    role:string;
    navbarTabs: any;
    currentPage: string = "";
    currentUser: any;
    currentDate: Date;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storageService: LocalStorageService

    ) { }

    ngOnInit() {

        this.currentUser = this.storageService.get('currentUser');
        this.fullname = `${this.currentUser.firstname} ${this.currentUser.lastname}`;
        this.role=`${this.currentUser.role}`;
        if (this.currentUser && this.currentUser.role) {
            if (this.currentUser.role == Role.Employee) {
                this.navbarTabs = EmployeeNavigationMenu;
            }
        }

        /**
         * For initial routing, router.event doesn't subscribe any event.
         * And route.children only gives value on initial routing.
         */
        this.currentPage = this.route.children[0].routeConfig.path;

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getcurrentPage(event.url);
            }
        });
    }

    getcurrentPage(returnUrl: string) {
        if (returnUrl.includes('employee/')) {
            let url = returnUrl.split('employee/')[1];
            this.currentPage = url.includes('?') ? url.split('?')[0] : url;
        }
    }
}
