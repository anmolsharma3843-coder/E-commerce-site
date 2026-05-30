
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const addProductApi = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        rating: Number(product.rating),
        sizes: product.sizes.split(",").map(s => s.trim())
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error:${response.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
//fetch product list
 export const fetchProductList=async()=>{
    try{
        const response=await fetch(`${BASE_URL}/products/list`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok){
            throw new Error(`Error:${response.status}`)
        }
        return await response.json();
        
    }catch(error){
        console.log("API call Failed",error)
        throw error;
    }
}
// GET ALL PRODUCTS
 export const fetchAllproduct=async()=>{
    try{
        const response=await fetch(`${BASE_URL}/products/all`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok){
            throw new Error(`Error:${response.status}`)
        }
        return await response.json();
        
    }catch(error){
        console.log("API call Failed",error)
        throw error;
    }
}
// DELETE PRODUCT
export const deleteProductApi = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};
//category part
export const getProducts = async (filters) => {
  const query = new URLSearchParams(filters).toString();

  const res = await fetch(`http://localhost:5100/products?${query}`);
  return res.json();
};
