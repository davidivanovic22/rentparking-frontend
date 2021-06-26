import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingService} from "../../assets/services/booking/booking.service";
import {UserService} from "../../assets/services/user/user.service";
import {ParkingService} from "../../assets/services/parking/parking.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Booking} from "../../@types/entity/Booking";
import {LoggedInUserService} from "../../assets/services/logged-in-user/logged-in-user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InformationDialogComponent} from "../map/information-dialog/information-dialog.component";
import {User} from "../../@types/entity/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  });
  bookingList: Booking[] = [];
  user!: User;

  constructor(private loggedInService: LoggedInUserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loggedInService.getLoggedInUser().subscribe(data => {
      console.log(data)
      this.user = data;
    })
    this.getAllBookingForLoggedInUser();
  }

  getAllBookingForLoggedInUser() {
    this.loggedInService.getAllBookingForLoggedInUser().subscribe(data =>{
      this.bookingList = data;
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.bookingList, event.previousIndex, event.currentIndex);
  }

  save() {
    let form = this.form.value;

  }

  openDialog(booking: Booking) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {};
      dialogConfig.autoFocus = false;
      dialogConfig.minWidth = "30%";
      this.dialog.open(InformationDialogComponent, dialogConfig);
  }
}
