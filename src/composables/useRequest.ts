import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})
export const useGetRequest = axiosInstance.get
export const usePostRequest = axiosInstance.post
export const usePatchRequest = axiosInstance.patch
export const useDeleteRequest = axiosInstance.delete
export const usePutRequest = axiosInstance.put
