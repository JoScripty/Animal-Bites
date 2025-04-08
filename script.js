const searchInput = document.getElementById("searchInput");
const list = document.getElementById("searchList");
const items = list.getElementsByTagName("button");
const searchBtn = document.getElementById("search-btn");
const toastTrigger = document.getElementById('search-btn');
const notFoundToast = document.getElementById('notFoundToast');
const notFoundNotif = bootstrap.Toast.getOrCreateInstance(notFoundToast);
const errorToastChecking = document.getElementById('errorToastChecking');
const errorChecking = bootstrap.Toast.getOrCreateInstance(errorToastChecking);

searchInput.addEventListener('input', function(){
    const inputFiltered = searchInput.value.toLowerCase().trim();
    let hasMatch = false;

    for(let i = 0; i < items.length; i++){
        const item = items[i].textContent.toLowerCase();

        if(item.includes(inputFiltered) && inputFiltered !== ""){
            items[i].style.display = "";
            hasMatch = true;
        }
        else{
            items[i].style.display = "none";
        }
    }

    if(hasMatch){
        list.classList.remove('d-none');
    }
    else{
        list.classList.add('d-none');
    }
})

Array.from(items).forEach(item => {
    item.addEventListener('click', ()=>{
        searchInput.value = item.textContent;
        list.classList.add('d-none');
    })
});

searchBtn.addEventListener('click', ()=>{
    const file = `${searchInput.value.trim()}.html`;

    fetch(file, {method: "HEAD"})
    .then(response =>{
        if(response.ok){
            location.href = file;
        }
        else{
            notFoundNotif.show();
        }
    })
    .catch(error =>{
        console.error("Error: "+ error);
        errorChecking.show();
    })
})