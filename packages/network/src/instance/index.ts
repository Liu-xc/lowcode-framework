// import axios from './init';

// * 先Mock一个promise的

const MockData = {
  name: 'alice',
  age: 12
};

export async function request(configs: any) {
  console.log(configs);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MockData);
    });
  });
}

export * from './init';