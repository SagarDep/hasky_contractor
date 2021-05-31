import { Component, OnInit, Input } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-header", 
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input() tittle: string;
  num = "";
  constructor(private menu: MenuController) {}

  openMenu() {
    if (this.num == "") {
      this.menu.enable(true, "first");
      this.menu.open("first");
      this.num = "1";
    }
    if (this.num == "1") {
      this.menu.enable(true, "first");
      this.menu.close("first");
      this.num = "";
    }
  }
}
