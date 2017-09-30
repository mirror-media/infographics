export const containers = [
  {
    url: 'assets/containers/rent-map.png',
    sizeRate: 2172 / 3197,
    type: 'container',
    children: [
      // { type: 'spriteFrames', url: 'house' },
      // { type: 'spriteFrames', url: 'house' },
      {
        type: 'container',
        group: 'gameScene',
        children: [
          {
            type: 'container',
            group: 'house-24',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-24.png`, sizeRate: 153 / 177, scale: 3197 / (137 * 23.35), x: 1876, y: 465, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-24-active.png`, sizeRate: 153 / 177, scale: 3197 / (137 * 23.35), x: 1876, y: 465, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 1920, y: 530, visible: false, active: true, isActiveAlways: true },
            ]
          },          
          {
            type: 'container',
            group: 'house-25',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-25.png`, sizeRate: 126 / 141, scale: 3197 / (137 * 23.35), x: 1973, y: 550, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-25-active.png`, sizeRate: 126 / 141, scale: 3197 / (137 * 23.35), x: 1973, y: 550, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 40), x: 1973, y: 600, visible: false, active: false, isActiveAlways: true },              
            ]
          },          
          {
            type: 'container',
            group: 'house-27',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-27.png`, sizeRate: 127 / 141, scale: 3197 / (137 * 23.35), x: 2110, y: 630, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-27-active.png`, sizeRate: 127 / 141, scale: 3197 / (137 * 23.35), x: 2110, y: 630, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 40), x: 2160, y: 690, visible: false, active: false, isActiveAlways: true },              
            ]
          },          
          {
            type: 'container',
            group: 'house-28',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-28.png`, sizeRate: 266 / 262, scale: 3197 / (137 * 23.35), x: 2194, y: 625, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-28-active.png`, sizeRate: 266 / 262, scale: 3197 / (137 * 23.35), x: 2194, y: 625, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 23.35), x: 2330, y: 750, visible: false, active: false, isActiveAlways: true },
            ]
          },          
          {
            type: 'container',
            group: 'TP101',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/TP101.png`, sizeRate: 462 / 133, scale: 3197 / (133 * 23.75), x: 2020, y: 530, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/TP101-active.png`, sizeRate: 462 / 133, scale: 3197 / (133 * 23.75), x: 2020, y: 530, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 23.75), x: 2045, y: 680, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-03',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-03.png`, sizeRate: 178 / 191, scale: 3197 / (133 * 23.75), x: 875, y: 900, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-03-active.png`, sizeRate: 178 / 191, scale: 3197 / (133 * 23.75), x: 875, y: 900, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 30), x: 900, y: 950, visible: false, active: false, isActiveAlways: true },
            ]
          },          
          {
            type: 'container',
            group: 'house-02',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-02.png`, sizeRate: 139 / 154, scale: 3197 / (133 * 23.75), x: 760, y: 990, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-02-active.png`, sizeRate: 139 / 154, scale: 3197 / (133 * 23.75), x: 760, y: 990, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 35), x: 800, y: 1050, visible: false, active: false, isActiveAlways: true },
            ]
          },          
          {
            type: 'container',
            group: 'house-01',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-01.png`, sizeRate: 266 / 262, scale: 3197 / (133 * 23.75), x: 520, y: 1006, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-01-active.png`, sizeRate: 266 / 262, scale: 3197 / (133 * 23.75), x: 520, y: 1006, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 23.75), x: 570, y: 1150, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-21',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-21.png`, sizeRate: 154 / 170, scale: 3197 / (137 * 23.35), x: 1253, y: 680, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-21-active.png`, sizeRate: 154 / 170, scale: 3197 / (137 * 23.35), x: 1253, y: 680, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 32), x: 1300, y: 750, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-04',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-04.png`, sizeRate: 153 / 206, scale: 3197 / (133 * 23.75), x: 1133, y: 715, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-04-active.png`, sizeRate: 153 / 206, scale: 3197 / (133 * 23.75), x: 1133, y: 715, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 32), x: 1175, y: 815, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-05',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-05.png`, sizeRate: 185 / 162, scale: 3197 / (133 * 23.75), x: 1450, y: 550, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-05-active.png`, sizeRate: 185 / 162, scale: 3197 / (133 * 23.75), x: 1450, y: 550, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 42), x: 1495, y: 635, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-06',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-06.png`, sizeRate: 172 / 165, scale: 3197 / (133 * 23.75), x: 1148, y: 1030, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-06-active.png`, sizeRate: 172 / 165, scale: 3197 / (133 * 23.75), x: 1148, y: 1030, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 40), x: 1225, y: 1110, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-07',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-07.png`, sizeRate: 153 / 253, scale: 3197 / (133 * 23.75), x: 1560, y: 920, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-07-active.png`, sizeRate: 153 / 253, scale: 3197 / (133 * 23.75), x: 1560, y: 920, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 35), x: 1605, y: 1075, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-08',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-08.png`, sizeRate: 154 / 269, scale: 3197 / (133 * 23.75), x: 1680, y: 975, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-08-active.png`, sizeRate: 154 / 269, scale: 3197 / (133 * 23.75), x: 1680, y: 975, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 23.75), x: 1715, y: 1070, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-09',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-09.png`, sizeRate: 165 / 253, scale: 3197 / (133 * 23.75), x: 1810, y: 1055, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-09-active.png`, sizeRate: 165 / 253, scale: 3197 / (133 * 23.75), x: 1810, y: 1055, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 36), x: 1855, y: 1215, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-10',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-10.png`, sizeRate: 180 / 206, scale: 3197 / (133 * 23.75), x: 2135, y: 1033, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-10-active.png`, sizeRate: 180 / 206, scale: 3197 / (133 * 23.75), x: 2135, y: 1033, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 30), x: 2180, y: 1100, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-11',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-11.png`, sizeRate: 305 / 294, scale: 3197 / (133 * 23.75), x: 2390, y: 808, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-11-active.png`, sizeRate: 305 / 294, scale: 3197 / (133 * 23.75), x: 2390, y: 808, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 23.75), x: 2430, y: 960, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-13',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-13.png`, sizeRate: 137 / 167, scale: 3197 / (137 * 23.35), x: 2780, y: 973, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-13-active.png`, sizeRate: 137 / 167, scale: 3197 / (137 * 23.35), x: 2780, y: 973, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 40), x: 2820, y: 1050, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-12',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-12.png`, sizeRate: 153 / 243, scale: 3197 / (133 * 23.75), x: 2650, y: 978, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-12-active.png`, sizeRate: 153 / 243, scale: 3197 / (133 * 23.75), x: 2650, y: 978, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 38), x: 2700, y: 1120, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-14',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-14.png`, sizeRate: 167 / 183, scale: 3197 / (137 * 23.35), x: 2515, y: 1107, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-14-active.png`, sizeRate: 167 / 183, scale: 3197 / (137 * 23.35), x: 2515, y: 1107, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 35), x: 2560, y: 1190, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-16',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-16.png`, sizeRate: 144 / 284, scale: 3197 / (137 * 23.35), x: 405, y: 815, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-16-active.png`, sizeRate: 144 / 284, scale: 3197 / (137 * 23.35), x: 405, y: 815, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 23.35), x: 420, y: 900, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-15',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-15.png`, sizeRate: 134 / 195, scale: 3197 / (137 * 23.35), x: 291, y: 962, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-15-active.png`, sizeRate: 134 / 195, scale: 3197 / (137 * 23.35), x: 291, y: 962, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 325, y: 1025, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-17',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-17.png`, sizeRate: 179 / 206, scale: 3197 / (137 * 23.35), x: 595, y: 770, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-17-active.png`, sizeRate: 179 / 206, scale: 3197 / (137 * 23.35), x: 595, y: 770, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 660, y: 845, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-20',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-20.png`, sizeRate: 311 / 281, scale: 3197 / (137 * 23.35), x: 1051, y: 435, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-20-active.png`, sizeRate: 311 / 281, scale: 3197 / (137 * 23.35), x: 1051, y: 435, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 27), x: 1100, y: 590, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-19',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-19.png`, sizeRate: 140 / 202, scale: 3197 / (137 * 23.35), x: 948, y: 575, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-19-active.png`, sizeRate: 140 / 202, scale: 3197 / (137 * 23.35), x: 948, y: 575, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 27), x: 975, y: 630, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-18',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-18.png`, sizeRate: 168 / 213, scale: 3197 / (137 * 23.35), x: 809, y: 635, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-18-active.png`, sizeRate: 168 / 213, scale: 3197 / (137 * 23.35), x: 809, y: 635, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 27), x: 860, y: 700, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-22',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-22.png`, sizeRate: 227 / 287, scale: 3197 / (137 * 23.35), x: 1560, y: 650, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-22-active.png`, sizeRate: 227 / 287, scale: 3197 / (137 * 23.35), x: 1560, y: 650, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 23.35), x: 1630, y: 750, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-23',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-23.png`, sizeRate: 141 / 150, scale: 3197 / (137 * 23.35), x: 1755, y: 665, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-23-active.png`, sizeRate: 141 / 150, scale: 3197 / (137 * 23.35), x: 1755, y: 665, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 35), x: 1800, y: 720, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-29',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-29.png`, sizeRate: 148 / 215, scale: 3197 / (137 * 23.35), x: 2381, y: 1152, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-29-active.png`, sizeRate: 148 / 215, scale: 3197 / (137 * 23.35), x: 2381, y: 1152, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 23.35), x: 2420, y: 1220, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-31',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-31.png`, sizeRate: 141 / 151, scale: 3197 / (137 * 23.35), x: 935, y: 1132, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-31-active.png`, sizeRate: 141 / 151, scale: 3197 / (137 * 23.35), x: 935, y: 1132, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 35), x: 980, y: 1190, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-32',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-32.png`, sizeRate: 175 / 245, scale: 3197 / (137 * 23.35), x: 1043, y: 1110, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-32-active.png`, sizeRate: 175 / 245, scale: 3197 / (137 * 23.35), x: 1043, y: 1110, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 23.35), x: 1095, y: 1170, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-33',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-33.png`, sizeRate: 173 / 234, scale: 3197 / (137 * 23.35), x: 985, y: 1344, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-33-active.png`, sizeRate: 173 / 234, scale: 3197 / (137 * 23.35), x: 985, y: 1344, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 1035, y: 1460, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-34',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-34.png`, sizeRate: 169 / 202, scale: 3197 / (137 * 23.35), x: 1125, y: 1452, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-34-active.png`, sizeRate: 169 / 202, scale: 3197 / (137 * 23.35), x: 1125, y: 1452, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 1175, y: 1540, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-35',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-35.png`, sizeRate: 167 / 187, scale: 3197 / (137 * 23.35), x: 1262, y: 1544, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-35-active.png`, sizeRate: 167 / 187, scale: 3197 / (137 * 23.35), x: 1262, y: 1544, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 30), x: 1310, y: 1615, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-36',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-36.png`, sizeRate: 133 / 141, scale: 3197 / (137 * 23.35), x: 1288, y: 1105, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-36-active.png`, sizeRate: 133 / 141, scale: 3197 / (137 * 23.35), x: 1288, y: 1105, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 42), x: 1325, y: 1170, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-37',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-37.png`, sizeRate: 214 / 198, scale: 3197 / (137 * 23.35), x: 1630, y: 1463, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-37-active.png`, sizeRate: 214 / 198, scale: 3197 / (137 * 23.35), x: 1630, y: 1463, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 35), x: 1675, y: 1565, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-38',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-38.png`, sizeRate: 92 / 102, scale: 3197 / (137 * 23.35), x: 2065, y: 1447, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-38-active.png`, sizeRate: 92 / 102, scale: 3197 / (137 * 23.35), x: 2065, y: 1447, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 42), x: 2060, y: 1470, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-39',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-39.png`, sizeRate: 134 / 152, scale: 3197 / (137 * 23.35), x: 2170, y: 1342, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-39-active.png`, sizeRate: 134 / 152, scale: 3197 / (137 * 23.35), x: 2170, y: 1342, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 37), x: 2210, y: 1400, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-40',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-40.png`, sizeRate: 309 / 358, scale: 3197 / (137 * 23.35), x: 1355, y: 1168, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-40-active.png`, sizeRate: 309 / 358, scale: 3197 / (137 * 23.35), x: 1355, y: 1168, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (137 * 27), x: 1470, y: 1400, visible: false, active: false, isActiveAlways: true },
            ]
          },                    
          {
            type: 'container',
            group: 'house-41',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-41.png`, sizeRate: 130 / 198, scale: 3197 / (133 * 23.75), x: 1935, y: 1305, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-41-active.png`, sizeRate: 130 / 198, scale: 3197 / (133 * 23.75), x: 1935, y: 1305, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`,  sizeRate: 89 / 119, scale: 3197 / (133 * 27), x: 1960, y: 1360, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-42',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-42.png`, sizeRate: 134 / 196, scale: 3197 / (133 * 23.75), x: 1545, y: 1645, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-42-active.png`, sizeRate: 134 / 196, scale: 3197 / (133 * 23.75), x: 1545, y: 1645, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 27), x: 1565, y: 1705, visible: false, active: false, isActiveAlways: true },
            ]
          },
          {
            type: 'container',
            group: 'house-43',
            isSpriteContainer: true,
            children: [
              { type: 'sprite', url: `assets/sprites/house-43.png`, sizeRate: 180 / 182, scale: 3197 / (133 * 23.75), x: 1720, y: 1555, visible: true, active: false },
              { type: 'sprite', url: `assets/sprites/house-43-active.png`, sizeRate: 180 / 182, scale: 3197 / (133 * 23.75), x: 1720, y: 1555, visible: false, active: true },
              { type: 'sprite', url: `assets/sprites/rent-notice.png`, sizeRate: 81 / 119, scale: 3197 / (133 * 35), x: 1810, y: 1640, visible: false, active: false, isActiveAlways: true },
            ]
          },
        ]
      }
    ]

  }
]
export const sprites = [
  { url: 'assets/sprites/TP101.png' },
  { url: 'assets/sprites/TP101-active.png' },
  { url: 'assets/sprites/rent-notice.png' },
  { url: 'assets/sprites/house-01.png' },
  { url: 'assets/sprites/house-01-active.png' },
  { url: 'assets/sprites/house-02.png' },
  { url: 'assets/sprites/house-02-active.png' },
  { url: 'assets/sprites/house-03.png' },
  { url: 'assets/sprites/house-03-active.png' },
  { url: 'assets/sprites/house-04.png' },
  { url: 'assets/sprites/house-04-active.png' },
  { url: 'assets/sprites/house-05.png' },
  { url: 'assets/sprites/house-05-active.png' },
  { url: 'assets/sprites/house-06.png' },
  { url: 'assets/sprites/house-06-active.png' },
  { url: 'assets/sprites/house-07.png' },
  { url: 'assets/sprites/house-07-active.png' },
  { url: 'assets/sprites/house-08.png' },
  { url: 'assets/sprites/house-08-active.png' },
  { url: 'assets/sprites/house-09.png' },
  { url: 'assets/sprites/house-09-active.png' },
  { url: 'assets/sprites/house-10.png' },
  { url: 'assets/sprites/house-10-active.png' },
  { url: 'assets/sprites/house-11.png' },
  { url: 'assets/sprites/house-11-active.png' },
  { url: 'assets/sprites/house-12.png' },
  { url: 'assets/sprites/house-12-active.png' },
  { url: 'assets/sprites/house-13.png' },
  { url: 'assets/sprites/house-13-active.png' },
  { url: 'assets/sprites/house-14.png' },
  { url: 'assets/sprites/house-14-active.png' },
  { url: 'assets/sprites/house-15.png' },
  { url: 'assets/sprites/house-15-active.png' },
  { url: 'assets/sprites/house-16.png' },
  { url: 'assets/sprites/house-16-active.png' },
  { url: 'assets/sprites/house-17.png' },
  { url: 'assets/sprites/house-17-active.png' },
  { url: 'assets/sprites/house-18.png' },
  { url: 'assets/sprites/house-18-active.png' },
  { url: 'assets/sprites/house-19.png' },
  { url: 'assets/sprites/house-19-active.png' },
  { url: 'assets/sprites/house-20.png' },
  { url: 'assets/sprites/house-20-active.png' },
  { url: 'assets/sprites/house-21.png' },
  { url: 'assets/sprites/house-21-active.png' },
  { url: 'assets/sprites/house-22.png' },
  { url: 'assets/sprites/house-22-active.png' },
  { url: 'assets/sprites/house-23.png' },
  { url: 'assets/sprites/house-23-active.png' },
  { url: 'assets/sprites/house-24.png' },
  { url: 'assets/sprites/house-24-active.png' },
  { url: 'assets/sprites/house-25.png' },
  { url: 'assets/sprites/house-25-active.png' },
  { url: 'assets/sprites/house-27.png' },
  { url: 'assets/sprites/house-27-active.png' },
  { url: 'assets/sprites/house-28.png' },
  { url: 'assets/sprites/house-28-active.png' },
  { url: 'assets/sprites/house-29.png' },
  { url: 'assets/sprites/house-29-active.png' },
  { url: 'assets/sprites/house-31.png' },
  { url: 'assets/sprites/house-31-active.png' },
  { url: 'assets/sprites/house-32.png' },
  { url: 'assets/sprites/house-32-active.png' },
  { url: 'assets/sprites/house-33.png' },
  { url: 'assets/sprites/house-33-active.png' },
  { url: 'assets/sprites/house-34.png' },
  { url: 'assets/sprites/house-34-active.png' },
  { url: 'assets/sprites/house-35.png' },
  { url: 'assets/sprites/house-35-active.png' },
  { url: 'assets/sprites/house-36.png' },
  { url: 'assets/sprites/house-36-active.png' },
  { url: 'assets/sprites/house-37.png' },
  { url: 'assets/sprites/house-37-active.png' },
  { url: 'assets/sprites/house-38.png' },
  { url: 'assets/sprites/house-38-active.png' },
  { url: 'assets/sprites/house-39.png' },
  { url: 'assets/sprites/house-39-active.png' },
  { url: 'assets/sprites/house-40.png' },
  { url: 'assets/sprites/house-40-active.png' },
  { url: 'assets/sprites/house-41.png' },
  { url: 'assets/sprites/house-41-active.png' },
  { url: 'assets/sprites/house-42.png' },
  { url: 'assets/sprites/house-42-active.png' },
  { url: 'assets/sprites/house-43.png' },
  { url: 'assets/sprites/house-43-active.png' },
  { url: 'assets/sprites/rent-eyes-09.png' },
  { url: 'assets/sprites/rent-eyes-10.png' },
  { url: 'assets/sprites/skills/rent-card-01.png' },
  { url: 'assets/sprites/skills/rent-card-02.png' },
  { url: 'assets/sprites/skills/rent-card-03.png' },
  { url: 'assets/sprites/skills/rent-card-04.png' },
  { url: 'assets/sprites/skills/rent-card-05.png' },
  { url: 'assets/sprites/skills/rent-card-06.png' },
  { url: 'assets/sprites/skills/rent-card-07.png' },
  { url: 'assets/sprites/skills/rent-card-08.png' },
  { url: 'assets/sprites/skills/rent-card-09.png' },
  { url: 'assets/sprites/skills/rent-card-10.png' },
  { url: 'assets/sprites/situations/rent-card-11.png' },
  { url: 'assets/sprites/situations/rent-card-12.png' },
  { url: 'assets/sprites/situations/rent-card-13.png' },
  { url: 'assets/sprites/situations/rent-card-14.png' },
  { url: 'assets/sprites/situations/rent-card-15.png' },
  { url: 'assets/sprites/situations/rent-card-16.png' },
  { url: 'assets/sprites/situations/rent-card-17.png' },
  { url: 'assets/sprites/situations/rent-card-18.png' },
  { url: 'assets/sprites/situations/rent-card-19.png' },
  { url: 'assets/sprites/situations/rent-card-20.png' },
]

export const sprite_eye = {
  url: 'assets/sprites/rent-eyes-09.png',
  sizeRate: 399 / 315,
  scale: 3197 / (133 * 100),
}
export const sprite_eye_closed = {
  url: 'assets/sprites/rent-eyes-10.png',
  sizeRate: 399 / 315,
  scale: 3197 / (133 * 100),
}

export const sprite_skills = [
  { url: 'assets/sprites/skills/rent-card-01.png' },
  { url: 'assets/sprites/skills/rent-card-02.png' },
  { url: 'assets/sprites/skills/rent-card-03.png' },
  { url: 'assets/sprites/skills/rent-card-04.png' },
  { url: 'assets/sprites/skills/rent-card-05.png' },
  { url: 'assets/sprites/skills/rent-card-06.png' },
  { url: 'assets/sprites/skills/rent-card-07.png' },
  { url: 'assets/sprites/skills/rent-card-08.png' },
  { url: 'assets/sprites/skills/rent-card-09.png' },
  { url: 'assets/sprites/skills/rent-card-10.png' },
]


export const spritesheets = 
  {
    frames: {
      'house1.png': {
        frame: {
          x: 0,
          y: 0,
          w: 176,
          h: 211
        },
        rotated: false,
        trimmed: true,
        spriteSourceSize: {
          x: 0,
          y: 0,
          w: 176,
          h: 211
        },
        sourceSize: {
          w: 176,
          h: 211
        }
      },
      'house2.png': {
        frame: {
          x: 177,
          y: 0,
          w: 176,
          h: 211
        },
        rotated: false,
        trimmed: true,
        spriteSourceSize: {
          x: 177,
          y: 0,
          w: 176,
          h: 211
        },
        sourceSize: {
          w: 176,
          h: 211
        }
      },
      'house3.png': {
        frame: {
          x: 353,
          y: 0,
          w: 176,
          h: 211
        },
        rotated: false,
        trimmed: true,
        spriteSourceSize: {
          x: 353,
          y: 0,
          w: 176,
          h: 211
        },
        sourceSize: {
          w: 176,
          h: 211
        }
      }
    },
    meta: {
      image: 'assets/sprites/test-sprite-sheet.png',
      size: {
        w: 529,
        h: 211
      },
      scale: '1'
    }
  }
