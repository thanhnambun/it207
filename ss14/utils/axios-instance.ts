import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1/",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJyb2xlIjoiUXXhuqNuIGzDvSIsInN0YXR1cyI6IkFDVElWRSIsImlhdCI6MTc2MDI4ODMyNCwiZXhwIjoxNzYwMjg5MjI0fQ.WnPVcY5Vxos9ptvCKiGexkU5TbVw8HU2lZ476XQtO_s"
    },
    timeout: 10000,
})