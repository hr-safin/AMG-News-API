const handleCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    const response = await fetch(url)
    const data = await response.json()


    let allData = data.data.news_category
    allData.slice(0,3).forEach((category) => {
        console.log(category)
        const tab_container = document.getElementById("tab-container")

        const div = document.createElement("div")

        div.innerHTML = `
         
        <a onclick="handleId('${category.category_id}')" class="tab text-lg mr-4">${category.category_name}</a>
        
        `
        tab_container.appendChild(div)
    })
    console.log(data.data.news_category)
}

const handleId = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json()
    console.log(data.data)
    
}

handleCategory()