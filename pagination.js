let paginationContainer=document.querySelector(".pagination-container");


let pagination={
    currentPage:1,
    totalRecords:50, //default
    record_per_page:5,
    pages:1,
    render:()=>{
        paginationContainer.innerHTML="";
        pagination.totalRecords=services.getTodoCount();
        pagination.pages=Math.ceil(pagination.totalRecords/pagination.record_per_page);
        let prevBtn=document.createElement("button");
        prevBtn.innerText="Previous";
        prevBtn.addEventListener("click",pagination.prev)
        paginationContainer.appendChild(prevBtn);



        for(let i=1;i<=pagination.pages;i++) {
            const button=pagination.getButton(i);
            button.classList.add("pagination-button")
            if(i===Number(pagination.currentPage)) {
                button.classList.add("active");
            }
            button.addEventListener("click",()=>pagination.goToPage(button,i))
            paginationContainer.appendChild(button);
            
        }

        let nextBtn=document.createElement("button");
        nextBtn.innerText="Next";
        nextBtn.addEventListener("click",pagination.next)
        paginationContainer.appendChild(nextBtn);


        
    },
    getButton:(name)=>{
        const paginationBtn=document.createElement("button");
        paginationBtn.innerText=name;
        paginationBtn.setAttribute("id",`btn${name}`);
        return paginationBtn;
    },

    goToPage:(elem,itemId)=>{

        let paginationBtns=document.querySelectorAll(".pagination-button");
        paginationBtns.forEach(item=>{
            item.classList.remove("active");
        })

        elem.classList.add("active");
        pagination.currentPage=itemId;

        const fragmented=services.getPagedData(itemId);
        functions.render(fragmented);

    },
    prev:()=>{
        if(pagination.currentPage===1) { return {}}

        pagination.currentPage=pagination.currentPage-1;

        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        pagination.goToPage(currentBtn,pagination.currentPage);
    },
    next:()=>{
        if(pagination.currentPage===pagination.pages) {return{}}
        pagination.currentPage=pagination.currentPage+1;
        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        pagination.goToPage(currentBtn,pagination.currentPage);
    },
    goToLastPage:()=>{
        pagination.currentPage=pagination.pages;
        let currentBtn=document.getElementById(`btn${pagination.currentPage}`);
        pagination.goToPage(currentBtn,pagination.currentPage);
    },
    showPagination:()=>{
        if(state.todos.length>=1) {
            paginationContainer.classList.remove("none");
        }
    }
}

pagination.render();