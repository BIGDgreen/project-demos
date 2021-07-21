export const createState = () => {
  const store = {
    loading: true,
  };
  return store;
};

export type userState = ReturnType<typeof createState>;
