import AWS from 'aws-sdk';

AWS.config.update( {region: 'us-east-2'} );

const dynamo = new AWS.DynamoDB({ 
  region: 'us-east-2',
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  apiVersion: 'latest'
} );

const params: AWS.DynamoDB.CreateTableInput = {
    TableName: 'TRMS-data',
        AttributeDefinitions: [
      {
          AttributeName: 'Type',
          AttributeType: 'S'
      },
      {
        AttributeName: 'ID',
        AttributeType: 'N'
      },
    ],
      KeySchema: [
        {
          AttributeName: 'Type',
          KeyType: 'HASH'
        },
        {
          AttributeName:'ID',
          KeyType: 'RANGE',
        },
      ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    StreamSpecification: {
        StreamEnabled: false
    },
  };
  
  dynamo.createTable(params, (err, data) => {
    if(err) {
      console.log("error", err);
    } else {
      console.log("Table Created", data);
    }
  });