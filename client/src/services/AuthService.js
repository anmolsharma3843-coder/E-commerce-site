const BASE_URL = "http://localhost:5100/auth";

export const LoginUser = async (userlogin) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
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
  const res = await fetch(`${BASE_URL}/register`, {
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