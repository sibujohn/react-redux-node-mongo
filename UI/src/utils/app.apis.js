export const Http_Get = (url) => fetch(url)

export const Http_Post = (url, data) =>fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})