import _ from 'lodash';
import MemberList from './members-of-legislative-yuan.json';
import './auto-complete.css';
import './index.scss';

const autoComplete = require('./auto-complete.min.js');
class FilterBar{

  constructor() {
    this._main = document.querySelector('main');
    this._filter = document.createElement('div');
    this._citySelect = document.createElement('select');
    this._areaSelect = document.createElement('select');
    this._memberName = document.createElement('input');
    this.citiesList = [];
    this.areaList = {};
    this._updateAreaSelect = this._updateAreaSelect.bind(this);
    this._showDatarow = this._showDatarow.bind(this);
    this._setMemberNameAutoComplete = this._setMemberNameAutoComplete.bind(this);
    this._dispatch = this._dispatch.bind(this);
  }

  _constructFilter() {
    this._constructCitySelect();
    this._constructAreaSelect();
    this._constructMemberName();
    this._filter.setAttribute('class', 'filter');
    this._main.appendChild(this._filter);
    this._showDatarow();
    this._setMemberNameAutoComplete();
  }

  _constructCitySelect() {
    this.citiesList = _.chain(MemberList)
                        .uniqBy('city')
                        .map((itm) => (itm.city)).value();

    const defaultOpt = document.createElement('option');
    defaultOpt.appendChild(document.createTextNode('全部'));
    this._citySelect.appendChild(defaultOpt);

    for(let i = 0; i < this.citiesList.length; i++) {
      let thisOpt = document.createElement('option');
      thisOpt.setAttribute('value', this.citiesList[ i ]);
      thisOpt.appendChild(document.createTextNode(this.citiesList[ i ]));
      this._citySelect.appendChild(thisOpt);
    }
    this._filter.appendChild(this._citySelect);
    this._citySelect.setAttribute('class', 'citySelect');
    this._citySelect.addEventListener('change', (e) => {
      this._updateAreaSelect(e);
      this._showDatarow();
    });
  }

  _constructAreaSelect() {
    for(let i = 0; i < this.citiesList.length; i++) {
      this.areaList[ this.citiesList[ i ] ] = _.chain(MemberList)
                                            .filter({ 'city' : this.citiesList[ i ] })
                                            .map((itm) => (itm.area)).value();
    }
    const defaultOpt = document.createElement('option');
    defaultOpt.appendChild(document.createTextNode('全部'));
    this._areaSelect.appendChild(defaultOpt);
    // for(let i = 0; i < this.areaList[ '全部' ].length; i++) {
    //   let thisOpt = document.createElement('option');
    //   thisOpt.setAttribute('value', this.areaList[ this.citiesList[ 0 ] ][ i ]);
    //   thisOpt.appendChild(document.createTextNode(this.areaList[ this.citiesList[ 0 ] ][ i ]));
    //   this._areaSelect.appendChild(thisOpt);
    // }
    this._areaSelect.setAttribute('class', 'areaSelect');
    this._areaSelect.addEventListener('change', this._dispatch);
    this._filter.appendChild(this._areaSelect);
  }

  _updateAreaSelect(e) {
    const thisSelectedCity = e.target.value;
    const thisSelect = document.createElement('select');
    const originSelect = document.querySelector('.areaSelect');

    const defaultOpt = document.createElement('option');
    defaultOpt.appendChild(document.createTextNode('全部'));
    thisSelect.appendChild(defaultOpt);

    if((thisSelectedCity !== '全部')) {
      for(let i = 0; i < this.areaList[ thisSelectedCity ].length; i++) {
        if(!this.areaList[ thisSelectedCity ][ i ]) { continue; }
        let thisOpt = document.createElement('option');
        thisOpt.setAttribute('value', this.areaList[ thisSelectedCity ][ i ]);
        thisOpt.appendChild(document.createTextNode(this.areaList[ thisSelectedCity ][ i ]));
        thisSelect.appendChild(thisOpt);
      }
    }

    thisSelect.setAttribute('class', 'areaSelect');
    originSelect.removeEventListener('change', this._dispatch);
    thisSelect.addEventListener('change', this._dispatch);
    this._filter.replaceChild(thisSelect, originSelect);

    ga('send', 'event', 'project', 'click', 'search?' + thisSelectedCity);
  }

  _dispatch({target: targ}) {
    const thisCity = _.get(document.querySelector('.citySelect'), [ 'value' ]);
    const thisArea = _.get(document.querySelector('.areaSelect'), [ 'value' ]);
    const thisMemberName = _.get(document.querySelector('.memberName'), [ 'value' ]);
    ga('send', 'event', 'project', 'click', 'search?[' + thisCity + ',' + thisArea + ',' + thisMemberName +']');
    // switch (targ.getAttribute('class')) {
    //   case 'areaSelect':
    //     break;
    //   case 'memberName':
    //     ga('send', 'event', 'project', 'click', 'search?' + thisMemberName);
    //     break;
    //   default:
    // }
    this._showDatarow();
  }

