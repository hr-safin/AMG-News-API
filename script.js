const handleCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const response = await fetch(url);
  const data = await response.json();

  let allData = data.data.news_category;

  
  allData.slice(0, 3).forEach((category) => {
   
    const tab_container = document.getElementById("tab-container");

    const div = document.createElement("div");

    div.innerHTML = `
         
        <a onclick="handleId('${category.category_id}')" class="tab text-lg mr-4">${category.category_name}</a>
        
        `;
    tab_container.appendChild(div);
  });
  
};

const handleId = async (categoryId) => {
  
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await response.json();
    
  document.getElementById("sort-button").addEventListener("click",function(){
    const sortedData = data.data
     const sort =sortedData.sort((a,b) => {
       new Date(b.author.published_date) - new Date(a.author.published_date)
    })
  })
    
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((news) => {
   
    
    const div = document.createElement("div");

    div.innerHTML = `
        
        <div class="card h-[500px]  bg-base-100 shadow-xl">
        <figure><img src="${news.image_url}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title.slice(0, 45)}</h2>
          <p>${news.details.slice(0, 45)}</p>
          <h2 class=" pt-2">Total Views: ${
            news.total_view ? news.total_view : "no view"
          }</h2>
          <div class=" flex  items-center pt-3 gap-4">
          <div class="avatar">
             <div class=" w-12 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <img src="${news?.author.img}" />
         </div>
         </div>
         <div>
         <h2>${news?.author.name}</h2>
         <p>${news?.author.published_date}</p>
         </div>
          </div>
          <div class="card-actions justify-end -mt-12">
            <button onclick = "handleModal('${news._id}')" class="btn btn-primary">Details</button>
          </div>
        </div>
      </div>
        
        `;

    cardContainer.appendChild(div);
  });
  
};

const handleModal = async (newsId) => {
  
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json()
    
  const modalContainer = document.getElementById("modal-content")
  data.data.forEach((data) =>{
    
    
    const div = document.createElement("div");

    div.innerHTML = `
      <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg text-center ">${data.title}</h3>
      <p class="py-4">${data.details}</p>
      <h2 class=" pt-2 font-bold text-lg text-right">${data.author.name}</h2>
      <div class="modal-action flex justify-center">
        
        <button class="btn btn-primary">Close</button>
      </div>
    </form>
  </dialog>
      
      `
      modalContainer.appendChild(div)
    const modal = document.getElementById("my_modal_1")
    modal.showModal()
  })
  
    
};




handleCategory();
handleId("01");
