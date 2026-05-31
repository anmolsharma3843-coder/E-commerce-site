const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginUser = async (userlogin) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogin),
    });

    const data = await response.json();

    return {
      ok: response.ok,
      data,
    };
  } catch (error) {
    console.log("Login API Error", error);

    return {
      ok: false,
      data: {
        message: "Server Error",
      },
    };
  }
};

export const SigninUser = async (userlogin) => {
    try{
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userlogin),
  });

  const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    console.log("Login API Error", error);

    return {
      ok: false,
      data: {
        message: "Server Error",
      },
    };
  }
};
//logout
export const logoutUser = async (userlogin) => {
    try{
  const res = await fetch(`${BASE_URL}/auth/logout`,{
        method: "POST",
        credentials: "include",
      });

  const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    console.log("Login API Error", error);

    return {
      ok: false,
      data: {
        message: "Server Error",
      },
    };
  }
};