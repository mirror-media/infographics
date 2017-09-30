export const config = {
  houseReleaseFrequency: 3000,
  maxSituationNum: 3,
  maxSkillNum: 3,
  maxRent: 100000,
  minRent: 5000,
  requirements: [
    { title: '租金', key: 'rent', endWord: ' 元' },
    { title: '最短租期', key: 'shortestRent', endWord: ' 年' },
    { title: '養寵物', key: 'pettible', endWord: '' },
    { title: '坪數', key: 'roomSize', endWord: ' 坪' },
    { title: '身分要求', key: 'careerChosen', endWord: '' },
  ],
  maxRoomSize: 50,
  minRoomSize: 2,
  levelScoreStone: [
    { score: 500, time: 30 },
    { score: 800, time: 30 },
    { score: 1150, time: 30 },
    { score: 1600, time: 45 },
  ],
  salary_affordable_ratio: 1 / 3,
  scorePerRent: 400,
  scoreDeductionPerSituation: 225,
  rentExpired: 16000
}
