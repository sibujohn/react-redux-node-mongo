export const Http_Get = (url) => fetch(url)

export const Http_Post = (url, data) => fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})

export const Http_Put = (url, data) => fetch(url, {
  method: "PUT",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})