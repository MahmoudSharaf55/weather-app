console.log('Client Side Working');

const form = document.querySelector('.weather-form');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    msg1.innerText = 'Loading..';
    msg2.innerText = '';
    const location = form['location'];
    fetch('/weather?address='+location.value).then((res) => {
        res.json().then(data => {
            if (data.error) {
                msg1.innerText = data.error;
            } else {
                msg1.innerText = data.place;
                msg2.innerText = data.weather;
            }
        })
    });
});