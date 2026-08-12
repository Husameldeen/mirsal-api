console.log('helloooo from frontend');

const submit = document.getElementById('form');

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email, password);
  fetch('http://localhost:5000/users/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      if (user) {
        console.log(user);
      }
    })
    .catch((err) => console.log(err));
});

const redirect = document.getElementById('redirect');

redirect.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicked');
  fetch('http://localhost:5000/users/me', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      // authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      if (user) {
        console.log(user);
      }
    })
    .catch((err) => console.log(err));
});
