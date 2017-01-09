var currentScroll = 0;

$( window ).scroll(function() {
  var wh = $( window ).height()

  if ( $( window ).scrollTop() > wh ) {
    $( "#fixed" ).css('position', 'fixed');
    var currentSection = Math.floor($( window ).scrollTop() / wh)
    $( ".dish-list-fixed a" ).css("color", "#000");
    $( "#list-" + currentSection + " a" ).css("color", "#de4359");
  } else {
    $( "#fixed" ).css('position', 'absolute');
  }
  
});

$( "div" ).scroll(function() {
  currentScroll = $( "div" ).scrollTop();
  if (currentScroll != 0) {
    $( ".curtain-block" ).show();
  } else {
    $( ".curtain-block" ).hide();
  }
});

$( ".dish-list a" ).click(function(e) {
  e.preventDefault();
  var dish = $(this).attr('id');
  $( "#dish-img" ).css( "background-image", "url(" + data[dish].img + ")" )
  $( "#dish-name" ).text(data[dish].name);
  $( "#dish-step" ).html(data[dish].step);
  $( ".dish-content" ).css('transform', 'translateX(-100vw)');
});

$( "#backToList" ).click(function(e) {
  e.preventDefault();
  $( ".dish-content" ).css('transform', 'translate(100vw,' + currentScroll + 'px )');
});

$( window ).resize(function() {
  if ($( window ).width() < 992) {
    $.scrollify.disable();
  } else {
    $.scrollify.enable();
  }
});

// Scrollify

$.scrollify({
  section : "section",
  sectionName : "section-name", 
  easing: "easeOutExpo",
  scrollSpeed: 1100,
  offset : 0,
  setHeights: true,
  updateHash: true,
});

if((/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) )) { 
  $.scrollify.disable();
} else {
  $.scrollify.enable();
}

// scrollDepth
jQuery.scrollDepth({
  minHeight: 0,
  percentage: true,
  userTiming: false,
  pixelDepth: false,
  nonInteraction: true
});

