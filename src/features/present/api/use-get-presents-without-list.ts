import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/hono"

//TODO: Por ahora no se utiliza
export const useGetPresentsWithoutList = () => {
    const query= useQuery({
        queryKey: ['presents-without-list'],
        queryFn: async () => {
            const response = await client.api.presents["for-options"].$get()
            if (!response.ok) {
                throw new Error("Failed to fetch presents without list");
            }
            const { data } = await response.json();


            return data;
        },
    })

    return query
}