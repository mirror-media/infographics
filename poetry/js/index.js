import { currentYPosition, elmYPosition } from 'kc-scroll'
import { addClass } from './comm.js'
import { youtube_vidieos, straas_videos } from './assets'
import _ from 'lodash'
import {
  Poetry,
  PoetryMobile,
  INTROSUCTION_VIDEO,
  renderVids,
  emitter,
  DOC,
  VIEWPORT,
  videosContainer,
  getClientOS,
  isMobile,
  disableScroll,
  enableScroll
} from './demoRender.js'
import EventEmitter from './EventEmitter-4.0.3.min.js'
import './index.styl'

let projectInitFlag = false
let playbackRateSetFlag1 = false
let playbackRateSetFlag2 = false
let isVideoPlaying = false

const OPEN_VID = 'OPEN_VID'
const OPEN_VID_MOBILE = 'OPEN_VID_MOBILE'
const GO_FLOAT = 'GO_FLOAT'
const GO_LIST = 'GO_LIST'
const PLAYING = 'PLAYING'
const GAMEPAUSED = 'GAMEPAUSED'

const AUDIO = DOC.querySelector('.audio')

class Project {
  constructor () {
    console.log('isMobile', isMobile)
    this.peotry = !isMobile ? new Poetry() : new PoetryMobile()
    this.initialize = this.initialize.bind(this)
    this.setUpEventListener = this.setUpEventListener.bind(this)
    this.toggleVid = this.toggleVid.bind(this)
    this.emitter = emitter
  }

