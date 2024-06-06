import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../../../../../../Downloads/front/src/app/services/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isCustomerLoggedIn: boolean =  StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router, public storageService: StorageService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event.constructor.name==="NavigationEnd") {
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      }
    });
  }
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
