export const config = {
  houseReleaseFrequency: 3000,
  maxSituationNum: 3,
  maxSkillNum: 3,
  requirements: [
    { title: '租金', key: 'rent', endWord: ' 元' },
    { title: '最短租期', key: 'shortestRent', endWord: '' },
    { title: '養寵物', key: 'pettible', endWord: '' },
    { title: '坪數', key: 'roomSize', endWord: ' 坪' },
    { title: '性別要求', key: 'careerChosen', endWord: '' },
  ],
  levelScoreStone: [
    { score: 500, time: 30, houseReleaseFrequency: 1500, rentSlipTimeout: 10000, scoreDeductionPerSituation: 225, scorePerRent: 400 },
    { score: 1000, time: 30, houseReleaseFrequency: 1500, rentSlipTimeout: 10000, scoreDeductionPerSituation: 250, scorePerRent: 400 },
    { score: 1800, time: 30, houseReleaseFrequency: 2000, rentSlipTimeout: 8000, scoreDeductionPerSituation: 300, scorePerRent: 400 },
    { score: 2500, time: 90, houseReleaseFrequency: 3000, rentSlipTimeout: 5000, scoreDeductionPerSituation: 350, scorePerRent: 400 },
  ],
  salary_affordable_ratio: 1 / 3,
  rentExpired: 16000,
  rentRoomDistribution: [
    { from: 4000, to: 4999, weight: 1.64, room: 4.83 },
    { from: 5000, to: 5999, weight: 3.48, room: 5.47 },
    { from: 6000, to: 6999, weight: 5.93, room: 6.17 },
    { from: 7000, to: 7999, weight: 7.32, room: 6.96 },
    { from: 8000, to: 8999, weight: 8.35, room: 7.98 },
    { from: 9000, to: 9999, weight: 6.63, room: 8.97 },
    { from: 10000, to: 10999, weight: 5.37, room: 11.06 },
    { from: 11000, to: 11999, weight: 3.89, room: 11.25 },
    { from: 12000, to: 12999, weight: 5.75, room: 14.45 },
    { from: 13000, to: 13999, weight: 4.93, room: 16.47 },
    { from: 14000, to: 14999, weight: 2.67, room: 17.28 },
    { from: 15000, to: 15999, weight: 5.30, room: 20.18 },
    { from: 16000, to: 16999, weight: 4.02, room: 21.50 },
    { from: 17000, to: 17999, weight: 2.56, room: 22.09 },
    { from: 18000, to: 18999, weight: 4.45, room: 23.40 },
    { from: 19000, to: 19999, weight: 1.98, room: 25.38 },
    { from: 20000, to: 20999, weight: 3.65, room: 26.04 },    
    { from: 21000, to: 21999, weight: 1.12, room: 24.86 },    
    { from: 22000, to: 22999, weight: 2.57, room: 26.79 },    
    { from: 23000, to: 23999, weight: 2.26, room: 26.87 },    
    { from: 24000, to: 24999, weight: 0.95, room: 27.30 },    
    { from: 25000, to: 25999, weight: 2.91, room: 28.70 },    
    { from: 26000, to: 26999, weight: 1.40, room: 29.36 },    
    { from: 27000, to: 27999, weight: 0.84, room: 29.63 },    
    { from: 28000, to: 28999, weight: 1.62, room: 31.04 },    
    { from: 29000, to: 29999, weight: 0.58, room: 30.27 }
  ],
  genderRequiredDistribution: [
    { title: '男', weight: 1.4 },
    { title: '女', weight: 7.36 },
    { title: '無', weight: 91.24 }
  ],
  pettibleRequiredDistribution: [
    { title: '可', weight: 26.26 },
    { title: '不可', weight: 73.84}
  ],
  shortestRentIntervalDistribution: [
    { interval: '3 個月', weight: 1.39 },
    { interval: '6 個月', weight: 3.08 },
    { interval: '1 年', weight: 92.73 },
    { interval: '2 年', weight: 2.8 },
  ]
}
