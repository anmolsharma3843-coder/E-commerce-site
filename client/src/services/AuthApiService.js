const BASE_URL = import.meta.env.VITE_BASE_URL;

// LOGIN
export const LoginUser = async (userlogin) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogin),
    });

    const data = await response.json();

    // Save token
    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
    }

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

// REGISTER
export const SigninUser = async (userlogin) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogin),
    });

    const data = await res.json();

    // Save token
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    console.log("Register API Error", error);

    return {
      ok: false,
      data: {
        message: "Server Error",
      },
    };
  }
};

// LOGOUT
export const logoutUser = async () => {
  try {
    // Remove token from browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    console.log("Logout API Error", error);

    return {
      ok: false,
      data: {
        message: "Server Error",
      },
    };
  }
};