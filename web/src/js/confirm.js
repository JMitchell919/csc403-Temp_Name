document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitConfirmation').addEventListener('click', function() {
        
        const confirmationNumber = document.getElementById('confirm-number-input').value;

        // Check if the entered confirmation number matches "12345"
        if (confirmationNumber === '12345') {
            // Redirect to login page
            window.location.href = 'login.html';
        } else {
            alert('Incorrect confirmation number. Please try again.');
        }
    });
});
   
// 
//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
//<script>
//   emailjs.init("YOUR_USER_ID");  // Initialize with your EmailJS user ID
//</script>                                                              
//
