var ourwork = document.getElementById("works-grid");
var ourworkUL = ``;
fetch("json/ourworks.json")
.then(response => {
   return response.json();
})
.then(jsondata => {
    // var len = Object.keys(jsondata.ourwork).length;
    const data = jsondata.ourwork;
    var count = 0;
    data.forEach(element => {
        ourworkUL = ourworkUL + `
        <li class="work-item illustration webdesign"><a href="portfolio-single-1.html">
        <div class="work-image"><img src=${element.src} alt="Portfolio Item"/></div>
        <div class="work-caption font-alt">
          <h3 class="work-title">${element.title} ${count}</h3>
          <div class="work-descr">${element.desc} ${count}</div>
        </div></a></li>
        `;
        count = count + 1;
    });
    console.log(ourworkUL)
    ourwork.innerHTML = ourworkUL;                                               
});

