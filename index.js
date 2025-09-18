let category = document.getElementById('category')
let minPrice = document.getElementById('min-price')
let maxPrice = document.getElementById('max-price')
let status = document.getElementById('status')
let container = document.getElementById('productContainer')

async function fetchProduct(){
    try {
        container.innerHTML=""
        let categoryValue = category.value.trim()
        let minPriceValue = parseFloat(minPrice.value.trim()) || 0
        let maxPriceValue = parseFloat(maxPrice.value.trim()) || Infinity

        let res = await fetch('https://fakestoreapi.com/products')
        let products = await res.json()

        let filteredCategory = categoryValue==='all'
        ? products
        : products.filter((product)=>{
            return product.category.toLowerCase()===categoryValue.toLowerCase()
        })

        let filteredPrice = filteredCategory.filter((product)=>{
            return product.price>=minPriceValue && product.price<=maxPriceValue
        })

        if (filteredPrice.length === 0) {
            status.textContent = 'No products found.';
            return;
        } else {
            status.textContent = `Showing ${filteredPrice.length} product(s)`;
        }

        filteredPrice.forEach((product)=>{
            let productBox = document.createElement('div')
            productBox.className='pdBox'
            productBox.innerHTML= `
                <img src="${product.image}" alt="">
                <h4>${product.title}</h4>
                <p>₹${product.price}</p>
            `
            container.appendChild(productBox)
        })
        maxPrice.value = ""
        minPrice.value = ""

    } catch (error) {
        console.log('Error in fetching product!',error)
    }
}
