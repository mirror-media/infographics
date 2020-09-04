const gallery = [
  {
    category: '達人藝術家',
    people: [
      {
        name: '謝銘祐',
        work: '金曲歌王',
        src: '1-1',
        slug: 'tainan-art01',
      },
      {
        name: '葉東泰',
        work: '十八卯茶屋創辦人',
        src: '1-2',
        slug: 'tainan-art02',
      },
      {
        name: '許承穎、許京穎',
        work: '台風造酒兄弟檔',
        src: '1-3',
        slug: 'tainan-art03',
      },
    ]
  },
  {
    category: '傳統技藝職人',
    people: [
      {
        name: '顏振發',
        work: '50 年電影看板畫師',
        src: '2-1',
        slug: 'tainan-trad01',
      },
      {
        name: '王開弘、王炳文',
        work: '榮木桶行第三代傳人',
        src: '2-2',
        slug: 'tainan-trad02',
      },
      {
        name: '吳文進',
        work: '40 年糊紙師傅',
        src: '2-3',
        slug: 'tainan-trad03',
      },
      {
        name: '林宗範',
        work: '20 年製琴師',
        src: '2-4',
        slug: 'tainan-trad04',
      },
    ]
  },
  {
    category: '創業',
    people: [
      {
        name: '沼澤marsh',
        work: '老洋樓甜點店',
        src: '3-1',
        slug: 'tainan-stup01',
      },
      {
        name: '阿嬤的珠寶盒',
        work: '仁德暢銷點心',
        src: '3-2',
        slug: 'tainan-stup02',
      },
      {
        name: '蕨的想買就買',
        work: '鹿角蕨專賣店',
        src: '3-3',
        slug: 'tainan-stup03',
      },
      {
        name: 'Perfe\'dough',
        work: '人氣甜甜圈店',
        src: '3-4',
        slug: 'tainan-stup04',
      },
      {
        name: '穀倉餐廳',
        work: '招牌麻油雞鍋',
        src: '3-5',
        slug: 'tainan-stup05',
      },
    ]
  },
  {
    category: '新農人',
    people: [
      {
        name: '李惟裕',
        work: '官田時生永續農場場長',
        src: '4-1',
        slug: 'tainan-farmer01',
      },
      {
        name: '王中和',
        work: '臺南咖啡冠軍',
        src: '4-2',
        slug: 'tainan-farmer02',
      },
      {
        name: '許凰誥',
        work: '哈密瓜種植達人',
        src: '4-3',
        slug: 'tainan-farmer03',
      },
      {
        name: '台南菜市長',
        work: '小農蔬果產銷大平台',
        src: '4-4',
        slug: 'tainan-farmer04',
      },
      {
        name: '周志亮',
        work: '台灣鯛養殖達人',
        src: '4-5',
        slug: 'tainan-farmer05',
      },
    ]
  },
]

const SITE_URL = 'https://www.mirrormedia.mg/'

