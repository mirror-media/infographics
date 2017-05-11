// import Chart from 'chart.js'
import './index.styl'

class Mining {
  constructor () {
    this._setUpLineChart = this._setUpLineChart.bind(this)
    this._renderLine = this._renderLine.bind(this)
    this._renderLineChartMessage = this._renderLineChartMessage.bind(this)
    this._setUpTaiwanMiningSpots = this._setUpTaiwanMiningSpots.bind(this)
    this._renderSpots = this._renderSpots.bind(this)
    this._renderVehicle = this._renderVehicle.bind(this)
    this._renderSpotsMsg = this._renderSpotsMsg.bind(this)
  }
  _setUpLineChart () {
    return this._renderLine(0).then(() => {
      return this._renderLine(1).then(() => {
        return this._renderLineChartMessage()
      })
    })
  }
  _renderLine (index) {
    return new Promise((resolve) => {
      const _lineChart = document.querySelectorAll('.chart-import-vs-export > .chart > div')[index]
      _lineChart.setAttribute('class', 'active')
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
  _renderLineChartMessage () {
    return new Promise((resolve) => {
      const _hole = document.querySelector('.chart-import-vs-export > .conclusion > .hole')
      _hole.setAttribute('class', `${_hole.getAttribute('class')} active`)
      const _boat = document.querySelector('.chart-import-vs-export > .conclusion > .boat > img')
      _boat.setAttribute('class', 'active')
      setTimeout(() => {
        const _point = document.querySelector('.chart-import-vs-export > .conclusion > .point > img')
        _point.setAttribute('class', 'active')
        resolve()
      }, 1500)
    })
  }
  _setUpTaiwanMiningSpots () {
    return this._renderSpots().then(() => {
      return this._renderVehicle().then(() => {
        return this._renderSpotsMsg()
      })
    })
  }
  _renderSpots () {
    return new Promise((resolve) => {
      const _miaoli = document.querySelector('.mining_spots > .taiwan_map > .miaoli')
      const _yilan = document.querySelector('.mining_spots > .taiwan_map > .yilan')
      const _taitung = document.querySelector('.mining_spots > .taiwan_map > .taitung')
      const _hualian = document.querySelector('.mining_spots > .taiwan_map > .hualian')
      _hualian.setAttribute('class', `${_hualian.getAttribute('class')} active`)  
      setTimeout(() => {
        _yilan.setAttribute('class', `${_yilan.getAttribute('class')} active`)  
        setTimeout(() => {
          _miaoli.setAttribute('class', `${_miaoli.getAttribute('class')} active`)
          setTimeout(() => {
            _taitung.setAttribute('class', `${_taitung.getAttribute('class')} active`)
            setTimeout(() => {
              _miaoli.querySelector('.token').setAttribute('class', `${_miaoli.querySelector('.token').getAttribute('class')} active`)
              _yilan.querySelector('.token').setAttribute('class', `${_yilan.querySelector('.token').getAttribute('class')} active`)
              _hualian.querySelector('.token').setAttribute('class', `${_hualian.querySelector('.token').getAttribute('class')} active`)
              _taitung.querySelector('.token').setAttribute('class', `${_miaoli.querySelector('.token').getAttribute('class')} active`)
              resolve()
            }, 500)
          }, 500)
        }, 500)      
      }, 500)
    })
  }
  _renderVehicle () {
    return new Promise(resolve => {
      const _excavator = document.querySelector('.mining_spots > .taiwan_map > .excavator')
      const _bigtruck = document.querySelector('.mining_spots > .taiwan_map > .bigtruck')
      _excavator.setAttribute('class', `${_excavator.getAttribute('class')} active`) 
      setTimeout(() => {
        _bigtruck.setAttribute('class', `${_bigtruck.getAttribute('class')} active`) 
        resolve() 
      }, 1000)
    })
  }
  _renderSpotsMsg () {
    return new Promise(resolve => {
      const _msgMiaoli = document.querySelector('.mining_spots > .taiwan_map > .msg-miaoli')
      const _msgYilan = document.querySelector('.mining_spots > .taiwan_map > .msg-yilan')
      const _msgHualian = document.querySelector('.mining_spots > .taiwan_map > .msg-hualian')
      const _msgTaitung = document.querySelector('.mining_spots > .taiwan_map > .msg-taitung')
      _msgMiaoli.setAttribute('class', `${_msgMiaoli.getAttribute('class')} active`)
      _msgYilan.setAttribute('class', `${_msgYilan.getAttribute('class')} active`)
      _msgHualian.setAttribute('class', `${_msgHualian.getAttribute('class')} active`)
      _msgTaitung.setAttribute('class', `${_msgTaitung.getAttribute('class')} active`)
    })
  }

  initialize () {
    this._setUpLineChart()
    this._setUpTaiwanMiningSpots()
    console.log('module Mining initialized...')
  }
}
window.addEventListener('load', () => {
  const mining = new Mining()
  mining.initialize()
})