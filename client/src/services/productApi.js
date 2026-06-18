
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const addProductApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
  const response = await fetch(`${BASE_URL}/products/${id}`, {
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
  try {
    const query = new URLSearchParams(filters).toString();

  const res = await fetch(`${BASE_URL}/products?${query}`);
  return res.json();
  } catch (error) {
     console.log("API call Failed",error)
        throw error;
  }
};
//update product
export const updateProduct=async(id,formData)=>{
  try {
    const response = await fetch(
        `${BASE_URL}/products/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include"
        }
      );

      return await response.json();

      if (!response.ok)
        throw new Error(data.message);

  } catch(error){
        console.log("API call Failed",error)
        throw error;
    }
}

export const getProductDetails=async(id)=>{
          try{
        const response=await fetch(`${BASE_URL}/products/${id}`,{
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
export const getrelatedProduct=async(id)=>{
          try{
        const response=await fetch(`${BASE_URL}/products/category/${id}`,{
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