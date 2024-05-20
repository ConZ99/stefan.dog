document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Basic validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields.');
            event.preventDefault();
        } else if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
        } else {
            const templateParams = {
                'from_name': nameInput.value,
                'from_email': emailInput.value,
                'message': messageInput.value
            };
            emailjs.send('service_qj4w8cj', 'template_tsit2ib', templateParams)
            .then(() => {
                console.log('SUCCESS!');
                console.log(templateParams);
            }, (error) => {
                console.log('FAILED...', error);
            });
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});