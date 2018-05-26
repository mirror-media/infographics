/* -------------------- Listing news --------------------*/
export function appendListing(res){

    const data = res._items;

    const wrapper = document.querySelector('#listingwpr');

    data.forEach((element) => {

        let brief = element.brief.apiData[0].content[0];
        if(brief.length > 45){
            brief = brief.substr(0,45) + ' ...';
        }

        const html = 
        `<a class="listing--container" 
            href="https://www.mirrormedia.mg/story/${element.slug}"
            target="_blank"
            >
            <div class="listing--hero"
                style="background-image:url('${element.heroImage.image.resizedTargets.mobile.url}')"
            ></div>
            <div class="listing--innerwpr">   
                <div class="listing--title">${element.title}</div>
                <div class="listing--brief">${brief}</div>
            </div>
        </a>`.trim();

        let entry = document.createElement('div');
        entry.classList.add('listing--entry');
        entry.innerHTML = html;

        wrapper.appendChild(entry);

    });   

}

/* -------------------- 戰績表 title (Matches) --------------------*/
export function setMatchTableTitle(sheetsData){

    const matchesContent = document.querySelectorAll('.matches-content');

    matchesContent.forEach((element) => {

        let table = element.querySelector('table');

        let tr = document.createElement('tr');

        sheetsData.forEach((element,index) => {
            let th = document.createElement('th');
            th.classList.add('t' + index);
            th.innerHTML = `<th>${element}</th>`;
            tr.appendChild(th);
        });

        table.appendChild(tr);        

    });
}

/* -------------------- 戰績表 content (Matches) --------------------*/
export function setMatchTableContent(sheetsData,teamData){

    // 建立戰績表 title
    setMatchTableTitle(sheetsData[0]);        
        
    // 取得 '國家' 的 index 值
    const countryIndex = _.indexOf(sheetsData[0], '國家');

    // 各組別所對應的 tab-content
    const matchesGroup = document.querySelectorAll('.matches-content');


    sheetsData.forEach((element,index) => {           
        
        // 扣掉第一列 標題列
        if(index > 0){
            // 國家名稱
            const countryName = element[countryIndex];

            //找出在 teamData 中對應的資料
            const team =  _.find(teamData, ['country', countryName]);

            if(!team){
                console.log(countryName + ': error');
            } else {
                
                // FIFA code
                const FIFAcode = team.FIFA;
                // 分組
                const group = team.group;

                //建立 <tr>
                let tr = document.createElement('tr');

                element.forEach((element,index) => {
                    let td = document.createElement('td');
                    td.classList.add('t' + index);

                    if(index == 0) {
                        td.innerHTML = 
                        `<div class="country">
                            <img class="flag" src="images/flag/${FIFAcode}.png" />
                            <span class="name">${element}</span>
                        </div>`;
                    } else {
                        td.innerHTML = `${element}`;
                    }                 
                    tr.appendChild(td);
                });

                switch(group){                    
                    case 'A':
                        matchesGroup[0].querySelector('table').appendChild(tr);
                        break;

                    case 'B':
                        matchesGroup[1].querySelector('table').appendChild(tr);
                        break;

                    case 'C':
                        matchesGroup[2].querySelector('table').appendChild(tr);
                        break;

                    case 'D':
                        matchesGroup[3].querySelector('table').appendChild(tr);
                        break;

                    case 'E':
                        matchesGroup[4].querySelector('table').appendChild(tr);
                        break;

                    case 'F':
                        matchesGroup[5].querySelector('table').appendChild(tr);
                        break;

                    case 'G':
                        matchesGroup[6].querySelector('table').appendChild(tr);
                        break;

                    case 'H':
                        matchesGroup[7].querySelector('table').appendChild(tr);
                        break;    
                    default:    
                        console.log(countryName + ': 戰績表 error');
                }                           
            }
        }

    });    

    tabControl(document.getElementById('matchesTable'),'.tab','.tab-content');

}

