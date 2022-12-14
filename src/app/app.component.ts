import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'conscious';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }
  fullScreen: boolean = true;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  selectedIndex: number = 0;

  //切换tabBar
  tabBarTabOnPress(pressParam: any) {
    this.selectedIndex = pressParam.index;
    if(pressParam.index == 2){
      this.toEditPage();
    }
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
