import { Component, OnInit} from '@angular/core';
import SwiperCore, { SwiperOptions,Pagination, Navigation } from 'swiper';
import { ActivatedRoute,Router } from "@angular/router";
SwiperCore.use([Pagination, Navigation])

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

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: {
      clickable: true,
    },
    scrollbar: { draggable: true },
  };
  fullScreen: boolean = true;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  selectedIndex: number = 0;

  onSwiper(e:any) {
    console.dir(e);
  }
  onSlideChange() {
    console.log('slide change');
  }

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