/* -------------------- 賽程表 content (Schedule) --------------------*/
export function setScheduleTable(sheetsData,teamData,tabwpr1,tabwpr2){

    // tabwpr1: 32 隊小組賽
    // tabwpr2: 16 強以上

    //取得各欄位的 index 值 
    const dateIndex = _.indexOf(sheetsData[0], '日期');
    const weekIndex = _.indexOf(sheetsData[0], '星期');
    const timeIndex = _.indexOf(sheetsData[0], '時間');
    const teamIndex1 = _.indexOf(sheetsData[0], '國家1');
    const teamIndex2 = _.indexOf(sheetsData[0], '國家2');
    const groupIndex = _.indexOf(sheetsData[0], '組別');

    // 各組別所對應的 tab-content: 小組賽
    const scheduleContent1 = tabwpr1.querySelectorAll('.schedule-content'); 

    // 各組別所對應的 tab-content: 16 強以上
    const scheduleContent2 = tabwpr2.querySelectorAll('.schedule-content'); 

    sheetsData.forEach((element,index) => {     
        
        // 扣掉第一列 標題列
        if(index > 0){

            let tr = document.createElement('tr');            

            const countryName1 = element[teamIndex1];
            const countryName2 = element[teamIndex2];

            let team1 = null;
            let team2 = null;

            if(countryName1 == '待定'){
                team1 = 'unknown';
            } else {
                //找出在 teamData 中對應的資料
                team1 =  _.find(teamData, ['country', countryName1]);
            }

            if(countryName2 == '待定'){
                team2 = 'unknown';
            } else {
                //找出在 teamData 中對應的資料
                team2 =  _.find(teamData, ['country', countryName2]);
            }
            
            if(!team1){
                console.log(countryName1 + 'error');
            } else if(!team2){
                console.log(countryName2 + 'error');
            } else {

                let FIFAcode1 = null;
                let FIFAcode2 = null;

                // FIFA code (用在定義國旗的檔名)
                if(team1 == 'unknown'){
                    FIFAcode1 = 'unknown'
                } else {
                    FIFAcode1 = team1.FIFA;
                }

                if(team1 == 'unknown'){
                    FIFAcode2 = 'unknown'
                } else {
                    FIFAcode2 = team2.FIFA;
                }       

                let html = 
                `<td class="date">${element[dateIndex]} / ${element[weekIndex]}</td>
                <td class="team">
                    <div class="country left">
                        <img class="flag" src="images/flag/${FIFAcode1}.png" />
                        <span class="name">${countryName1}</span>
                    </div>
                </td>
                <td class="time">${element[timeIndex]}</td>
                <td class="team">
                    <div class="country right">                        
                        <span class="name">${countryName2}</span>
                        <img class="flag" src="images/flag/${FIFAcode2}.png" />
                    </div>
                </td>`.trim();
                
                tr.innerHTML = html;

            }
            

            // 組別
            const group = element[groupIndex];

            switch(group){                    
                case 'A':
                    scheduleContent1[0].querySelector('table').appendChild(tr);
                    break;
    
                case 'B':
                    scheduleContent1[1].querySelector('table').appendChild(tr);
                    break;
    
                case 'C':
                    scheduleContent1[2].querySelector('table').appendChild(tr);
                    break;
    
                case 'D':
                    scheduleContent1[3].querySelector('table').appendChild(tr);
                    break;
    
                case 'E':
                    scheduleContent1[4].querySelector('table').appendChild(tr);
                    break;
    
                case 'F':
                    scheduleContent1[5].querySelector('table').appendChild(tr);
                    break;
    
                case 'G':
                    scheduleContent1[6].querySelector('table').appendChild(tr);
                    break;
    
                case 'H':
                    scheduleContent1[7].querySelector('table').appendChild(tr);
                    break;   
                case '16強賽':
                    scheduleContent2[0].querySelector('table').appendChild(tr);
                    break;

                case '8強賽':
                    scheduleContent2[1].querySelector('table').appendChild(tr);
                    break;
                case '準決賽':
                    scheduleContent2[2].querySelector('table').appendChild(tr);
                    break;
                case '第3名決定賽':
                    scheduleContent2[3].querySelector('table').appendChild(tr);
                    break;
                case '決賽':
                    scheduleContent2[4].querySelector('table').appendChild(tr);
                    break;    
                default:    
                    console.log('賽程表 error');
            }  
        }

           

    });

    tabControl(tabwpr1,'.tab','.tab-content');
    tabControl(tabwpr2,'.tab','.tab-content');

}


/* -------------------- Tab 操作 --------------------*/
export function tabControl(tabwpr,tab_list,tab_content){    
    
    const tabLi = tabwpr.querySelectorAll(tab_list);
    const tabContent = tabwpr.querySelectorAll(tab_content);

    tabLi.forEach((element) => {

        element.addEventListener('click',(e) => {

            tabLi.forEach((element) => {
                if(element.classList.contains('current')){
                    element.classList.remove('current');
                }
            });

            e.target.classList.add('current');

            tabContent.forEach((element) => {
                if(element.classList.contains('current')){
                    element.classList.remove('current');
                }
            });           

            console.log(element.dataset.tab);

            document.getElementById(element.dataset.tab).classList.add('current');                

        }, false);

    })

}

/* -------------------- set equal height --------------------*/
export function setEqualHeight(target){

    let maxHeight = 0;

    target.forEach((element) => {

        let height = element.offsetHeight;
        if(height > maxHeight){
            maxHeight = height;
        }

    });

    target.forEach((element) => {
        element.style.height = maxHeight + 'px';
    });

}

