import { useState } from "react"
import axiosInstance from "../../lib/axiosInstance"

const useAuth = () => {
  const [error, setError] = useState(null)

  const handleAuth = async (isRegister, payload) => {
    try {
      const endpoint = isRegister ? "/register/user" : "/login"
      const response = await axiosInstance.post(endpoint, payload)

      return { success: true, message: response.data.message }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
      return { success: false }
    }
  }

  return { error, handleAuth }
}

export default useAuth
