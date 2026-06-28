
// Simple test script to test the register endpoint

const testData = {
  username: "testuser123",
  fullName: "Test User",
  email: "testuser@example.com",
  password: "password123"
};

console.log('Testing register endpoint...');
console.log('URL: http://localhost:3000/api/auth/register');
console.log('Data:', testData);

// Use fetch to send a POST request
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testData)
})
.then(response =&gt; {
  console.log('Status:', response.status);
  return response.json();
}) 
.then(data =&gt; {
  console.log('Response:', data);
})
.catch(error =&gt; {
  console.error('Error:', error);
});
