export const generateRandomAdditionQuestion = () => {
  const num1 = Math.floor(Math.random() * 11);
  const num2 = Math.floor(Math.random() * 11);

  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;

  return { question, answer: answer.toString() };
};
