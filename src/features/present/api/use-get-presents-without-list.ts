import { useQuery } from "@tanstack/react-query"
import { PRESENTS_QUERY_KEY } from "../presents-query-keys"
import { client } from "@/lib/hono"


export const useGetPresentsWithoutList = () => {
    const query= useQuery({
        queryKey: [PRESENTS_QUERY_KEY.PRESENTS_WITHOUT_LIST],
        queryFn: async () => {
            const response = await client.api.presents["for-options"].$get()
            if (!response.ok) {
                throw new Error("Failed to fetch presents without list");
            }
            const { data } = await response.json();

            console.log({ data })

            return data;
        },
    })

    return query
}