export async function fetchData(input: RequestInfo, init?: RequestInit) {
  console.log("Fetching URL:", input);
  const response = await fetch(input, init);
  if (response.ok) {
    //response.ok mean the http call is between 200-299
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function updateUserRequest(
  headers: HeadersInit,
  body: {
    newFullName: string;
    newEmail: string;
    oldEmail: string;
    password: string;
  }
): Promise<any> {
  const response = await fetchData("api/user/update", {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  return response.json();
}
