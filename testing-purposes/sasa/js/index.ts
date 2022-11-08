const isValidExpression = (expression: string) => {
  const regex = /^\d+(?:[-+/*]\d+)*$/;
  return regex.test(expression) ? '1' : '0';
}
