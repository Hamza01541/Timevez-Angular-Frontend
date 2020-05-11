import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AdminNavigationMenu } from 'src/app/models/navigation-menu';
import { Role } from 'src/app/models/role';
import { LocalStorageService } from 'src/app/core/services/';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {
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
      if (currentUser.role == Role.Admin) {
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
