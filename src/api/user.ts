const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const loginUser = async (username: string, password: string): Promise<Response> => {
  const formData = new FormData()
  formData.append("username", username)
  formData.append("password", password)
  const response = await fetch(`${API_ROUTE}/users/login`, {
    method: "POST",
    body: formData
  })
  return response;
}

export const signIn = async (username: string, password: string): Promise<Response> => {
  const body = {
    username,
    password
  }
  const response = await fetch(`${API_ROUTE}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return response;
}