import _ from 'lodash';
import Subsidies from './subsidies.json';
import './index.scss';

class FilterBar{

  constructor() {
    this._filter = document.createElement('div');
    this._header = document.querySelector('header');
    this._level1Select = document.createElement('select');
    this._level2Select = document.createElement('select');
    this._noticeBar = document.createElement('div');
    this._main = document.querySelector('main');
    this._setWindowScrollBehavior = this._setWindowScrollBehavior.bind(this);
    this._constructFilter = this._constructFilter.bind(this);
    this._constructLevel1Select = this._constructLevel1Select.bind(this);
    this._constructLevel2Select = this._constructLevel2Select.bind(this);
    this._currentYPosition = this._currentYPosition.bind(this);
    this._dispatcher = this._dispatcher.bind(this);
    this._elmYPosition = this._elmYPosition.bind(this);
    this._updateNoticeBarDisplay = this._updateNoticeBarDisplay.bind(this);
    this._updateLevel2Selet = this._updateLevel2Selet.bind(this);
    this._showData = this._showData.bind(this);
    this._smoothScroll = this._smoothScroll.bind(this);
  }

  _constructFilter() {
    this._constructLevel1Select();
    this._constructLevel2Select();
    this._filter.setAttribute('class', 'filter');
    this._header.appendChild(this._filter);
  }

  _constructLevel1Select() {
    for(let o in Subsidies) {
      let thisOpt = document.createElement('option');
      thisOpt.setAttribute('value' , o);
      thisOpt.appendChild(document.createTextNode(Subsidies[ o ][ 'name' ]));
      this._level1Select.appendChild(thisOpt);
    }
    this._level1Select.setAttribute('class', 'level1Select');

    const _selectL1Group = document.createElement('div');
    _selectL1Group.setAttribute('class', 'selectL1Group');
    _selectL1Group.appendChild(document.createTextNode('類別：'));
    _selectL1Group.appendChild(this._level1Select);
    this._filter.appendChild(_selectL1Group);
    const _arrowRight = document.createElement('div');
    _arrowRight.innerHTML = '&#x21E2;&nbsp;';
    _arrowRight.setAttribute('class', 'mobile-hide');
    // const _arrowDown = document.createElement('div');
    // _arrowDown.innerHTML = '&#x21E3;';
    // _arrowDown.setAttribute('class', 'mobile-only');
    this._filter.appendChild(_arrowRight);
    // this._filter.appendChild(_arrowDown);

    this._level1Select.addEventListener('change', (e) => {
      this._updateLevel2Selet(e);
      this._showData();
    });
  }

  _constructLevel2Select() {
    for(let o of Subsidies[ 'low-income' ][ 'items' ]) {
      let thisOpt = document.createElement('option');
      thisOpt.setAttribute('value' , o.name);
      thisOpt.appendChild(document.createTextNode(o.name));
      this._level2Select.appendChild(thisOpt);
    }
    this._level2Select.setAttribute('class', 'level2Select');

    const _selectL2Group = document.createElement('div');
    _selectL2Group.setAttribute('class', 'selectL2Group');
    _selectL2Group.appendChild(document.createTextNode('項目：'));
    _selectL2Group.appendChild(this._level2Select);
    this._filter.appendChild(_selectL2Group);

    this._level2Select.addEventListener('change', this._dispatcher);

  }

  _updateLevel2Selet(e) {
    const thisL1SelectedVal = e.target.value;
    const _newSelectL2 = document.createElement('select');
    const _originSelectL2 = document.querySelector('.level2Select');
    const _thisL2Group = document.querySelector('.selectL2Group');
    ga('send', 'event', 'project', 'click', 'change search: [' + thisL1SelectedVal + ']');
    for(let o of Subsidies[ thisL1SelectedVal ][ 'items' ]) {
      let thisOpt = document.createElement('option');
      thisOpt.setAttribute('value' , o.name);
      thisOpt.appendChild(document.createTextNode(o.name));
      _newSelectL2.appendChild(thisOpt);
    }
    _newSelectL2.setAttribute('class', 'level2Select')
    _newSelectL2.addEventListener('change', this._dispatcher);
    _originSelectL2.removeEventListener('change', this._dispatcher);
    _thisL2Group.replaceChild(_newSelectL2, _originSelectL2);

  }

  _dispatcher(e) {
    const thisL1SelectedVal = document.querySelector('.level1Select').value;
    const thisL2SelectedVal = document.querySelector('.level2Select').value;
    ga('send', 'event', 'project', 'click', 'change search: [' + thisL1SelectedVal + ', ' + thisL2SelectedVal + ']');
    this._showData();
  }

