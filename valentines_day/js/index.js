import './index.scss';
import './share.css';
import { _currentYPosition, _elmYPosition, _smoothScroll, _setShareFB } from './comm'
import _ from 'lodash';
import questionsSpec from './questions.json';
import truncate from 'truncate'

class ValentinesDay {
  constructor(){
    // this._nextPageBtn = document.querySelector('.btn-open-qa');
    // this._flags = document.querySelector('.flags');
    // this._flagsAside = document.querySelector('.page-qa aside .flags-container');
    // this._share1 = document.querySelector('header .menu.mobile-hide');
    // this._share2 = document.querySelector('.page-qa .menu.mobile-hide .btn-container');
    // this._sec1 = document.querySelector('.page-1');
    this._quizDiv = document.querySelector('.page.page-quiz .quiz-container');
    this._articlesInfo = [];
    this.gaRecord = {};

  }
  _setQuizAction() {
    const { questions } = questionsSpec;
    let questionsStr = '';
    let c = 0;
    for(var q in questions) {
      const { id, title = '', options = '' } = questions[ q ];
      questionsStr +=  `<div class="question-container ${(c !== 0) ? '-hidden' : ''}">
                          <div class="index" style="background-image: url(./img/${(c+1)}.png);"></div>
                          <div class="question">
                            <div class="question-content">
                              <div class="content">${title}</div>
                            </div>
                            <div class="options">
                              <div class="option" a-score="${options[ 0 ][ 'score' ]}" qid="${id}">${options[ 0 ][ 'title' ]}</div>
                              <div class="option" a-score="${options[ 1 ][ 'score' ]}" qid="${id}">${options[ 1 ][ 'title' ]}</div>
                              <div class="option" a-score="${options[ 2 ][ 'score' ]}" qid="${id}">${options[ 2 ][ 'title' ]}</div>
                              <div class="option" a-score="${options[ 3 ][ 'score' ]}" qid="${id}">${options[ 3 ][ 'title' ]}</div>
                              <div class="option" a-score="${options[ 4 ][ 'score' ]}" qid="${id}">${options[ 4 ][ 'title' ]}</div>
                            </div>
                          </div>
                        </div>`;
      c++;
    }
    this._quizDiv.innerHTML =  `${questionsStr}`;
  }
  _setNextBtnAction() {
    const { results } = questionsSpec;
    const _btnPassAns = document.querySelector('.pass-answer');
    _btnPassAns.addEventListener('click', () => {
      // const _q3SelectedAns = document.querySelector('.option.-selected[qid="q3"]');
      const currSelectedCount = document.querySelectorAll('.option.-selected').length;
      // const alertMsg = document.querySelector('.alert-msg') || document.createElement('div');
      // alertMsg.appendChild(document.createTextNode('請答題後再點選看結果哦'));
      // alertMsg.setAttribute('class', 'alert-msg');
      // alertMsg.setAttribute('style', 'position: fixed; bottom: 20px; left: 50vw; text-align: center; width: 80vw; padding: 5px; margin-left: -40vw; color: #2cb5ae; background-color: #fff;');

      if(currSelectedCount !== questionsSpec[ 'questions' ].length){
        // document.querySelector('body').appendChild(alertMsg);
        return;
      } else {
        // if(document.querySelector('.alert-msg')) {
        //   document.querySelector('body').removeChild(document.querySelector('.alert-msg'));
        // }
      }
      const _selectedAns = _.map(document.querySelectorAll('.option.-selected'), (o) => {
        return o.getAttribute('a-score');
      });
      const totalScore = _.sumBy(_selectedAns, (i) => (Number(i)));
      const result = _.chain(results)
                      .filter((itm) => {
                        return (totalScore >= itm.range.from && totalScore < itm.range.to)
                      }).first().value();
      ga('send', 'event', 'project', 'click', 'quiz finished');

      _smoothScroll(`.${result[ 'id' ]}`);
    });
  }
  _setOptionAction() {
    const _btnPassAns = document.querySelector('.pass-answer div');
    const _options = document.querySelectorAll('.option');
    const _questionContainer = document.querySelectorAll('.question-container');
    _.map(_options, (o) => {
      o.addEventListener('click', () => {
        const oldCurrI = Number(this._quizDiv.getAttribute('curr-index'));
        const newCurrI = (oldCurrI + 1);

        const _currQuestSelectedOptions = document.querySelector(`.option.-selected[qid="${o.getAttribute('qid')}"]`);
        if(_currQuestSelectedOptions) {
          _currQuestSelectedOptions.setAttribute('class', 'option');
        }
        o.setAttribute('class', 'option -selected');
        const currSelectedCount = document.querySelectorAll('.option.-selected').length;
        this._quizDiv.setAttribute('curr-index', currSelectedCount);
        _questionContainer[ oldCurrI ].setAttribute('class', 'question-container -hidden');
        _questionContainer[ (oldCurrI < (questionsSpec[ 'questions' ].length - 1)) ? newCurrI: oldCurrI ].setAttribute('class', 'question-container');

        if(currSelectedCount === questionsSpec[ 'questions' ].length) {
          _btnPassAns.setAttribute('style', 'display: block');
        }

      });
    });
  }
  _setPlayAgain() {
    const btnPlayAgain = document.querySelectorAll('.play-again');
    _.map(btnPlayAgain, (o) => {
      o.addEventListener('click', (e) => {
        this._resetQuiz();
        ga('send', 'event', 'project', 'click', 'quiz play-again');

        _smoothScroll('.page-quiz');
      });
    });
  }
  _resetQuiz() {
    const _questionContainer = document.querySelectorAll('.question-container');
    const _btnPassAns = document.querySelector('.pass-answer div');
    _questionContainer[ 0 ].setAttribute('class', 'question-container');
    _questionContainer[ 1 ].setAttribute('class', 'question-container -hidden');
    _questionContainer[ 2 ].setAttribute('class', 'question-container -hidden');
    this._quizDiv.setAttribute('curr-index', '0');
    _btnPassAns.setAttribute('style', 'display: none');
    _.map(document.querySelectorAll('.option.-selected'), (o) => {
      o.setAttribute('class', 'option');
    })
  }
  _setShareResult() {
    const _shareBtns = document.querySelectorAll('.share-result');
    const _pjId = 'valentines_day';
    _.map(_shareBtns, (o, i) => {
      const _targ = o.getAttribute('target');
      _setShareFB('', 'share-result', `${_pjId}/${_targ}`, o);
    });
  }
  _setStartAction() {
    const _start = document.querySelector('.start');
    _start.addEventListener('click', (e) => {
      _smoothScroll('.page-quiz');
    });
  }
  _setHamburgerAction() {
    const _btnHamburger = document.querySelector('.open-sidebar');
    _btnHamburger.addEventListener('click', this._resetSidebar);
  }
  _resetSidebar() {
    const asideDom = document.querySelector('aside');
    if(asideDom.getAttribute('class')) {
      asideDom.removeAttribute('class');
    } else {
      asideDom.setAttribute('class', 'show');
    }
  }
  _setStoryAction() {
    const stories = document.querySelectorAll('.sidebar .story');
    const storiesChooser = document.querySelectorAll('.story-choose .story .story-choose-img');
    _.map(stories, (o) => {
      o.addEventListener('click', () => {
        const _selectedStory = document.querySelector('.story.active');
        if(_selectedStory){
          _selectedStory.setAttribute('class', 'story');
        }
        o.setAttribute('class', 'story active');
        this._resetSidebar();
        ga('send', 'event', 'project', 'click', `check up ${o.getAttribute('targetStory')} (sidebar)`);
        _smoothScroll(`.${o.getAttribute('targetStory')}`);
      });
    });
    _.map(storiesChooser, (o) => {
      o.addEventListener('click', () => {
        ga('send', 'event', 'project', 'click', `check up ${o.parentNode.getAttribute('targetStory')} (mobile article bottom)`);
        _smoothScroll(`.${o.parentNode.getAttribute('targetStory')}`)
      });
    });
  }
  _prepareInfo() {
      const _articles = document.querySelectorAll('.page.article');
      _.map(_articles, (art, index) => {
        const _identity = `.${art.getAttribute('class').split(' ').join('.')}`;
        const _topY = _elmYPosition(_identity);
        const _BottomY = _topY + art.clientHeight;
        this._articlesInfo[ index ] = { _identity, _topY, _BottomY }
      });
  }
  _setWindowEventHendler() {
    window.onscroll = () => {
      this._setNav();
    }
    window.onresize = () => {
      this._prepareInfo();
      this._setNav();
    }
  }
  _setNav() {
    const tHtml = document.documentElement;
    const currY = _currentYPosition();
    const currBottom = currY + tHtml.clientHeight;
    const _shouldShow = _.chain(this._articlesInfo)
                          .filter((itm) => {
                            return (currY >= itm._topY && currBottom < itm._BottomY)
                          }).first().value();
    if(_shouldShow) {
      document.querySelector('.nav').removeAttribute('style');
      const _navActive = document.querySelector('.nav .item.active');
      if(_navActive) {
        const _class = _navActive.getAttribute('class').replace('active', '');
        _navActive.setAttribute('class', _class);
      }
      const targetNavItem = document.querySelector(`.nav .item[story="${_shouldShow[ '_identity' ]}"]`);
      const targetNavIteClass = targetNavItem.getAttribute('class');
      targetNavItem.setAttribute('class', targetNavIteClass + ' active');
      this.gaRecord
      if(!this.gaRecord[ _shouldShow[ '_identity' ] ]){
        this.gaRecord[ _shouldShow[ '_identity' ] ] = true;
        ga('send', 'event', 'project', 'visible', `article=${_shouldShow[ '_identity' ]}`);
      }
    } else {
      document.querySelector('.nav').setAttribute('style', 'display: none!important;');
    }
  }
  _setNavAction() {
    const _navItems = document.querySelectorAll('.nav div[story^=".page.article"]');
    _.map(_navItems, (itm) => {
      itm.addEventListener('click', () => {
        ga('send', 'event', 'project', 'click', `check up ${itm.getAttribute('story')} (desktop nav on the left side)`);
        _smoothScroll(itm.getAttribute('story'));
      })
    });
  }
  _setReadMore() {
    const keepReads = document.querySelectorAll('.keep-reading');
    _.map(keepReads, (o) => {
      o.addEventListener('click', () => {
        _smoothScroll(o.getAttribute('target'));
      });
    });
  }
  _setOutsideShareGA() {
    const shareItm = document.querySelectorAll('.menu-item');
    _.map(shareItm, (o) => {
      o.addEventListener('click', () => {
        ga('send', 'event', 'project', 'click', 'menuebar share: ' + o.getAttribute('identity'));
      })
    });
  }

  initialize() {

    this._setQuizAction();
    this._setNextBtnAction();
    this._setOptionAction();
    this._setPlayAgain();
    this._setShareResult();
    this._setStartAction();
    this._setHamburgerAction();
    this._setStoryAction();
    this._prepareInfo();
    this._setWindowEventHendler();
    this._setNavAction();
    this._setReadMore();
    this._setOutsideShareGA();
  }


}

window.onload = () => {
  const valentinesday = new ValentinesDay();
  valentinesday.initialize();
}
