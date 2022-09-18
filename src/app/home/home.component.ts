import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  pageLimit = 20;
  public directionCount = 0;
  page = 0;
  typeOption = { content: "该组件只支持Touch事件，请使用移动模式/设备打开此页。", marqueeProps: { fps: 100 } };
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: '',
    endReachedRefresh: false,
    height: 500,
    data: [],
    directionName: 'both up and down'
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };

  constructor() {}

  ngOnInit(): void {
    this.addItems(0);
  }

  onClick() {
    this.directionCount++;
    switch (this.directionCount) {
      case 0:
        this.state.direction = '';
        this.state.directionName = 'both up and down';
        break;
      case 1:
        this.state.direction = 'down';
        this.state.endReachedRefresh = true;
        this.state.directionName = 'down';
        break;
      case 2:
        this.state.direction = 'up';
        this.state.directionName = 'up';
        break;
      default:
        this.directionCount = 0;
        this.state.direction = '';
        this.state.directionName = 'both up and down';
        break;
    }
  }

  pullToRefresh(event:any) {
    if (event === 'endReachedRefresh') {
      if (this.page < 9) {
        this.page++;
        this.addItems(this.page * this.pageLimit);
        this.state.refreshState.currentState = 'release';
        setTimeout(() => {
          this.state.refreshState.currentState = 'finish';
        }, 1000);
      }
    } else {
      if (event === 'down') {
        this.state.data = [];
        this.page = 0;
        this.addItems(0);
      } else {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * this.pageLimit);
        }
      }
    }
  }

  addItems(startIndex:any) {
    for (let i: number = startIndex; i < this.pageLimit * (this.page + 1); i++) {
    }
  }

}
