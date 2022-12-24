// Variable to store the data of 100 elements
var centralData = [];
//GETTING THE RAW DATA FROM THE GIST GITHUB using fetch

url="https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
fetch(url)
// converting the raw data into json object
.then(function(response){
    return response.json();
})
.then(function(result){

    
    centralData = result;
    // console.log(centralData);

    generateData(result.slice(0,10));
})
.catch(function(err){
    console.log(err);
})

//defining getPage to send the page number to generateData function

// const getPage= function(page){
//     console.log(`page number is: ${page}`)
// }

// creating the container and row elements of bootstrap using DOM
const divEle=document.createElement('div');
divEle.setAttribute('class','container')

const rowEle=document.createElement('div');
rowEle.setAttribute('class','row');

const colEle=document.createElement('div');
colEle.setAttribute('class','offset-2 col-8');

const table=document.createElement('table');

// creating the table elements tr th
function createHtml(){
    
    table.setAttribute('class','table');

    var tr=document.createElement('tr');
    tr.setAttribute('class','tr');

    var th1=document.createElement('th');
    th1.setAttribute('class','th');
    th1.innerText="ID";

    var th2=document.createElement('th');
    th2.setAttribute('class','th');
    th2.innerText="Name";

    var th3=document.createElement('th');
    th3.setAttribute('class','th');
    th3.innerText="Email";

    tr.append(th1,th2,th3);
    table.append(tr);
    colEle.append(table)
    rowEle.append(colEle);
    divEle.append(rowEle);
    document.body.append(divEle);
}
var tbody  = document.createElement('tbody');

// calling the function to generate the basic structure
// console.log("html is called");
createHtml()

//function to append the rows and put the data into cells
function generateData(JSdata){
    // var pageNumber=getPage()
    
    tbody.innerHTML = "";
    // console.log(JSdata);
    for(let item of JSdata){
        // console.log(item)
        var id=item.id;
        var name=item.name;
        var email=item.email;
            // console.log(id);   
        if (true) {
            

            var tr=document.createElement('tr');
            tr.setAttribute('class','tr');
    
            var td1=document.createElement('td');
            td1.setAttribute('class','td');
            td1.innerText=id;
    
            var td2=document.createElement('td');
            td2.setAttribute('class','td');
            td2.innerText=name;
    
            var td3=document.createElement('td');
            td3.setAttribute('class','td');
            td3.innerText=email;
    
            tr.append(td1,td2,td3);
            tbody.append(tr);
        }
    }
    
}

table.append(tbody);
colEle.append(table)
rowEle.append(colEle);
divEle.append(rowEle);
document.body.append(divEle);

// creating a nav bar

var nav=document.createElement('nav');
nav.setAttribute('aria-label',"Pagination");
nav.setAttribute('class','nav ')

var ul=document.createElement('ul');
ul.setAttribute('class','pagination justify-content-center');



const pages=['first','previous',1,2,3,4,5,6,7,8,9,10,'next','last'];
let pageClicks=[1];
let currPage=1;
pages.forEach(function (pageNo){
    var li=document.createElement('li');
    li.setAttribute('class','page-item');
    var a=document.createElement('a');  
    a.setAttribute('class','page-link');
    a.setAttribute('href',"#");
    a.innerHTML=pageNo;

    
    a.addEventListener('click',() => {
        let slicedData;
        // console.log(`page number clicked is ${pageNo}`);

        pageClicks.push(pageNo);   
        // console.log(pageClicks);     
        // for first page button
        if(pageNo=='first'){
            slicedData = centralData.slice( 10 * (1 - 1), 10 * 1 );
        }
        else if(pageNo=='last'){
            slicedData = centralData.slice( 10 * (10 - 1), 10 * 10 );
        }
        else if(pageNo=='previous' && pageClicks[pageClicks.length-2]==1 ){
            slicedData = centralData.slice( 10 * (1 - 1), 10 * 1 );
            pageClicks.pop();
        }
        else if(pageNo=='previous'&& pageClicks[pageClicks.length-2]!=1 ){
            let prevPage=pageClicks[pageClicks.length-2];
            currPage=pageClicks[pageClicks.length-2]-1;
            // console.log(`previous page is ${prevPage}`);
            // console.log(`current page is ${currPage}`);
            slicedData = centralData.slice( 10 * (prevPage - 2), 10 * (prevPage-1) );
            pageClicks.pop();
            pageClicks.push(currPage);
        }
        else if(pageNo=='next' && pageClicks[pageClicks.length-2] ===10){
            slicedData = centralData.slice( 10 * (10 - 1), 10 * 10 );
            pageClicks.pop();
            // pageClicks.push(pageClicks[pageClicks.length-1]);
        }
        else if(pageNo=='next' && pageClicks[pageClicks.length-2] !=9){
            let prevPage=pageClicks[pageClicks.length-2];
            let nextPage=pageClicks[pageClicks.length-2]+1;
            // console.log(`current page is ${prevPage}`);
            slicedData = centralData.slice( 10 * (prevPage ), 10 * (prevPage+1) );
            pageClicks.pop();
            pageClicks.push(nextPage);
        }

        // console.log("Line 146", pageNo)
        // console.log("Line 146",centralData);
        else{
                slicedData = centralData.slice( 10 * (pageNo - 1), 10 * pageNo );
        }
        // console.log("Line 146", slicedData);
        generateData(slicedData);
    });

    // console.log(pageNo);
    li.append(a);
    ul.append(li);
})

nav.append(ul);
// nav.classList.add('d-flex justify-content-center');




const div2=document.createElement('div');
div2.setAttribute('class','bottom-nav d-flex justify-content-center offset-1 col-10');

div2.append(nav);
rowEle.append(div2);
divEle.append(rowEle);
document.body.append(divEle);   



