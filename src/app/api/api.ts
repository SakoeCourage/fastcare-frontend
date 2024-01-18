'use client'
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const Api = axios.create({
  baseURL: `${baseURL}/api`
})

export default Api;