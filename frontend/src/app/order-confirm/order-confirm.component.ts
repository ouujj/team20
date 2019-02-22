import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { Router } from "@angular/router";
import { OrderService } from "../shared/order/order.service";
import { database } from "firebase";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-order-confirm",
  templateUrl: "./order-confirm.component.html",
  styleUrls: ["./order-confirm.component.css"]
})
export class OrderConfirmComponent implements OnInit {
  foodId;
  public foodDetail: any;
  orderDetail: any = {
    uid: "",
    sid: "",
    fid: "",
    countItem: "",
    totalPrice: 0,
    addr: ""
  };

  selectedValue: string;
  userCheck: number;
  userId: number;
  email: string;
  userAddress: string;
  storeId: string;

  profile: any;
  order: any;

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.foodId = localStorage.getItem("food");
    console.log("Foodd Id: " + this.foodId);

    this.getFoodById();

    this.storeId = localStorage.getItem("store");
    console.log("store", this.storeId);

    this.loginService.getUser().subscribe(data => {
      try {
        this.email = data.email;
        this.userId = data.profilesid;
        this.userAddress = data.contact.address;
        console.log(this.email);
        console.log(this.userId);
        console.log(this.userAddress);
      } catch (Err) {
        this.router.navigate(["/login"]);
      }
    });
    console.log(this.orderDetail.addr);
  }

  getFoodById() {
    this.orderService.getFoodById(this.foodId).subscribe(data => {
      this.foodDetail = data;
      this.orderDetail.fid = data.id;
      console.log(this.orderDetail.fid);
      console.log(this.foodDetail);
    });
  }

  onKey(event: KeyboardEvent) {
    try {
      this.orderDetail.totalPrice =
        this.foodDetail.price * this.orderDetail.countItem;
    } catch {
      console.log("กรุณากรอกตัวเลข");
    }
  }

  confirm() {
    this.setOrder();
    console.log("orderDetail = ", this.orderDetail);
    this.orderService.addOrder(this.orderDetail).subscribe(
      data => {
        this.snackBar.open("บันทึกรายการสำเร็จ ", "ตกลง", {
          duration: 10000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
        (this.orderDetail.uid = ""),
          (this.orderDetail.sid = ""),
          (this.orderDetail.fid = ""),
          (this.orderDetail.countItem = ""),
          (this.orderDetail.totalPrice = 0),
          (this.orderDetail.addr = "");
        localStorage.clear();
        this.router.navigate(["/manu"]);
      },
      error => {
        this.snackBar.open("ไม่สามารถทำรายการได้ ", "ตกลง", {
          duration: 10000,
          verticalPosition: "top",
          horizontalPosition: "center"
        });
      }
    );
  }

  clear() {
    (this.orderDetail.countItem = ""), (this.orderDetail.totalPrice = 0);
    this.selectedValue = "";
  }

  goToMenu() {
    this.clear();
    localStorage.clear();
    this.router.navigate(["/manu"]);
  }

  setOrder() {
    this.orderDetail.uid = this.userId;
    this.orderDetail.sid = this.storeId;
    this.orderDetail.addr = this.selectedValue;
  }
}
