import axios from "axios";
import { apiRequestValidator, ApiRequest } from "./api-schema";
import dotenv from "dotenv";
dotenv.config();

// Function to determine the base URL based on the environment
function getBaseUrl(): string {
  const mode = process.env.MODE || "production";
  return mode === "development"
    ? "http://localhost:5000"
    : "https://production-api.com";
}

export const Api = {
  async get(endpoint: string): Promise<any> {
    try {
      const baseUrl = getBaseUrl();
      const response = await axios.get(`${baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async post(endpoint: string, payload: ApiRequest): Promise<any> {
    try {
      const baseUrl = getBaseUrl();
      const data = apiRequestValidator.parse(payload);
      const response = await axios.post(`${baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
