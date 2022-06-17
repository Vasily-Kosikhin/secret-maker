import './index.scss';

const app = document.querySelector('.app');
const disposableButton = document.querySelector('#disposable');
const reusableButton = document.querySelector('#reusable');
const requestBody = document.querySelector<HTMLInputElement>('#secretBody');
const container = document.querySelector<HTMLElement>('.container');

const serverUrl = 'http://localhost:7000/api/secret/create';

function showSecretUrl(url: string) {
  container!.style.display = 'none';
  const requestContainer = document.createElement('div');
  requestContainer.classList.add('requestContainer');
  requestContainer.innerHTML = 'Your sercets available on:';
  app!.append(requestContainer);

  const requestUrl = document.createElement('a');
  requestUrl.innerHTML = 'Super secret adress';
  requestUrl.href = url;
  requestContainer.append(requestUrl);
}

async function makeRequest(reusability: boolean) {
  if (!requestBody?.value) {
    alert('You cant send empty request');
    return;
  }
  const secret = { text: `${requestBody.value}`, reusable: reusability };

  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(secret)
  });
  const json = await response.json();
  showSecretUrl(json);
  requestBody.value = '';
}

disposableButton!.addEventListener('click', () => makeRequest(false));

reusableButton!.addEventListener('click', () => makeRequest(true));
