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
//upload user profile image
export const uploadImageApi = async (formData) => {
  try {
    const response = await fetch(
    `${BASE_URL}/users/upload-profile`,
    {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload user image");
  }

  return data;
  } catch (error) {
    console.log('Api error',error)
    throw error;
  }
};