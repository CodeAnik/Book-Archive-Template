//Getting necessary field 
const inputField = document.getElementById('inputField');
const searchButton = document.getElementById('searchButton');
const cardContainer = document.getElementById('cardContainer');
const alertMessage = document.getElementById('alert');
const spinner = document.getElementById('spinner');


// addEventListener when click on search button
searchButton.addEventListener('click', () => {
    spinner.classList.remove('d-none');
    searchBy = inputField.value
    clean();
    findResult(searchBy);
});


// Function forload all the result
const findResult = (searchBy) => {
    fetch(`https://openlibrary.org/search.json?q=${searchBy}`).then(res => res.json()).then(data => {
        if (data.docs.length===0) {
            spinner.classList.add('d-none');
            totalResult='No result Found';
            alert(totalResult)
            return;
        } else if(data.docs.length<20) {
            alert(data.docs.length);
        }else{
            alert(`First 20 out of ${data.docs.length}`);
        }
        data.docs.slice(0, 20).forEach(element => {
            const div = document. createElement("div");
            div.classList.add("col");
            div.innerHTML=`
                <div class="card ">
                    <img src="${element.cover_i ? `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`: `images/img not found.jpg`}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <div id="authorDiv" >
                            ${element.author_name ?                           
                                element.author_name:"Didn't find any author"}
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">First Publish Year : ${element.first_publish_year}</small>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Publisher : ${element.publisher}</small>
                    </div>
                </div>`
            cardContainer.appendChild(div);
            
        });
        spinner.classList.add('d-none');
    });
}

// alert function for showing message of how many resunt we get or getting no result
const alert =(result)=>{
    alertMessage.innerHTML=
    `<div class="alert alert-secondary" role="alert">
        Total Search result : ${result}
    </div>`
}


//after search more then one time clean all previous data
const clean = () =>{
    inputField.value = '';
    cardContainer.innerHTML=''
    alertMessage.innerHTML=''
}
