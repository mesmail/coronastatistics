import { ReturnStatement } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { ApiResponse } from "../sharedModels/ApiResponse";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: ApiResponse = new ApiResponse();

  Loading: boolean = true;
  region: string = "";
  date1: string = "";
  date2: string = "";
  array: object[] = [];

  constructor(private apiServ: ApiServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.region = this.activatedRoute.snapshot.paramMap.get('region') as string;
    this.date1 = this.activatedRoute.snapshot.paramMap.get('date1') as string;
    this.date2 = this.activatedRoute.snapshot.paramMap.get('date2') as string;

    this.apiServ.getCovidData(this.region.toLowerCase(),this.date2,this.date1)
    .subscribe(
      (value) => {
        this.Loading = false;
        this.result = value;
        console.log(this.result.total.today_confirmed);
        console.log(this.result.updated_at);
        }
    )
  }

  Return() {
    this.router.navigate(["/select"]);
  }

}
