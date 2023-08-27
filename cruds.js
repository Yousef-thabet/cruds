let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let deleteAll= document.getElementById('deleteAll');
let mood = 'create';
let x;
let search =document.getElementById('search');
// ----  get total
function getTotal(){
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML = result;
        total.style.color ='green';
    }else{
        total.innerHTML ='';

    }
}
// ----  creat product
title.focus();
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro =[];
}
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total: total.innerHTML,
        count :count.value,
        category: category.value.toLowerCase(),
    }
    if(mood === 'create'){
  if(newPro.count > 1){
    for(let i=0; i< newPro.count;i++){
        dataPro.push(newPro);
    }
  }else{
    dataPro.push(newPro);
  }
}else if(mood === 'update'){
    dataPro[x]= newPro;
    mood= 'create';
    count.style.display= 'block';
    submit.innerHTML= mood;
}
    clearInputs();
    showData();
    // ----  save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
}
// ----  clear inputs
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML ='';
}
// ----  read
function showData(){
    let table = '';
    for(let i = 0; i<dataPro.length; i++){
        table += `
        <tr>
                        <th>${i}</th>
                        <th>${dataPro[i].title }</th>
                        <th>${dataPro[i].price }</th>
                        <th>${dataPro[i]. taxes}</th>
                        <th>${dataPro[i]. ads}</th>
                        <th>${dataPro[i]. discount}</th>
                        <th>${dataPro[i].total }</th>
                        <th>${dataPro[i].category }</th>
                        <th><button onclick='updateData(${i})' id="update">update</button></th>
                        <th><button id="delete" onclick='deleteData(${i})'>delete</button></th>
                    </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length > 0){
        deleteAll.innerHTML =`<button onclick="delAll()" class='btn'>delete(${dataPro.length})</button>`;
    }else{
        deleteAll.innerHTML =``;
    }
}
showData();
// ----  count
// ----  delet
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function delAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}

// ----  update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    category.value = dataPro[i].category;
    count.style.display= 'none';
    submit.innerHTML= 'update';
    getTotal()
    mood = "update"
    x = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// ----  search
let searchMood="Title";
function getSearchMood(id){
    if(id == 'searchTitle'){
        searchMood="Title";
console.log(searchMood)


    }else if(id == 'searchCategory'){
        searchMood="category";
        console.log(searchMood)


    }
    search.placeholder ='search by '+searchMood;
    search.focus();
search.value='';
showData();


}

    function searchData(value){
        let table = '';
        if (searchMood=='Title'){
            for(let i =0; i < dataPro.length;i++){
                if(dataPro[i].title.includes(value.toLowerCase())){

                    
                        table += `
                        <tr>
                                        <th>${i}</th>
                                        <th>${dataPro[i].title }</th>
                                        <th>${dataPro[i].price }</th>
                                        <th>${dataPro[i]. taxes}</th>
                                        <th>${dataPro[i]. ads}</th>
                                        <th>${dataPro[i]. discount}</th>
                                        <th>${dataPro[i].total }</th>
                                        <th>${dataPro[i].category }</th>
                                        <th><button onclick='updateData(${i})' id="update">update</button></th>
                                        <th><button id="delete" onclick='deleteData(${i})'>delete</button></th>
                                    </tr>
                        `;
                   

                }
            }
        }
        else if(searchMood=='category'){
            for(let i =0; i < dataPro.length;i++){
                if(dataPro[i].category.includes(value.toLowerCase())){

                   
                        table += `
                        <tr>
                                        <th>${i}</th>
                                        <th>${dataPro[i].title }</th>
                                        <th>${dataPro[i].price }</th>
                                        <th>${dataPro[i]. taxes}</th>
                                        <th>${dataPro[i]. ads}</th>
                                        <th>${dataPro[i]. discount}</th>
                                        <th>${dataPro[i].total }</th>
                                        <th>${dataPro[i].category }</th>
                                        <th><button onclick='updateData(${i})' id="update">update</button></th>
                                        <th><button id="delete" onclick='deleteData(${i})'>delete</button></th>
                                    </tr>
                        `;
                    
                    
                }
            }
        }
        document.getElementById('tbody').innerHTML = table;
  
    }


// ----  clean data
