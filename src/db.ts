import { MongoClient } from "mongodb";

async function connect(url: string, database: string) {
    const client = new MongoClient(url);
    await client.connect();
    console.log("connected");
    return client.db(database);
}

export default connect;

//https://www.mongodb.com/pt-br/docs/drivers/node/current/crud/insert/

//https://www.mongodb.com/pt-br/docs/v8.0/tutorial/install-mongodb-on-ubuntu/

//sudo service mongod start   || sudo systemctl start mongod
//sudo service mongod status  || sudo systemctl status mongod
//sudo service mongod stop    || sudo systemctl stop mongod   
//sudo service mongod restart || sudo systemctl restart mongod

//Opcionalmente, você pode garantir que o MongoDB iniciará após reinicialização do sistema emitindo o seguinte comando:
//sudo systemctl enable mongod