# api-template
A template project for writing CENNZnet node.js API scripts

## Getting Started
To run this project you will need a connection to a CENNZnet node.
The easiest way is to run a local development node with docker.
```bash
# Using docker
docker run -p 9944:9944 --rm cennznet/cennznet:1.1.1 --dev --unsafe-ws-external
```

Otherwise head to https://github.com/cennznet/cennznet and follow the instructions to clone and build the binary yourself.
