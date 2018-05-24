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

/* -------------------- Listing news --------------------*/








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

