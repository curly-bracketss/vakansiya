const All = document.querySelector('.all')
const AllInput = document.querySelectorAll('input')
const AllRadio = document.querySelectorAll("input[type='radio']")
const submit = document.getElementById('submit')
const isler = document.getElementById('isler')
const fileds = new Set(jobs.map(item => item.field))
const response = document.getElementById('response')
const maas = document.getElementById('maas')
const modal = document.querySelector('.modal')
const form = document.querySelector('form')
fileds.forEach(item => {
    isler.innerHTML += `<option> ${item} </option>`
})

AllInput.forEach(item => {
    item.addEventListener('input', () => {
        item.style.backgroundColor = '#E8F0FD'
    })
})

submit.addEventListener('click', (event) => {
    event.preventDefault()
    document.querySelector('section').innerHTML = ''
    let isValid = true;
    AllInput.forEach(item => {
        item.disabled = true
        if (item.value.trim() === '') {
            isValid = false;
        }
    });
    let isRadioChecked = false;
    AllRadio.forEach(item => {
        item.disabled = true
        if (item.checked) {
            isRadioChecked = true;
        }
    });
    if (!isValid || !isRadioChecked) {
        alert('Bütün informasiyaları doldurun');
        return;
    }
    All.style.opacity = '0.5'
    modal.style.display = 'flex'
    document.querySelector('section').style.display = 'none'
    response.style.display = 'none'

    setTimeout(() => {
        AllInput.forEach(item => {
            item.disabled = false
        })
        AllRadio.forEach(item => {
            item.disabled = false
        })
        All.style.opacity = '1'
        modal.style.display = 'none'
        document.querySelector('section').style.display = 'flex'
        response.style.display = 'block'

        FormData()

    }, 3000);

})


function FormData() {
    const filtered = jobs.filter(item => item.field == isler.value)
    const last = filtered.filter(item => item.salary >= maas.value)
    last.forEach(item => {

        document.querySelector('section').innerHTML +=
            `<article>
            <h3> Title: ${item.title} </h3>
            <h3> Field: ${item.field} </h3>
            <h3> Salary: ${item.salary} </h3>
        </article>`
    })
    const Ad = document.getElementById('ad').value

    AllRadio.forEach(item => {
        if (item.checked) {
            response.innerHTML = Ad + ' ' + item.value + ', sizin ucun ' + last.length + ' is tapildi!'
        }
    })
}