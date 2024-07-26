import Cookies from "js-cookie";

export const fetchAuth = async (url: string) => {
  const token = Cookies.get("Authorization");
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchNoAuth = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
