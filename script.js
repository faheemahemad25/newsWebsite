// const Base_url = "https://newsapi.org/v2/everything?q=tesla&from=2024-09-19&sortBy=publishedAt&apiKey=0e58328b414a4920bdfa50cbb282474b";

const API_KEY =  "0e58328b414a4920bdfa50cbb282474b"; // or till now i used to use old or fixed these in syntax of API📗🔖
const url = "https://newsapi.org/v2/everything?q="; // or till now i used to use old or fixed these in syntax of API📗🔖
 


// 1. why arrow function bcz of syntax. confussion bcz of shorthand  means curly braces can be removed if one line code in arrow function.
// 2. lexical scoping. so error face if not use.

// window.addEventListener('load',  fetchNews("india")); //OUTPUT: ReferenceError: Cannot access 'fetchNews' before initialization

 window.addEventListener('load', ()=> fetchNews("cricket")); //📗🔖Learning 2 we want just after load page this function runs. so two ways to do it. 1st  directly call and 2nd pass this function to window.addEventListner('load', fetchNews())
 //👆By default cricket. then depend on click, before initialization it is working. bcz it is in another function.

//? window.addEventListener('load', ()=> {
//?     fetchNews("india")
//? });

let fetchNews = async(newsName)=>{
 try{
  
 //?  const res = await fetch(`https://newsapi.org/v2/everything?q=${newsName}&apiKey=0e58328b414a4920bdfa50cbb282474b`);
     
    const res = await fetch(`${url}${newsName}&apiKey=${API_KEY}`); //📗🔖Learning 1 or till now i used this above syntax of API
    const data = await res.json();
    console.log(data);

    console.log("kk",data.articles);
    console.log("kk",data.articles[0]);
    console.log("kk",data.articles[0].urlToImage);
    console.log("kk",data.articles[0].title);
    console.log("kk",data.articles[0].source.name);
    console.log("kk",data.articles[0].publishedAt);
    console.log("kk",data.articles[0].author);
    console.log("kk",data.articles[0].description);
    console.log("kk",data.articles[0].content);

    bindData(data.articles) 
 }catch(){
  alert('Error:Requests from the browser are not allowed on the Developer plan, except from localhost')
 }
}
//  fetchNews("cricket"); //📗🔖Learning 2.1 TILL NOW I USED THIS.📗🔖 we want just after load page this function runs. so two ways to do it. 1st  directly call and 2nd pass this function to window.addEventListner('load', fetchNews())

let bindData = (articles)=>{
    let newsCardTemplate = document.getElementById("newsCard-template")
    let cardsContainer = document.getElementById("card-container") // where newsCard to be appended.

    cardsContainer.innerHTML = "";

    articles.forEach((article) =>{
        //? console.log(article); // ❤️1st thing happen. //it is an object.
        //? console.log(article.urlToImage);
        //? console.log(article.title);
        //? console.log(article.source.name);
        // ? console.log(article.author);
        //? console.log(article.description);
        
        if(!article.urlToImage) return; //🔖📗 if anyone article dont hve value in urlToImage property means dont have img then dont show that object(article). bcz of UI layput looks wired. 
        //  if(article.urlToImage == "null") 
        if(!article.author) return;  //🔖📗 if anyone article dont hve value in author property means dont have author name then dont show that object(article). bcz of UI layput looks wired.
        // if(article.author == "null") 
        // ------- or ---------
        //? if (!article.urlToImage || !article.author) return; //🔖📗 : we writes above thing in short like this
        
        const cardClone = newsCardTemplate.content.cloneNode(true);//🔖📗how many articles that no. of cardClone will be created.
        console.log(cardClone);// ❤️2nd thing happen.
        fillDataInCard(cardClone, article);
        cardsContainer.append(cardClone); // cardclone and article created then  appended.
    });
}

let fillDataInCard = (cardClone, article) => {
    const newsImg = cardClone.querySelector('#news-img'); //🔖📗 now we dont take reference with doument.querySelector()  instead we takes cardClone.querySelector() 
    // const newsOriginalSource = cardClone.querySelector('#OriginalSource');
    const newsTittle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source'); //📗🔖 not need to create below two instaed we use template literal see line 97 // ------ 🔖📗 1st Learning -------------------
    // const newsAuthor = cardClone.querySelector('#news-author'); // instead of thse just create one elem and take ref so use template see belwo  --- learning 1 name line -----
    // const newsUpadteTime = cardClone.querySelector('#news-updateTime');// instead of thse just create one elem and take ref so use template see belwo  ---  learning 1 name line -----
    const newsDescp = cardClone.querySelector('#new-desc');

    const ourNewModifiedDate = new Date(article.publishedAt).toLocaleString("en-US"); //📗🔖 what ever dateTime u are getting just pass that in new Date() inside.

    newsImg.src = article.urlToImage;

    // newsOriginalSource.href = article.url;

    // or🔖📗2nd Learning --> it benefit no need to create element in html and no need to take ref and no need more js

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url) //📗🔖 window object 's open() method real use. used to open a new browser tab. It’s commonly used for opening external links, displaying additional information, or launching a new page for a specific task.

    })


    newsTittle.innerHTML = article.title;

    // newsSource.innerHTML = article.source.name;//📗🔖 not need to create below two instaed we use template literal
    // newsAuthor.innerHTML = article.author; //📗🔖 NO NEED to write two extra line just template use and save lot line in js and also in html or in card
    // newsUpadteTime.innerHTML = ourNewModifiedDate;
    // -----------  or 
    newsSource.innerHTML = `${article.source.name} • ${ourNewModifiedDate} • ${article.author}`; // ------ 🔖📗 1st Learning -------------------

    newsDescp.innerHTML = article.content;
}


// -------- part- navbar links input -------

let navLinksInp =  document.getElementById('nav-links-input');

navLinksInp.addEventListener('click', (e)=>{
  console.log(e.target.innerHTML);

  const inputClicked = e.target.innerHTML;
  fetchNews(inputClicked)
  
});

// -------- part- search input -------

const searchBtn = document.querySelector('.search-button')
const Searchedinput = document.querySelector('.news-input')


searchBtn.addEventListener('click', ()=>{
    const searched = Searchedinput.value;
    Searchedinput.value = "";
    fetchNews(searched);
    
})


// ------------- 2nd style of creating dynamically html card or html code  -------------- instead of htmltemplate element and js content.cloneNode(true)

//! const cardClone = `
//!             <div class="news-card" onclick="window.open('${article.url}', '_blank')">
//!                 <img id="news-img" src="${article.urlToImage}" alt="News Image">
//!                 <h2 id="news-title">${article.title}</h2>
//!                 <p id="news-source">${article.source.name} • ${new Date(article.publishedAt).toLocaleString("en-US")} • ${article.author}</p>
//!                 <p id="new-desc">${article.content}</p>
//!             </div>
//!         `;
//! // Insert the generated HTML into the container
//! cardsContainer.innerHTML = cardsContainer.innerHTML + cardClone;
