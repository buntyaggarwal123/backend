// // rabbitMq.js
// const amqp = require('amqplib');

// let channel;

// // async function setupRabbitMQ() {
// //   try {
// //     const connection = await amqp.connect('amqp://localhost:15672');
// //     channel = await connection.createChannel();
// //     await channel.assertQueue('events');
// //   } catch (error) {
// //     console.error('Error setting up RabbitMQ:', error);
// //   }
// // }

// (async () => {
//     const queue = 'tasks';
//     const conn = await amqp.connect('amqp://localhost:15672');
  
//     const ch1 = await conn.createChannel();
//     await ch1.assertQueue(queue);
  
//     // Listener
//     ch1.consume(queue, (msg) => {
//       if (msg !== null) {
//         console.log('Recieved:', msg.content.toString());
//         ch1.ack(msg);
//       } else {
//         console.log('Consumer cancelled by server');
//       }
//     });
  
//     // Sender
//     const ch2 = await conn.createChannel();
  
//     setInterval(() => {
//       ch2.sendToQueue(queue, Buffer.from('something to do'));
//     }, 1000);
//   })();


// // function publishToQueue(queue, message) {
// //     //  setupRabbitMQ()
// //     console.log("queue",queue);
// //     console.log("message",message);
// //   const data = channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))).catch(err=>{console.log(err)});
// //   console.log(">>>data",data)
// // }

// function subscribeToQueue(queue, callback) {
//   channel.consume(queue, (message) => {
//     const content = JSON.parse(message.content.toString());
//     callback(content);
//     channel.ack(message);
//   });
// }

// module.exports = {
// //   setupRabbitMQ,
// //   publishToQueue,
//   subscribeToQueue,
// };
