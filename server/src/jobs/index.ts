export const TestJob = {
  key: "testJob",
  async handle({ data }: any) {
    console.log(data);
  },
};
