export const qk = {
  lists: {
    countByUser: ["count-lists-by-user"],
    userLists: ["user-lists"],
    userListDetails: (id: string) => ["user-list-details", id],
    publicLists: ["public-lists"],
    publicListDetails: (id: string) => ["public-list-details", id],
    privateListDetails: (id: string) => ["private-list-details", id],
  },
  presents: {
    userPresents: ["user-presents"],
    userPresentDetails: (id: string) => ["user-present-details", id],
    publicPresents: ["public-presents"],
    publicPresentDetails: (id: string) => ["public-present-details", id],
    publicPresentsInList: (id: string) => ["presents-in-list", id],
  },
  subscription: {
    get: ["subscription"],
  },
  tier: {
    get: ["tier"],
  },
  favorite: {
    getFavorite: (listId: string) => ["favorite", listId],
    getFavoritesByUserId: (id?: string) => ["favorites", id],
  },
};
