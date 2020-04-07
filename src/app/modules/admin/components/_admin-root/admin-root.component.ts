import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AdminNavigationMenu } from 'src/app/models/navigation-menu';
import { Role } from 'src/app/models/role';
import { LocalStorageService } from 'src/app/core/services/';

@Injectable()
@Component({
  selector: 'admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {
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
      if (this.currentUser.role == Role.Admin) {
        this.navbarTabs = AdminNavigationMenu;
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
    if (returnUrl.includes('admin/')) {
      let url = returnUrl.split('admin/')[1];
      this.currentPage = url.includes('?') ? url.split('?')[0] : url;
    }
  }
}
