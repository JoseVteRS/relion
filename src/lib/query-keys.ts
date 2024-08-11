export const qk = {
  lists: {
    userLists: ["user-lists"],
    userListDetails: (id: string) => ["user-list-details", id],
    publicLists: ["public-lists"],
    publicListDetails: (id: string) => ["public-list-details", id],
  },
  presents: {
    userPresents: ["user-presents"],
    userPresentDetails: (id: string) => ["user-present-details", id],
    publicPresents: ["public-presents"],
    publicPresentDetails: (id: string) => ["public-present-details", id],
    publicPresentsInList: (id: string) => ["presents-in-list", id],
  },
};
