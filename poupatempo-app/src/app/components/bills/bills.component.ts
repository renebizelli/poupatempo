import { Component, OnInit } from "@angular/core";
import { bill } from "src/app/models/models";
import { NubankService } from "src/app/services/nubank.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  bills: bill[] = [];

  constructor(private nubankService: NubankService) { }

  ngOnInit(): void {
      
      this.nubankService.bills()
      .subscribe((r: bill[]) => {
        this.bills = r;
      })

  }

}