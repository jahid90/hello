const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const util = require('util');

const serverAddr = '127.0.0.1:9000';
const protoPath = '../proto/factorial.proto';

const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const proto = protoDescriptor.proto;

const stub = new proto.Factorial(serverAddr, grpc.credentials.createInsecure());
const x = 10;
stub.getFactorial({ x: x }, (err, response) => {
    console.log(`Called f(${x}), Got: ${response.result}`);
});
