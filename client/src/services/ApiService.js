const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchCategory=async(endpoint)=>{
    try{
        const response=await fetch(`${BASE_URL}/${endpoint}`,{
           method: 'POST',
        body: JSON.stringify({ _id: id }),
        headers: { 'Content-Type': 'application/json' }
      });
        if(!response.ok){
            throw new Error(`Error:${response.status}`)
        }
        return await response.json();
        
    }catch(error){
        console.log("API call Failed",error)
        throw error;
    }
}

 const DelteCartItem=async(endpoint)=>{
    try{
        const response=await fetch(`${BASE_URL}/${endpoint}`,{
            method: 'DELETE',
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
// services/ApiService.js

export const AddCart=(id)=>fetchdata(`cart/${id}`);
export const Category=(id)=>fetchCategory('category', id);
export const cart=()=>fetchdata('cart');
export const removefromcart=(id)=>DelteCartItem(`cart/${id}`);
