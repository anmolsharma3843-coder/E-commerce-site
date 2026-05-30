const BASE_URL = import.meta.env.VITE_BASE_URL;
export const FetchUsers=async()=>{
    try {
         const response = await fetch(`${BASE_URL}/users`, {
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
// DELETE USER
export const deleteUserApi = async (id) => {
  const response = await fetch(
    `${BASE_URL}/users/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user");
  }

  return data;
};