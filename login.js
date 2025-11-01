document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const alertBox = document.getElementById('alertMessage');

    // **GÜVENLİK UYARISI: Statik şifre kontrolü sadece test amaçlıdır.**
    const validUsername = "tracadmin@trac.org.tr";
    const validPassword = "admin1234"; 

    if (email === validUsername && password === validPassword) {
        // Giriş Başarılı: Panel sayfasına yönlendir
        alertBox.classList.add('d-none');
        window.location.href = "dashboard.html"; 
    } else {
        // Giriş Başarısız: Hata mesajı göster
        alertBox.textContent = "E-Posta veya şifre hatalı.";
        alertBox.classList.remove('d-none');
    }
});