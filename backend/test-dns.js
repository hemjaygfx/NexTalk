
import dns from 'dns';

console.log('Testing DNS resolution in Node.js...');

// Test 1: Using default dns.resolveSrv
console.log('\n1. Testing dns.resolveSrv:');
dns.resolveSrv('_mongodb._tcp.cluster0.ibgkbbb.mongodb.net', function(err, addresses) {
  if (err) {
    console.error('   ERROR:', err);
  } else {
    console.log('   SUCCESS:', addresses);
  }
});

// Test 2: Using Resolver with specific DNS servers
console.log('\n2. Testing with Google DNS (8.8.8.8):');
const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '8.8.4.4']);
resolver.resolveSrv('_mongodb._tcp.cluster0.ibgkbbb.mongodb.net', function(err, addresses) {
  if (err) {
    console.error('   ERROR:', err);
  } else {
    console.log('   SUCCESS:', addresses);
  }
});
