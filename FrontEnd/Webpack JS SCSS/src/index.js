import './index.scss';

const app = document.querySelector('.app');
const disposableButton = document.querySelector('#disposable');
const reusableButton = document.querySelector('#reusable');
const requestBody = document.querySelector('#secretBody');
const container = document.querySelector(`.container`);
const secretTypes = {
  reusable: 'makeReusableSecret/',
  disposable: 'makeDisposableSecret',
};
const serverUrl = 'http://localhost:7000/api/';

function showSecretUrl(url) {
  container.style.display = `none`;
  const requestContainer = document.createElement(`div`);
  requestContainer.classList.add(`requestContainer`);
  requestContainer.innerHTML = `Your sercets available on:`;
  app.append(requestContainer);

  const requestUrl = document.createElement(`a`);
  requestUrl.innerHTML = `Super secret adress`;
  requestUrl.href = url;
  requestContainer.append(requestUrl);
}
async function makeRequest(type) {
  if (!requestBody.value) {
    alert(`You cant send empty request`);
    return;
  }
  const secret = { secret: `${requestBody.value}` };
  const requestUrl = serverUrl + type;

  let response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(secret),
  });
  console.log(`POST request send on ${serverUrl}`);
  let json = await response.json();
  showSecretUrl(json);
  requestBody.value = ``;
}

disposableButton.addEventListener(`click`, () =>
  makeRequest(secretTypes.disposable)
);

reusableButton.addEventListener(`click`, () =>
  makeRequest(secretTypes.reusable)
);
