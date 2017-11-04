import { config } from '../config'
import {
  houseInfoTitles,
  houseSituations,
  // houseInfoCareers,
  // houseInfoRentShortest,
  // houseInfoPettible, 
} from '../constants'
import { RandomDistribution } from '../comm'

export class HouseRelease {
  constructor ({ rushRent, houses }) {
    this.rushRent = rushRent
    this.houses = houses[ 0 ].children[ 0 ].children
    this.setUpReleaser = this.setUpReleaser.bind(this)
    this.clearRelease = this.clearRelease.bind(this)
    this.setUpEventHandler = this.setUpEventHandler.bind(this)
    this.genRequirements = this.genRequirements.bind(this)

    Promise.all([
      this.setUpReleaser(),
      this.setUpEventHandler()
    ]).then(() => {
      this.rushRent.clearRelease = this.clearRelease
    })
  }
  setUpReleaser () {
    return new Promise((resolve) => {
      const houseNumber = this.houses.filter((c) => c.isSpriteContainer).length
      const max = houseNumber
      const min = 1
      console.log('this.level', this.rushRent.level)
      this.releaseInterval = setInterval(() => {
        let houseChosen = (Math.floor(Math.random() * (max - min)) + min) % houseNumber
        if (this.houses[ houseChosen ].isReleased) {
          let i = 0
          while (this.houses[ i ] && this.houses[ i ].isReleased) {
            i++
          }
          houseChosen = i
        }
        if (houseChosen === this.houses.length) {
          // window.clearInterval(this.releaseInterval)
          return
        }
        this.houses[ houseChosen ].isReleased = true
        Promise.all([
          this.genTitle(),
          this.genSituations(),
          this.genRequirements()
        ]).then((value) => {
          // console.log(value)
          this.rushRent.emitter.trigger(`RELEASE_${this.houses[ houseChosen ].group}`, [
            houseChosen, {
              title: value[ 0 ],
              requirements: value[ 2 ],
              situations: value[ 1 ]
            }
          ])          
        })
      }, config.levelScoreStone[ this.rushRent.level - 1 ].houseReleaseFrequency)
      resolve()
    })
  }
  genTitle () {
    return new Promise((resolve) => {
      const titlesLen = houseInfoTitles.length
      const min = 1
      const max = titlesLen

      const chosenTitle =  (Math.floor(Math.random() * (max - min)) + min) % titlesLen
      resolve(houseInfoTitles[ chosenTitle ])
    })
  }
  genSituations () {
    return new Promise((resolve) => {
      const situationsLen = houseSituations.length
      const situations = houseSituations.map((s) => ({ title: s.title, url: s.url }))
      // const max = situationsLen
      // const min = 1
      const thisSituationNum = (Math.round(Math.random() * (config.maxSituationNum)))

      let situationsPicked = []
      while (situationsPicked.length < thisSituationNum && thisSituationNum != 0) {
        const chosenSituation =  (Math.floor(Math.random() * 10000000)) % situationsLen
        if (!situations[ chosenSituation ].isSelected) {
          situationsPicked.push(situations[ chosenSituation ])
          situations[ chosenSituation ].isSelected = true
        }
      }
      resolve(situationsPicked)
    })
  }
  genRequirements () {
    return new Promise((resolve) => {
      this.infoRentRoom = this.infoRentRoom || new RandomDistribution({ distribution: config.rentRoomDistribution })
      this.infoGender = this.infoGender || new RandomDistribution({ distribution: config.genderRequiredDistribution })
      this.infoPettible = this.infoPettible || new RandomDistribution({ distribution: config.pettibleRequiredDistribution })
      this.infohortestRent = this.infohortestRent || new RandomDistribution({ distribution: config.shortestRentIntervalDistribution })
      
      // const careersLen = houseInfoCareers.length
      // const rentShortestRentLen = houseInfoRentShortest.length
      // const pettibleLen = houseInfoPettible.length

      const requirements = {}
      const min = 1

      Promise.all([
        this.infoRentRoom.getRamdom().then((valueChosen) => {
          const maxRent = valueChosen[ 'to' ] 
          const minRent = valueChosen[ 'from' ]
          const maxRoomSize = valueChosen[ 'room' ] + 3
          const minRoomSize = valueChosen[ 'room' ] < 3 ? 1 : valueChosen[ 'room' ] - 3

          requirements.rent = (Math.floor(Math.random() * (maxRent - minRent)) + minRent)
          requirements.rent = Math.round(requirements.rent / 100) * 100
          requirements.roomSize = (Math.floor(Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize)
          requirements.roomSize = Math.round(requirements.roomSize * 10) / 10
        }),
        this.infoGender.getRamdom().then((valueChosen) => {
          requirements.careerChosen = valueChosen[ 'title' ]
        }),
        this.infoPettible.getRamdom().then((valueChosen) => {
          requirements.pettible = valueChosen[ 'title' ]
        }),
        this.infohortestRent.getRamdom().then((valueChosen) => {
          requirements.shortestRent = valueChosen[ 'interval' ]
        })
      ]).then(() => {
        console.log(requirements)
        resolve(config.requirements.map((r) => {
          return { title: r.title, content: `${requirements[ r.key ]}${r.endWord}`, key: r.key, value: requirements[ r.key ] }
        }))
      })



    })
  }
  clearRelease (house) {
    return new Promise((resolve) => {
      const targHouse = this.houses.filter((h) => h.group === house)[0]
      targHouse && (targHouse.isReleased = false)
      resolve()
    })
  }
  setUpEventHandler () {
    return new Promise((resolve) => {
      this.rushRent.emitter.on('GAME_SET', () => {
        window.clearInterval(this.releaseInterval)
      })
      this.rushRent.emitter.on('TIME_PAUSE', () => {
        console.log('RELEASE PUASE')
        window.clearInterval(this.releaseInterval)
      })
      this.rushRent.emitter.on('TIME_RUN', () => {
        console.log('RELEASE START')
        this.setUpReleaser()
      })
      resolve()
    })
  }
}