function loadImage(event) {
    const image = document.getElementById('profileImage');
    const placeholder = document.querySelector('.profile-photo .placeholder');

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            image.src = e.target.result;
            image.style.display = 'block';
            placeholder.style.display = 'none';
        }

        reader.readAsDataURL(event.target.files[0]);
    }
}

function redirectToHome(){
    window.location.href = "index.html";
}