  _showData() {
    this._smoothScroll('header');
    const originData = document.querySelector('.dataArea');
    const thisData = document.createElement('div');
    const thisL1 = _.get(document.querySelector('.level1Select'), [ 'value' ]);
    const thisL2 = _.get(document.querySelector('.level2Select'), [ 'value' ]);

    thisData.setAttribute('class', 'dataArea')

    const subsidyTitle = document.createElement('div');
    subsidyTitle.setAttribute('class', 'data_title');
    const subsidyQualification = document.createElement('div');
    subsidyQualification.setAttribute('class', 'data_qualification');
    const subsidyRequirement = document.createElement('div');
    subsidyRequirement.setAttribute('class', 'data_requirement');
    const subsidyInstitution = document.createElement('div');
    subsidyInstitution.setAttribute('class', 'data_institution');
    const subsidyContent = document.createElement('div');
    subsidyContent.setAttribute('class', 'data_content');

    subsidyTitle.innerHTML = '<div><h2>' + thisL2 + '</h2></div>';
    subsidyQualification.innerHTML = '<div><h3>申請資格</h3></div><div class="_content">' + _.get(_.find(_.get(Subsidies, [ thisL1, 'items' ]), { name : thisL2 }), [ 'qualification' ], '').join('') + '</div>';
    subsidyRequirement.innerHTML = '<div><h3>所需證件</h3></div><div class="_content">' + _.get(_.find(_.get(Subsidies, [ thisL1, 'items' ]), { name : thisL2 }), [ 'requirement' ], '').join('') + '</div>';
    subsidyInstitution.innerHTML = '<div><h3>申請管道</h3></div><div class="_content">' + _.get(_.find(_.get(Subsidies, [ thisL1, 'items' ]), { name : thisL2 }), [ 'institution' ], '').join('') + '</div>';
    subsidyContent.innerHTML = '<div><h3>可領補助</h3></div><div class="_content">' + _.get(_.find(_.get(Subsidies, [ thisL1, 'items' ]), { name : thisL2 }), [ 'content' ], '').join('') + '</div>';

    thisData.appendChild(subsidyTitle);
    thisData.appendChild(subsidyQualification);
    thisData.appendChild(subsidyRequirement);
    thisData.appendChild(subsidyInstitution);
    thisData.appendChild(subsidyContent);

    if(originData) {
      this._main.replaceChild(thisData, originData);
    } else {
      this._main.appendChild(thisData);
    }

    this._updateNoticeBarDisplay();

  }

  _setNoticebar() {
    this._noticeBar.setAttribute('class', 'notice-bar');
    this._noticeBar.innerHTML = '<div class="continue" style="background-image: url(./img/continue.png);"></div>';
    document.querySelector('body').appendChild(this._noticeBar);
    this._noticeBar.addEventListener('click', (e) => {
      const currTop = this._currentYPosition();
      const tHtml = document.documentElement;
      this._smoothScroll('', (currTop + tHtml.clientHeight/3));
      this._updateNoticeBarDisplay();
    });
  }

  _updateNoticeBarDisplay() {
    const tHtml = document.documentElement;
    const marginBottom = 0;
    const currTop = this._currentYPosition();
    const currBottom = this._currentYPosition() + tHtml.clientHeight;
    const mainBottom = this._elmYPosition('main') + this._main.clientHeight;
    if(currBottom < mainBottom) {
      this._noticeBar.setAttribute('class', 'notice-bar -show');
    } else {
      this._noticeBar.setAttribute('class', 'notice-bar');
    }
  }

  _setWindowScrollBehavior() {
    window.onscroll = (e) => {
      this._updateNoticeBarDisplay();
    }
  }

  _currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
          return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
  }
  _elmYPosition(eID) {
      let elm = document.querySelector(eID);
      let y = elm.offsetTop;
      let node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
      } return y;
  }
  _smoothScroll(eID, yPos) {
      let startY = this._currentYPosition();
      let stopY = (yPos) ? yPos : this._elmYPosition(eID);
      let distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
          scrollTo(0, stopY); return;
      }
      let speed = Math.round(distance / 50);
      if (speed >= 20) speed = 20;
      let step = Math.round(distance / 25);
      let leapY = stopY > startY ? startY + step : startY - step;
      let timer = 0;
      if (stopY > startY) {
          for ( let i=startY; i<stopY; i+=step ) {
              setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
              leapY += step; if (leapY > stopY) leapY = stopY; timer++;
          } return;
      }
      for ( let i=startY; i>stopY; i-=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
  }

  initialize() {
    this._constructFilter();
    this._showData();
    this._setWindowScrollBehavior();
    this._setNoticebar();
    this._updateNoticeBarDisplay();
  }
}


window.onload = () => {
  const filter = new FilterBar();
  filter.initialize();
}