var data = { 
  'chicken-01': { 
    'img': 'img/chicken-01-v2.jpg', 
    'name': '雞米粒',
    'step':[  '<ol>雞肉撕下後剪成小塊。</ol>', 
              '<ol>腰果或松子等堅果用菜刀或玻璃容器壓碎。</ol>',
              '<ol>萵苣或其他生菜鋪底，裝入雞肉塊，再灑上腰果粒，即可捲裹食用。</ol>'
           ]
  },
  'chicken-02': { 
    'img': 'img/chicken-02.jpg', 
    'name': '煙燻雞翅腿',
    'step':[  '<ol>拆解雞腿與雞翅。</ol>', 
              '<ol>青蒜和辣椒切絲，二者依喜愛搭配食用。</ol>'
           ]
  },
  'chicken-03': { 
    'img': 'img/chicken-03.jpg', 
    'name': '芥菜雞湯',
    'step':[  '<ol>芥菜汆燙去苦味。</ol>', 
              '<ol>置入已拆解雞肉的雞骨及雞爪，連同芥菜一起熬煮。</ol>',
              '<ol>放入香菇、蒜苗、木耳等其他蔬菜，熬煮成湯即可。</ol>'
           ]
  },
  'chicken-04': { 
    'img': 'img/chicken-04.jpg', 
    'name': '涼拌雞絲',
    'step':[  '<ol>金針菇(也可用生小黃瓜絲抓鹽，沖洗後去澀)、紅蘿蔔絲燙熟。</ol>', 
              '<ol>雞胸肉撕成絲。</ol>',
              '<ol>將雞胸肉與金針菇、紅蘿蔔用筷子或衛生手套拌勻即可。</ol>'
           ]
  },
  'chicken-05': { 
    'img': 'img/chicken-05.jpg', 
    'name': '雞肉法國麵包',
    'step':[  '<ol>雞胸肉撕成絲；番茄切片；洋蔥切絲；生菜洗淨備用。</ol>', 
              '<ol>法國麵包對切。</ol>',
              '<ol>將雞胸肉、番茄、洋蔥夾入麵包中即可。</ol>'
           ]
  },
  'bacon-01': { 
    'img': 'img/bacon-01.jpg', 
    'name': '臘味飯',
    'step':[  '<ol>臘肉先蒸熟三十分鐘。</ol>', 
              '<ol>臘肉與臘腸、肝腸、生米一起入電鍋蒸煮，再取出切片。</ol>',
              '<ol>以水、醬油、老抽、糖與麻油煮開成醬汁，拌入飯中。</ol>'
           ]
  },
  'bacon-02': { 
    'img': 'img/bacon-02.jpg', 
    'name': '火腿臭豆腐',
    'step':[  '<ol>火腿汆燙三分鐘後切末。</ol>', 
              '<ol>扁尖筍泡發兩小時後切末。</ol>',
              '<ol>火腿末、扁尖筍末與毛豆放置臭豆腐上頭，加入豆瓣醬或辣椒醬、高湯與米酒，蒸十分鐘即可。</ol>'
           ]
  },
  'bacon-03': { 
    'img': 'img/bacon-03.jpg', 
    'name': '火腿雞湯',
    'step':[  '<ol>火腿汆燙三分鐘。</ol>', 
              '<ol>扁尖筍與干貝、冬菇泡發兩小時後，扁尖筍切條。</ol>',
              '<ol>火腿與扁尖筍、干貝、雞入電鍋，加水蓋過雞蒸煮即可。</ol>'
           ]
  },
  'bacon-04': { 
    'img': 'img/bacon-04.jpg', 
    'name': '蒜苗炒臘肉',
    'step':[  '<ol>臘肉蒸熟三十分鐘後，去皮切片。</ol>', 
              '<ol>蒜苗與辣椒切斜片。</ol>',
              '<ol>臘肉與蒜苗、辣椒大火快炒，可加些許醬油、糖和米酒，炒至蒜苗軟化即可。</ol>'
           ]
  },
  'seafood-01': { 
    'img': 'img/seafood-01.jpg', 
    'name': '酥煎鯧魚',
    'step':[  '<ol>鯧魚洗淨，魚身切成格子狀。</ol>', 
              '<ol>魚身抹上鹽巴，煎至二面金黃即可。</ol>'
           ]
  },
  'seafood-02': { 
    'img': 'img/seafood-02.jpg', 
    'name': '清蒸虎條',
    'step':[  '<ol>剖開虎條魚背部，以熱水稍汆燙，起鍋沖水去腥，並刮除清洗魚鱗。</ol>', 
              '<ol>魚入鍋蒸約10分鐘，另起熱鍋拌炒魚露、鹽巴、黑胡椒等調味醬；倒掉蒸魚盤上的水，淋上煮滾後的調味醬汁。</ol>',
              '<ol>薑、青蒜切絲，鋪在魚上；熱鍋燒油，將熱油淋於薑絲和青蒜絲上。</ol>'
           ]
  },
  'seafood-03': { 
    'img': 'img/seafood-03.jpg', 
    'name': '紹興醉蝦',
    'step':[  '<ol>白蝦汆燙後泡冰水。</ol>', 
              '<ol>醉蝦用的中藥包加水、鹽、冰糖敖約半小時。</ol>',
              '<ol>中藥醬汁煮好後，加入紹興酒；蝦子置入浸泡並放於冰箱中冷藏一天即入味。</ol>'
           ]
  },
  'seafood-04': { 
    'img': 'img/seafood-04.jpg', 
    'name': '雙椒花枝',
    'step':[  '<ol>花枝去皮去內臟，清洗後，用刀子在內部切出斜紋。</ol>', 
              '<ol>花枝、紅椒黃椒汆燙備用。</ol>',
              '<ol>起油鍋，將花枝、雙椒入鍋快炒，稍微勾芡並調味即可。</ol>'
           ]
  },
  'seafood-05': { 
    'img': 'img/seafood-05.jpg', 
    'name': '酒煎烏魚子',
    'step':[  '<ol>鍋子燒熱後，淋上些許米酒，將烏魚子置入乾煎，待米酒沸騰後蒸發即可。</ol>', 
              '<ol>起鍋後，可配青蒜、白蘿蔔，也可搭水梨、蘋果一起吃。</ol>'
           ]
  }
}