  _constructMemberName() {
    this._memberName.setAttribute('class', 'memberName');
    this._memberName.setAttribute('placeholder', '立委姓名');
    this._memberName.addEventListener('change', this._dispatch);
    this._memberName.addEventListener('keyup', this._showDatarow);
    this._filter.appendChild(this._memberName);
  }
  _setMemberNameAutoComplete() {
    // const thisCity = _.get(document.querySelector('.citySelect'), [ 'value' ]);
    // const thisArea = _.get(document.querySelector('.areaSelect'), [ 'value' ]);
    // const _memberNameList = MemberList.map((itm) => (itm.name));

    const _memberNameAutoComplete = new autoComplete({
      selector: '.memberName',
      minChars: 1,
      cache: false,
      source: (term, suggest) => {
        term = term.toLowerCase();
        const thisCity = _.get(document.querySelector('.citySelect'), [ 'value' ]);
        const thisArea = _.get(document.querySelector('.areaSelect'), [ 'value' ]);
        let choices = _.chain(MemberList)
                        .filter((o) => {
                          return !o.city || (o.city === thisCity) || (thisCity === '全部');
                        })
                        .filter((o) => {
                          return !o.area || (o.area === thisArea) || (thisArea === '全部');
                        })
                        .map((itm) => (itm.name))
                        .value();
        let suggestions = [];
        for (let i = 0; i < choices.length; i++) {
          if (~choices[i].toLowerCase().indexOf(term)) {
            suggestions.push(choices[i]);
          }
        }
        suggest(suggestions);
      },
      onSelect: (e, term, item) => {
        this._dispatch(e);
      }
    });

  }

  _showDatarow() {
    const thisDataRow = document.createElement('div');
    const thisCity = _.get(document.querySelector('.citySelect'), [ 'value' ]);
    const thisArea = _.get(document.querySelector('.areaSelect'), [ 'value' ]);
    const thisMemberName = _.get(document.querySelector('.memberName'), [ 'value' ]);

    const originDataRow = document.querySelector('.dataRow');
    const thisDataResult = _.chain(MemberList)
                            .filter((o) => {
                              return !o.city || (o.city === thisCity) || (thisCity === '全部');
                            })
                            .filter((o) => {
                              return !o.area || (o.area === thisArea) || (thisArea === '全部');
                            })
                            .filter((o) => {
                              return !o.name || (o.name.indexOf(thisMemberName) > -1);
                            })
                            .value();
    const thisUl = document.createElement('ul');
    const titleLi = document.createElement('li');
    titleLi.innerHTML = `<ul>
                          <li>選區</li>
                          <li>現任立委</li>
                          <li>舊罷免提議人數（２％）</li>
                          <li>舊罷免連署人數（13％）</li>
                          <li>新罷免提議人數（１％）</li>
                          <li>新罷免連署人數（10％）</li>
                        </ul>`;
    titleLi.setAttribute('class', 'mobile-hide');
    thisUl.appendChild(titleLi);
    for(let i = 0; i < thisDataResult.length; i++) {
      let thisLi = document.createElement('li');
      let recallableText = (thisDataResult[ i ].city !== '不分區') ? '' : '(不分區立委無法罷免)';
      thisLi.innerHTML = `<ul>
                            <li class="city-n-area">${thisDataResult[ i ].city} ${_.get(thisDataResult[ i ], [ 'area' ], '')}<sub>${recallableText}</sub></li>
                            <li class="name">${thisDataResult[ i ].name}</li>
                            <li class="people-number dark dark--550"><span class="desktop-hide">舊罷免提議人數（２％）</span>${_.get(thisDataResult[ i ], [ 'oConstrainPropose' ], '-')}</li>
                            <li class="people-number dark"><span class="desktop-hide">舊罷免連署人數（13％）</span>${_.get(thisDataResult[ i ], [ 'oConstrainPetition' ], '-')}</li>
                            <li class="people-number dark--550 bold"><span class="desktop-hide">新罷免提議人數（１％）</span>${_.get(thisDataResult[ i ], [ 'nConstrainPropose' ], '-')}</li>
                            <li class="people-number bold"><span class="desktop-hide">新罷免連署人數（10％）</span>${_.get(thisDataResult[ i ], [ 'nConstrainPetition' ], '-')}</li>
                          </ul>`;
      thisUl.appendChild(thisLi);
    }

    thisDataRow.setAttribute('class', 'dataRow');
    thisDataRow.appendChild(thisUl);
    if(originDataRow) {
        this._main.replaceChild(thisDataRow, originDataRow);
    } else {
      this._main.appendChild(thisDataRow);
    }
  }

  initialize() {
    this._constructFilter();
  }
}


window.onload = () => {
  const filter = new FilterBar();
  filter.initialize();
}
