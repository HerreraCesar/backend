import random from 'random'

const calculation = (quantity) => {
  let numbers = [];
  for (let index = 0; index < quantity; index++) {
    numbers.push(random.int(1, 1000));
  }
  let numbersKeys = [...new Set(numbers)].sort(function (a, b) {
    return a - b;
  });
  let result = [];
  numbersKeys.forEach((key) => {
    let repetitions = numbers.filter((number) => number === key).length;
    result.push(`${key} => ${repetitions}`);
  });
  return result
};

process.on('message', (quantity)  => {
    let result = calculation(quantity)
    process.send(result)
    process.exit()
})