const Base_url= 'http://localhost:5100'

 export const fetchdata=async(endpoint)=>{
    try{
        const response=await fetch(`${Base_url}/${endpoint}`,{
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
export const fetchCategory=async(endpoint)=>{
    try{
        const response=await fetch(`${Base_url}/${endpoint}`,{
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
        const response=await fetch(`${Base_url}/${endpoint}`,{
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
export const FetchUsers=async(endpoint)=>{
    try {
         const response = await fetch(`http://localhost:5100/${endpoint}/`, {
                    method: "GET",
                    credentials: "include"
                });
                if(!response.ok){
            throw new Error(`Error:${response.status}`)
        }
        return await response.json();
    } catch (error) {
        console.log("API call Failed",error)
        throw error;
    }
}
export const getProductDetails=async(id)=>{
          try{
        const response=await fetch(`${Base_url}/products/${id}`,{
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
        const response=await fetch(`${Base_url}/products/category/${id}`,{
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
export const getProducts = async (filters) => {
  const query = new URLSearchParams(filters).toString();

  const res = await fetch(`http://localhost:5100/products?${query}`);
  return res.json();
};
export const products=()=>fetchdata('products/list');
export const AddCart=(id)=>fetchdata(`cart/${id}`);
export const Category=(id)=>fetchCategory('category', id);
export const cart=()=>fetchdata('cart');
export const removefromcart=(id)=>DelteCartItem(`cart/${id}`);
export const GetUsers=()=>FetchUsers('users')
