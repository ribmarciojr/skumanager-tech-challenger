import axios from "axios";

export function AxiosService() {
  const GatewayURL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:3000/api/v1";

  console.log(GatewayURL);
  const axiosInstance = axios.create({
    baseURL: GatewayURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
}