const svgLogo = '<svg height="44" viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image fill="none" height="44" width="44" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGN5fIAKQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAASKG51AAANUElEQVR4Ae1dB2wUSRYtmxxMzklggkVOAkQ6CUTOAkQQOUkcAutAHIgoQAIRlkMCAUsSGSRgyYi4II6MgAWWZILJOWNyvPdqXXPVPT09PTM9xnj5Unuqq/6v8PpX+L+q2xHiO1KBAgVyofjKuGK0K9+3b9+iIiIiohDHi5SAuATEJSD8EFccrkuJv3/cu3fvCcLfhSKSstRChQpl+Pr1awMAUR+A8CqP8kOtwzfk9yeuvchvb2Rk5J47d+68S6p2hVp5v/VEoyIKFy78DwDXHeH2EMjiVyg0hlcAcx2AXHb79u3/IvwttOzspcMGYIkSJdK9e/euF4D7N6oQbV+NsKXGA8hpGTJkWHz16tUP4SjFdQDZTaFp/XENxVUgHJUONE9o4T1c03HNdbt7uwogJoWWAG0mGlg00EYmEf8NgBiLSWeLW+W5AiCAK4IKzQJ4rdyqWDjzAYibkf8gAHkr1HJCBhBdti3GuUUAL1uolUlKeYD4AuNjH3Tp9aGUmypY4bJly6ZNkybNDIA3HXmkDzaf7yiXHg+9Y5YsWXIWKVLk98ePH38Jpi5BaSC0LgeA24IK1Aqm0OQmA208DG1sCW18FmjdAgawYMGChQDeThRUJtDCkjn/BYDY+O7du3cCqWdAAGKyoMm1G5pXOJBCfhReaOJt1LUhJheaio7IMYDUPAB3OKWCp9AiiLhqOdXESCVo95s45u1M6eARA7aRQxTbbIeJSvMLIGdbThgQSGljnsLA6rcM28y2WyXqcX6XMVyq4KnQCfB3o8Lv37/PlpCQsN2u4bZjIBfJX758+c0ug5SelipVqnZ2i22fACaaZ2egfT+UheH2A8WE8iJdunSVrl+/ftMqb7sxkLbt3xo8AkYMPnz4QAeJJVlqYKJXhQb3D0NVqlQRxYoVM9T31KlTAppjiAv2BprYysqLk9qcIca9DBj3fCJu5k8u9506dRJdu3Y1VGfYsGGuAQhNnAlsvLYLvAAEY3/UoqihJi7e1KxZUwwdOlTcv39fjBs3Tjx5Yr8fhEFc5MyZ028N4HX24omKihJ58uTximcElEQ8e/aMXdQy3SKyKHj/ifj/6GmGLkw3/Nu3b+PBGBZPcv369cWiRYsEBmVZhytXroj27dsLeEL0OhnCZcqUEXv27DHEuXXz/Plz0b9/f3HgwAFHWaIb38uYMWO0vj1gmES4h5FU4LHGJUuWFOvWrRO5c+d21AC3mbJnzy6mTp3qOFtiQ4x0AQ+ASIzA6psbQK6TWfP0Ar43iBjX9Or4DRMjYqUYPQBy6xGR0SrBrV878FQZdiC+evVKsSWX3+hErGR9PKZc5syZxyKGpwRcIyfgqcI4UTRo0EBs27ZNYBxW0YIAwpzydHM8fZE2rdFEJT/Hszdv3nhd5OVEpBN5mSf5X79+LebPn68nOwl/hbxc5klVTFy6PIBkFifSTngCAU/Pz9/E0rdvXzFhwgRdRCxcuFCMHcvn700bNmwQNWrUMCS0adNGHD9+3BAX4M0rPJR83CKVXRj9ugEycA28unXrGmZbvXJnz54Vffr0EaNGjZLapacxrLpz1qxZzUnJ6T5LImZCAojpub5btcM0L+bMmeNZquj5Hjt2TLRt21Zs375dLF68WHTo0EG8fPlSZ5Fhgjh+/Hiv+OQUoTCTAGJccQ1AjmNWC1+C16VLF8P4Rm3s2LGjJYitW7f2GuuSE4AKs9Swe3PhhqekXCHapGbSwcuUKZOgliqiRTJo0CAxb948oVsTXGzDoSkIco4cORS7oLyZKOdrLWmecCjL9V+uXLnkg/v06ZM5O0f3xIzY0ZTjzOtZ1ziStmHCPqshVYFXq1YtMXr0aFGqVClDut0NTbGYmBi/lgg1m5dT4vBBgsNUjBkzRqxcudKpqM5HzKqwC3OnLSykwGvVqpVYunRpQOCFpUKmTNOnTy8GDx5sig3oNiZsAOrgTZ8+XWDQDahmScWcN2/eUIoKD4BugkdvDcabUBoZTtkYjoH53CzhyJEjcqxjt3WieXQp0bVkRfAEi0ePHonhw4eLHj16+HRNWck6jfNVthN5PNh8Efnz56fLtqgTAac8HPy7desmcFTCINKrVy+B8gxxTZo0kTOtIfLHubmZGmNTlNtdhHYmF9NmatGihReAZh7zPZcwXBOGi9j2JUuWBJU9sMvMLhwVlHQSCVFjJ06cGLbS2IWDBZDYGftY2KqZcjOmBvLlFf+bDg4xoBMApxksuVOnZnFGUlaBHvvx40dLR4PO4ysMI99r7PXF60J8QmqMAa4CSNdS7dq1Hddt9erVlryrVq2Sm0+WiaZIAj537lyxe/duceHCBWkqVqhQQU5kTZs2NXG7d0vsOInwNSr3cnUpJ25T+vLIcOmzceNGWRI1bsWKFeLGjRuicePGgrP606dPxaFDh6TbrHnz5oI7gSQu5rkScIuIHfsUHamuORPcqhyXQDT4rejBgwdyranS6P7atWuXdBKcOHFCVK9eXYwcOVK6zLh1Si83iZ5pNwFElg8JIE9jNsTlCln591zJWMuEmqSI3pYFCxaIixcviiFDhgjsmsmkypUrS828efOmBFLxu/wbx1nY8XFWJ4Vzm/DgwYPSgqAZpl+fP3/2yoL7EzqPHvZlJegANmrUSLq7CF67du3E5cuXxc6dOwWOYYhJkyaJgQMHepXpYkSc0kDX8mQD6Gm2oh07dggO7jp17tzZ1hKhT9COypUrJ06ePCk1j+4ybI6J8uXLy2Mea9euFdOmTZMOXo6LYSCpgX8g47DNIhzLuFRxk3QNJDDKA64fJIqPj5fxdJjSMgoDEbNTkVD1J6jQn2EoQA7aNOlKly4djuxlnpxtK1WqJKpWrSq6d+8uNW7AgAGCu3H9+vUTR48eFVzmuE3EjNhJSwQ3e90ugJo3e/ZsQa+MrjFW5dDeVZ5hblmaHQ5mGT0/rvu49ly+fLlcwhC4W7duyXUhx8cRI0aYxV25V5hxDKS/jQD+y5WckQnBo+YRPH9Ey2XZsmUeV1W9evXkGMrGEwgrokWjTl1xHUjQ2X1jY2PFlClTpMZR81QeitfKErLK30lcImZCAogG78GMxzMUxg0NJzlZ8HDgdgIeRblgVg1UWXFfhWf7fM2g0dHR4vTp04pdbN26VWoatZDjLU8bcOzjUoYnuwLZh/Fkah94RczIIgHkDjt2mNYB1d72cv5Tq1WrJjizOiWCYUX+Zl9dhm4yai5BPXfunGcm5gzN3uA2ofuuI2bMVwLIAApaBi0MGcCGDQNbk3O9VrFiRVbBQDTNSE63HbndSRs8EDtcFhDEH2KlxDyPhx9oQGS8Sgj210pzuFj2RVyr6YeJyMcF94wZM6TItWvXxMOHD32Jf4/4+ESsZNkeAKGW34DstFBrZN7I5nh06RI/8WJN1EAa/FxkU+v27dsnx09uqJNojdB+pa1LXtrBVotigs79E3X5OvWq0tVvoA+HGBEr1RpPF2YEv24BbRiDsdC1I77ctOZMaUdxcXGid+/ePlk4tvXs2dOTTkuD5ppOXM7QE6OIJxv0hTXjuZHONWOwBODuESNd3qOBjOTZXzD9ojOEEub25uTJk0PJIlnJApvp+vloVs4AICPA9Ct+bjAcDEF7pZjaG+bWZAqhG8BmrrktXgDKQ4ORkYPMjIHcK/DMk0MgeSQ3XoAXq5Yuet28AGQiXjbeCoHNOqPTcAoFbzMmsC1WGFgCmMg4CCC+sBKyi+NphBSmecTAZ480zMI6MED8Fs5O98Ey4jc93l+Y7vVs2bJZsunnAhUD143qxRsVp37pZebMSZNMp+LFi+u3jsNYgghaSlbEs9kvXnjrC2T4bZlbVjKM+79v3AcHTLyZmBh8PgGzGN/88XXg28xrd08XFJcreHvKs6dhx89D4zw8rshqGaPSzL98KZFHj81uL/TAWVCkWDO/fm/XhSUfjPOhyOiwLmQXpmfFaqFrJ2OVxm0BOkLr1KljlewVF+ypeyxLpB/RArzDbLtXQaYIvwCeP3/+I9S4JeQumGQtbzn+mV9DsGS0iaT1wv0MapGTk6dcqG/atMkmR+skOh7oDeI2qYn4DZmWbLsp3uvWL4CUwBjwDBk2hibe9srBIoL2Lc88B0N8sYaeZVoWfBD4LJNtNlx3cv8YjbXlMydyX5mHlmge6sQ2sq1ssx7vK+x3DNQFMR7G4N7xh3d4Ar9Zs2bCyTsftHnPnDkjZs2aJd864uRid6iI3Zv7HmvWrLEEj8dL+CB1Ith00q5fv17s379fT5LhRAUJz4d3VGk/P/2kkPjr11EX1kX4RR/s8NcNZGLR5ZNjmG1hm5x+rUhvQ8AAUpjjA2aoeih4lp7ZjxhmG9gWp2OeuY0BjYFmYd5jsf3zA4xWwDiNw6x5EWeiV+NJ0jzgJJPsCXWlnd8KXfZoqJUNWQP1CmCW/vkRWh2QYMJ89xjLheT4GeRfoHm/Yqz76/hWMI2zkHFVA/X8f36IW0cjhDC08een4EPAzyDK7g279ec/IzCgEsINJh2e4a2Ci7M3L74L6/TfYcSBl9cp2LP2nz8CU7jof068/Wb1Qa7XAAAAAElFTkSuQmCC"/></svg>'

module.exports = {
  locals: {
    SITE_URL,
    gallery,
    svgLogo,
  }
}
