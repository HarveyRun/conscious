import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-tinyedit',
  templateUrl: './tinyedit.component.html',
  styleUrls: ['./tinyedit.component.scss']
})
export class TinyeditComponent implements OnInit {

  initContent: string = "";
  initTitle: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    /**
     * 获取路由参数
     */

    //第一种方式
    //this.route.snapshot.queryParams

    //第二种方式
    this.route.queryParams.subscribe((data) => {
       console.dir(data);
       console.log(data['a']);
    });


  }

  showData(data:any){
    console.dir(data);
  }

}
