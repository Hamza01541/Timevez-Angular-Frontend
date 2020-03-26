import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AdminNavigationMenu} from 'src/app/models/navigation-menu';

@Injectable()
@Component({
  selector: 'admin-root',
  templateUrl: './admin-root.component.html',
  styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {
  navbarTabs: any;
  currentPage: string = "";
  currentUser: any;
  currentDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

    this.navbarTabs = AdminNavigationMenu;

    if (this.currentUser && this.currentUser.roles) {
      if (this.currentUser.role == 'Admin') {
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
