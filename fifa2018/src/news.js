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

    setMatchTableTitle(sheetsData[0]);        
        
    // 取得 '國家' 的 index 值
    const countryIndex = _.indexOf(sheetsData[0], '國家');

    const matchesGroup = document.querySelectorAll('.matches-content');


    sheetsData.forEach((element,index) => {           
        
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
                        console.log(countryName + ': error');
                }                           
            }
        }

    });    

}


/* -------------------- Tab 操作 --------------------*/
export function tabControl(){    
    
    const tabLi = document.querySelectorAll('.tab');
    const tabContent = document.querySelectorAll('.tab-content');

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

