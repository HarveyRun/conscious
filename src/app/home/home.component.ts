import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  toEditPage(): void {
    //https://blog.tcs-y.com/2019/03/28/ng2-router-paramMap-queryParamMap/
    this.router.navigate(['edit'] , {
      queryParams: {
        a: 1,
        b: 2
      },
      skipLocationChange : true  //是否隐藏路由参数
    }).then(r =>{

    })
   }

}
