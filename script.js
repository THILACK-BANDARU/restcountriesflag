async function getCountry(){
    try{
        const result = await fetch("https://restcountries.com/v3.1/all")    
        const resp= await result.json();
        foo(resp);
        // console.log("after foo");
    }
    catch{(err) => {
        console.error(err);    
    }};


    function foo(data){
        data.forEach(element =>{
            // console.log("rest countries data")

            // let container = document.createElement('div');
            // container.setAttribute('class','container');
            
            // let row=document.createElement('div');
            // row.setAttribute('class','row');

            let row=document.getElementById('row');

            let col=document.createElement('div');
            col.setAttribute('class','col-4 mb-3');

            let card=document.createElement('div');
            card.setAttribute('class','card h-100');

            let cardImg=document.createElement('img');
            cardImg.setAttribute('class','card-img-top')
            cardImg.setAttribute('src',element.flags.png);

            let cardbody=document.createElement('div');
            cardbody.setAttribute('class','card-body');

            let cardTitle=document.createElement('h4')
            cardTitle.setAttribute('class','card-title');
            cardTitle.innerHTML=element.name.common;

            let cardText=document.createElement('p');
            cardText.innerHTML=element.capital + " - " + element.region + " - " + element.timezones;

            cardbody.append(cardText,cardTitle);
            card.append(cardbody,cardImg);

            col.append(card);
            row.append(col);
            // container.append(row);
            // document.body.append(container);
        
        });
    }
}

getCountry();