  setUpEventListener () {
    console.log('setup events')
    return new Promise((resolve) => {
      !isMobile && this.emitter.on(OPEN_VID, this.toggleVid)
      !isMobile && this.emitter.on(GO_FLOAT, this.toggleVid)
      isMobile && this.emitter.on(OPEN_VID_MOBILE, this.toggleVid)
      isMobile && this.emitter.on(GO_LIST, this.toggleVid)
      resolve()
    })
  }
  toggleVid ({ event ,x, y, group, videosContainers, vidData }) {
    return new Promise((resolve) => {
      if (event === OPEN_VID) {
        setTimeout(function() {
          videosContainers.setAttribute('style', `top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999; opacity: 1;`)
          videosContainers.setAttribute('data-currgroup', group)
          videosContainers.setAttribute('data-currx', x)
          videosContainers.setAttribute('data-curry', y)
          const targetVid = videosContainers.querySelector(`.vid-container[data-group="${group}"]`)
          targetVid && targetVid.removeAttribute('style')
          
          const videoId = _.get(_.filter(youtube_vidieos, { group: group }), [ 0, 'id' ])
          const btnClose = targetVid.querySelector('.close-btn-container')
          let player
          let done = false
    
          const stopVideo = () => {
            player.stopVideo()
            player.destroy()
            btnClose.removeEventListener('click', stopVideo)
            !isMobile && emitter.trigger('GO_FLOAT', [{ event: 'GO_FLOAT', videosContainers: videosContainers }])
          }
          
          const onPlayerReady = (event) => {
            // event.target.playVideo()
            
            btnClose.setAttribute('style', 'opacity: 1;')
            btnClose.addEventListener('click', stopVideo)
          } 

          const onPlayerStateChange = (event) => {
            if (event.data == YT.PlayerState.ENDED && !done) {
              stopVideo()
              done = true
            }
          }
    
          player = new YT.Player('player-' + group, {
            height: VIEWPORT[ 1 ],
            width: VIEWPORT[ 0 ],
            videoId,
            playerVars: {
              autoplay: 1,
              playsinline: 1,
              showinfo: 0              
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })

          /**
           * the following codes are banned, 'cause we start to use youtube as player
           * 
           * if (group !== 'rain' && group !== 'smell' && group !== 'zao' && group !== 'heart') {
           *   console.log(`render normal video`)
           *   targetVid && targetVid.querySelector('video').play()
           *   targetVid && (targetVid.querySelector('video').onended = function () {
           *     // this.parentNode.querySelector('.close-btn-container').removeAttribute('style')            
           *     // this.setAttribute('style', `background-image: url(${this.getAttribute('poster-path')});`)
           *     // setTimeout(() => {
           *     //   this.load()
           *     // }, 250)
           *     // setTimeout(() => {
           *       !isMobile && emitter.trigger('GO_FLOAT', [{ event: 'GO_FLOAT', videosContainers: videosContainers }])
           *     // }, 1000)
           *   })
           * } else if (group !== 'zao' && group !== 'heart') {
 
           * } else {
           *   const videoId = _.get(_.filter(straas_videos, { group: group }), [ 0, 'id' ])
           *   const btnClose = targetVid.querySelector('.close-btn-container')
             
           *   const StraaS = window.StraaS
           *   const Player = StraaS.Player 
 
           *   let playerInstance
 
           *   const stopPlayer = () => {
           *     playerInstance.pauseVideo()
           *     btnClose.removeEventListener('click', stopPlayer)
           *     !isMobile && emitter.trigger('GO_FLOAT', [{ event: 'GO_FLOAT', videosContainers: videosContainers }])
           *   }
           *   playerInstance = new Player('#player-' + group, {
           *     type: Player.Type.VIDEO,
           *     id: videoId,
           *     accountId: 'mirrormedia.mg',
           *     playerVars: {
           *       autoplay: Player.Autoplay.YES,
           *     },
           *     events: {
           *       canplay: function (event) {
           *         btnClose.setAttribute('style', 'opacity: 1;')
           *         btnClose.addEventListener('click', stopPlayer)   
           *       },
           *       loadstart: function (event) {
           *         event.target.level = event.target.levels.length - 1           
           *       },
           *       ended: function (event) {
           *         stopPlayer()
           *       }
           *     }
           *   })
           * }
           */

          AUDIO.pause()
          isVideoPlaying = true
          resolve()
        }, 250);
      } else if (event === OPEN_VID_MOBILE) {
        setTimeout(function() {
          videosContainers.setAttribute('data-currgroup', group)
          disableScroll()

          const targetVid = videosContainers.querySelector(`.vid-container[data-group="${group}"]`)

          if (targetVid ) {
            const vid = targetVid.querySelector('video')
            targetVid.removeAttribute('style')

            const videoId = _.get(_.filter(youtube_vidieos, { group: group }), [ 0, 'id' ])
            const btnClose = targetVid.querySelector('.close-btn-container')
            let player
            let done = false
      
            
            const stopVideo = () => {
              player.stopVideo()
              player.destroy()
              btnClose.removeEventListener('click', stopVideo)
              isMobile && emitter.trigger('GO_LIST', [{ event: 'GO_LIST', videosContainers: videosContainers }])
            }
            
            const onPlayerReady = (event) => {
              AUDIO.pause()
              event.target.playVideo()
              console.log('play video')
              btnClose.setAttribute('style', 'opacity: 1;')
              btnClose.addEventListener('click', stopVideo)
            } 

            const onPlayerStateChange = (event) => {
              if (event.data == YT.PlayerState.ENDED && !done) {
                stopVideo()
                done = true
              }
            }
      
            player = new YT.Player('player-' + group, {
              height: VIEWPORT[ 1 ],
              width: VIEWPORT[ 0 ],
              videoId,
              playerVars: {
                autoplay: 1,
                playsinline: 1,
                showinfo: 0
              },
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            })

            /**
             * the following codes are banned, 'cause we start to use youtube as player
             * 
             * if (group !== 'rain' && group !== 'smell' && group !== 'zao' && group !== 'heart') {
             *   // console.log(vid.played.end(0), `(${typeof(vid.played.end(0))})`)
             *   // console.log(currentTime, `(${typeof(vid.currentTime)})`)
             *   // if (!vid.currentTime) {
             *   // // if never use <source> then use the property src and reload
             *   //   vid.setAttribute('src', vidData.url)
             *   //   vid.load()
             *   // } 
             *   // console.log('currentTime', Number(vid.currentTime))
             *   // console.log('play msg', res)
               
             *   const promiseVidPlay = vid.play()
             *   promiseVidPlay.then((value, v) => {
             *     AUDIO.pause()
             *     isVideoPlaying = true
             *     vid && (vid.onended = function () {
             *       // this.parentNode.querySelector('.close-btn-container').removeAttribute('style')
             *       // this.setAttribute('style', `background-image: url(${this.getAttribute('poster-path')});`)
             *       // setTimeout(() => {
             *       //   this.load()
             *       // }, 250)
             *       // setTimeout(() => {
             *         isMobile && emitter.trigger('GO_LIST', [{ event: 'GO_LIST', videosContainers: videosContainers }])
             *       // }, 1000)
             *     })    
             *   }).catch((err) => {
             *     console.log('err', err)
             *   })
             * } else if (group !== 'zao' && group !== 'heart') {
               
             * } else {
             *   const videoId = _.get(_.filter(straas_videos, { group: group }), [ 0, 'id' ])
             *   const btnClose = targetVid.querySelector('.close-btn-container')
               
             *   const StraaS = window.StraaS
             *   const Player = StraaS.Player 
   
             *   let playerInstance
   
             *   const stopPlayer = () => {
             *     playerInstance.pauseVideo()
             *     btnClose.removeEventListener('click', stopPlayer)
             *     isMobile && emitter.trigger('GO_LIST', [{ event: 'GO_LIST', videosContainers: videosContainers }])
             *   }
             *   playerInstance = new Player('#player-' + group, {
             *     type: Player.Type.VIDEO,
             *     id: videoId,
             *     accountId: 'mirrormedia.mg',
             *     playerVars: {
             *       autoplay: Player.Autoplay.YES,
             *     },
             *     events: {
             *       canplay: function (event) {
             *         AUDIO.pause()
             *         btnClose.setAttribute('style', 'opacity: 1;')
             *         btnClose.addEventListener('click', stopPlayer)   
             *       },
             *       loadstart: function (event) {
             *         event.target.level = event.target.levels.length - 1           
             *       },
             *       ended: function (event) {
             *         stopPlayer()
             *       }
             *     }
             *   })
             * }
             */

          }
        }, 250);
      } else if (event === GO_FLOAT || event === GO_LIST) {
        const currGroup = videosContainers.getAttribute('data-currgroup')
        const targetVid = videosContainers.querySelector(`.vid-container[data-group="${currGroup}"]`)
        targetVid && targetVid.setAttribute('style', 'display: none;')

        /**
         * the following codes are banned, 'cause we start to use youtube as player
         * 
         * if (currGroup !== 'rain' && currGroup !== 'smell' && currGroup !== 'heart' && currGroup !== 'zao') {
         * targetVid && targetVid.querySelector('video').pause()
         * }
         */
        AUDIO.play()
        isVideoPlaying = false
        if (event === GO_FLOAT ) {
          const currX = videosContainers.getAttribute('data-currx')
          const currY = videosContainers.getAttribute('data-curry')
          videosContainers.setAttribute('style', `top: ${currY}px; left: ${currX}px; width: 1px; height: 1px; z-index: 999; opacity: 0;`)
          this.peotry.state[GAMEPAUSED] = false
        } else {
          console.log('close the vid')
          videosContainers.setAttribute('style', 'width: 0; height: 0; opacity: 0')
          DOC.querySelector('.vid-list').setAttribute('style', 'opacity: 0.8;')
          enableScroll()
        }
        setTimeout(() => {
          videosContainers.removeAttribute('style')
          resolve()
        }, 1000)
      }
    })
  }
  initialize() {
    return Promise.all([
      this.setUpEventListener(),
      this.peotry.init()
    ]).then(() => {
      // isMobile && renderVids()
    })
  }
}

window.addEventListener('load', () => {
  if (!isMobile) {
    const hideIntroduction = () => {
      DOC.querySelector('.introduction > #introduction-video').setAttribute('style', 'display: none;')
      DOC.querySelector('.introduction > #introduction-video').parentNode.setAttribute('style', 'display: none;')
      document.querySelector('.continue').setAttribute('style', 'display: none;')
    }

    document.querySelector('.continue').addEventListener('click', () => {
      hideIntroduction()
    })

    let player
    let done = false

    const onPlayerReady = (event) => {
      event.target.playVideo()
      if (!projectInitFlag) {
        projectInitFlag = true
        const project = new Project()
        Promise.all([
          project.initialize(),
        ]).then(() => {
          console.log('done')
          renderVids()
        })
      }
    } 
  
    const onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.ENDED && !done) {
        hideIntroduction()
        done = true
      }
    }
  
    player = new YT.Player('introduction-video', {
      height: VIEWPORT[ 1 ],
      width: VIEWPORT[ 0 ],
      videoId: '7SDlZR7UXKs',
      playerVars: {
        autoplay: 1,
        playsinline: 1,
        controls: 0,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  } else {
    const project = new Project()
    Promise.all([
      project.initialize(),
    ]).then(() => {})    
  }
})

/**
 * the following codes are banned, 'cause we start to use youtube video as introduction
 * window.addEventListener('DOMContentLoaded', () => {
 *   if (!isMobile) {
 *     INTROSUCTION_VIDEO.addEventListener('play', () => {
 *       console.log('play')
 *       if (!projectInitFlag) {
 *         projectInitFlag = true
 *         const project = new Project()
 *         Promise.all([
 *           project.initialize(),
 *         ]).then(() => {
 *           console.log('done')
 *         })
 *       }
 *       setTimeout(function() {
 *         addClass(INTROSUCTION_VIDEO, 'fadein')
 *       }, 6000)
 *       setTimeout(function() {
 *         INTROSUCTION_VIDEO.setAttribute('style', 'display: none;')
 *         INTROSUCTION_VIDEO.parentNode.setAttribute('style', 'display: none;')
 *         renderVids()          
 *       }, 10000)
 *     })
 *   } else {
 *     * INTROSUCTION_VIDEO.parentNode.setAttribute('style', `height: ${VIEWPORT[1] * 1.5}px`)
 *     const project = new Project()
 *     Promise.all([
 *       project.initialize(),
 *     ]).then(() => {
 *       console.log('done')
 *     })
 *   }
 * })
 */

let isTouchHolding = false
window.addEventListener('touchstart', (e) => {
  isTouchHolding = true
})
window.addEventListener('touchend', () => {
  isTouchHolding = false
  enableScroll()
})
window.addEventListener('resize', () => {
  if (isTouchHolding) {
    console.log('resize and holding')
    disableScroll()
  }
})
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    AUDIO.pause()
  } else if (document.visibilityState === 'visible') {
    if (!isVideoPlaying) {
      AUDIO.play()
    }
  }
})