import { Component, OnInit } from '@angular/core';
import { MainService } from '../../shared/main.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  init: Boolean;
  items: Array<any>;
  count: Number;
  viewCols: Number;
  /// size image
  widthImg: Number;
  heightImg: Number;

  constructor(private mainService: MainService) {
    this.init = false;
    this.count = 0;
    this.items = [];
    this.viewCols = 4;
    this.widthImg = 278;
    this.heightImg = 278;
  }

  ngOnInit() {
    let _this = this;
    // response.groups
    navigator.geolocation.getCurrentPosition( (position) => {

      _this.mainService.getData(position.coords.latitude, position.coords.longitude).then(data => {
        let _item = [];
        if (typeof data === 'object' && data.hasOwnProperty('response')) {
          let _response = data.response;
          if (typeof _response === 'object' && _response.groups instanceof Array) {
            let _groups = _response.groups;

            for (let i = 0, len = _groups.length; i < len; i++) {
              _item = _item.concat(_groups[i].items.map((x, y) => {
                let _venue = x.venue;

                let _image = null;
                if (_venue.featuredPhotos.items.length) {
                  let _photo = _venue.featuredPhotos.items[0];
                  _image = {
                    prefix: _photo.prefix,
                    suffix: _photo.suffix
                  };
                }

                let _opt = [];
                if (typeof _venue.location === 'object' && typeof _venue.location.lat === 'number' && typeof _venue.location.lng === 'number') {
                  _opt.push({
                    label: 'Lat/Lng',
                    value: `${_venue.location.lat}, ${_venue.location.lng}`,
                    link: false
                  });
                }

                if (typeof _venue.hours === 'object' && typeof _venue.hours.isOpen === 'boolean') {
                  _opt.push({
                    label: 'Status',
                    value: (_venue.hours.isOpen === true ? 'is open' : 'is closed'),
                    link: false
                  });
                }

                if (typeof _venue.location === 'object' && typeof _venue.location.distance === 'number') {
                  _opt.push({
                    label: 'Distance',
                    value: `${_venue.location.distance} m`,
                    link: false
                  });
                }

                if (_venue.hasOwnProperty('url')) {
                  _opt.push({
                    label: 'Website',
                    value: _venue.url,
                    link: true
                  });
                }

                let res = {
                  image: _image,
                  // _photo.prefix
                  name: _venue.name,
                  opts: _opt
                };
                return res;
              }));
            }
          }
        }

        if (!_this.init) {
          _this.init = true;
        }

        _this.count = _item.length;
        _this.items = _item;
      }).catch(err => {
      });
    });
  }

  handleView(num: number) {
    let permission = [1, 2, 4];
    if (typeof num === 'number' && permission.indexOf(num) > -1) {
      this.viewCols = num;
      let _this = this;
      let dataImage = {
        img1: () => {
          _this.widthImg = 1170;
          _this.heightImg = 400;
        },
        img2: () => {
          _this.widthImg = 575;
          _this.heightImg = 278;
        },
        img4: () => {
          _this.widthImg = 278;
          _this.heightImg = 278;
        },
      };
      dataImage['img' + num]();
    }
  }
}
