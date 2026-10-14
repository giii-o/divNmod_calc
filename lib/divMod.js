const expressionPattern = /^\s*\d+(?:\s+(?:div|mod)\s+\d+)*\s*$/;

const invalidExpressionMessage = 'Use whole numbers with div or mod between them.';
const divisionByZeroMessage = 'A number cannot be divided by or modded by zero.';

export function evaluateDivMod(expression) {
  if (!expressionPattern.test(expression)) {
    throw new Error(invalidExpressionMessage);
  }

  const tokens = expression.trim().split(/\s+/);
  let result = BigInt(tokens[0]);

  for (let tokenIndex = 1; tokenIndex < tokens.length; tokenIndex += 2) {
    const operator = tokens[tokenIndex];
    const operand = BigInt(tokens[tokenIndex + 1]);

    if (operand === 0n) {
      throw new Error(divisionByZeroMessage);
    }

    result = operator === 'div' ? result / operand : result % operand;
  }

  return result.toString();
}
