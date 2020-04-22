import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EmployeeNavigationMenu } from 'src/app/models/navigation-menu';
import { Role } from 'src/app/models/role';
import { Constants } from 'src/shared/constants';
import { LocalStorageService } from 'src/app/core/services/';

@Injectable()
@Component({
    selector: 'employee-root',
    templateUrl: './employee-root.component.html',
    styleUrls: ['./employee-root.component.scss']
})
export class EmployeeRootComponent implements OnInit {
    fullName: string;
    role: string;
    navbarTabs: any;
    currentPage: string = "";
    currentDate: Date;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storageService: LocalStorageService

    ) { }

    ngOnInit() {
        let currentUser = JSON.parse(localStorage.getItem(Constants.currentUser));
        this.fullName = `${currentUser.firstname} ${currentUser.lastname}`;
        this.role = `${currentUser.role}`;
        if (currentUser && currentUser.role) {
            if (currentUser.role == Role.Employee) {
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

    /**
   * Toggle theme skin color
   */
    toggleThemeColor() {
        let skin = localStorage.getItem('skin') || 'default';
        skin = skin === 'default' ? 'dark' : 'default';
        localStorage.setItem('skin', skin);
        window.location.reload();
    }
}
