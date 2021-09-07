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

const calcFactorial = ({ x }) => {
    let result = 1;

    while (x > 0) {
        result *= x;
        x = x - 1;
    }

    return result;
}

const getFactorial = (call, callback) => {
    console.log('Received request:');
    console.log(util.inspect(call.request, { showHidden: false, depth: null }));
    callback(null, { result: calcFactorial(call.request) });
}

const server = new grpc.Server();
server.addService(proto.Factorial.service, {
    getFactorial: getFactorial
});
server.bindAsync(serverAddr, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
