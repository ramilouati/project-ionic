import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { FirestoreService } from '../services/data/firestore.service';
import { announce } from '../shared/announce.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // Declaration of Announce array to store announcements
  Announce: any = []; // This should ideally be of type announce[] instead of any[]

  // Declaration of AuthenticationService instance
  public authService: AuthenticationService; // Not being initialized here, might cause issues

  constructor(private firestoreService: FirestoreService) {}

  // Initialization function, invoked when the component is loaded
  ngOnInit() {
    // Fetches announcements from FirestoreService
    this.fetchAnounce();

    // Retrieves announcement list changes using snapshotChanges method
    let bookingRes = this.firestoreService.getAnounceList();
    bookingRes.snapshotChanges().subscribe((res) => {
      this.Announce = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['aid'] = item.key;
        this.Announce.push(a as announce);
      });
    });
  }

  // Function to fetch announcements
  fetchAnounce() {
    this.firestoreService
      .getAnounceList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res); // Logs fetched announcements to the console
      });
  }

  // Function to delete an announcement based on its ID
  deleteAnounce(id: any) {
    console.log(id); // Logs the ID of the announcement to be deleted
    if (window.confirm('Do you really want to delete?')) {
      this.firestoreService.deleteAnounce(id); // Calls the service method to delete the announcement
    }
  }
}
