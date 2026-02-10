// Создаем анимированные точки
function createBackgroundDots() {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'animated-bg';
    
    // Создаем 15 точек
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.className = 'bg-dot';
        
        // Случайные параметры
        const size = Math.random() * 60 + 20; // от 20px до 80px
        const posX = Math.random() * 100; // от 0% до 100%
        const posY = Math.random() * 100;
        const delay = Math.random() * 5; // задержка от 0 до 5 секунд
        const duration = 15 + Math.random() * 10; // длительность от 15 до 25 секунд
        
        // Устанавливаем стили
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        dot.style.animationDelay = `${delay}s`;
        dot.style.animationDuration = `${duration}s`;
        dot.style.backgroundColor = `rgba(213, 0, 0, ${Math.random() * 0.1 + 0.03})`;
        
        bgContainer.appendChild(dot);
    }
    
    // Добавляем в header
    document.querySelector('header').appendChild(bgContainer);
}

// URL для отправки данных в Google Sheets и Telegram канал
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJl9ZUOBrxrLGcupImhxvLdn5qRUflahkn9ygM0Y-JobW6-gqMNuK8sL0aXQxojgu0/exec';
const TELEGRAM_CHANNEL_URL = 'https://t.me/+i_SeI4k5vZ9jY2Ri';

document.addEventListener('DOMContentLoaded', function() {
    createBackgroundDots();
    
    // Модальное окно формы регистрации
    const registrationModalOverlay = document.getElementById('registrationModalOverlay');
    const closeRegistrationModal = document.getElementById('closeRegistrationModal');
    const registrationForm = document.getElementById('registrationForm');
    
    // Открытие модалки при клике на любую кнопку регистрации
    const registrationButtons = document.querySelectorAll('.cta-button, .author-info-cta-button, .program-cta-button');
    
    registrationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    });
    
    // Функция открытия модалки
    function openRegistrationModal() {
        registrationModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Сбрасываем форму при каждом открытии
        registrationForm.reset();
        
        // Фокус на первое поле
        setTimeout(() => {
            document.getElementById('userName').focus();
        }, 300);
    }
    
    // Закрытие модалки
    closeRegistrationModal.addEventListener('click', closeRegistrationModalFunc);
    registrationModalOverlay.addEventListener('click', function(e) {
        if (e.target === registrationModalOverlay) {
            closeRegistrationModalFunc();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && registrationModalOverlay.classList.contains('active')) {
            closeRegistrationModalFunc();
        }
    });
    
    // Обработка отправки формы
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения полей
        const userName = document.getElementById('userName').value.trim();
        const userPhone = document.getElementById('userPhone').value.trim();
        const cleanPhone = userPhone.replace(/\D/g, '');
        
        // Меняем текст кнопки
        const submitBtn = registrationForm.querySelector('.submit-button');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Jo\'natilmoqda...';
        submitBtn.disabled = true;
        
        // Отправляем данные в Google Sheets
        const params = new URLSearchParams({
            name: userName, 
            phone: cleanPhone,
            source: 'Ona tili webinar',
            date: new Date().toLocaleString('uz-UZ')
        });
        
        // Отправляем запрос в Google Sheets
        fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
            method: 'GET',
            mode: 'no-cors'
        }).catch(error => {
            console.log('Данные отправлены в Google Sheets');
        });
        
        // Сразу переходим в Telegram
        setTimeout(() => {
            // Закрываем модалку
            closeRegistrationModalFunc();
            
            // Открываем Telegram в новой вкладке
            window.open(TELEGRAM_CHANNEL_URL, '_blank');
            
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 300);
    });
    
    // Функция закрытия модалки
    function closeRegistrationModalFunc() {
        registrationModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Простой ввод телефона - только цифры
    const phoneInput = document.getElementById('userPhone');
    
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Код для модалки сертификатов
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalStudentName = document.getElementById('modalStudentName');
    const modalCertificateGrade = document.getElementById('modalCertificateGrade');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    let currentIndex = 0;
    const resultItems = document.querySelectorAll('.result-item');
    const resultItemsArray = Array.from(resultItems);
    
    resultItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            currentIndex = index;
            openModal(index);
        });
    });
    
    function openModal(index) {
        const item = resultItemsArray[index];
        const imgSrc = item.querySelector('.certificate-img').src;
        const studentName = item.querySelector('.student-name').textContent;
        const certificateGrade = item.querySelector('.certificate-grade').textContent;
        
        modalImg.src = imgSrc;
        modalStudentName.textContent = studentName;
        modalCertificateGrade.textContent = certificateGrade;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModalFunc();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModalFunc();
        }
        if (e.key === 'ArrowLeft' && modalOverlay.classList.contains('active')) {
            navigate(-1);
        }
        if (e.key === 'ArrowRight' && modalOverlay.classList.contains('active')) {
            navigate(1);
        }
    });
    
    prevButton.addEventListener('click', function() {
        navigate(-1);
    });
    
    nextButton.addEventListener('click', function() {
        navigate(1);
    });
    
    function navigate(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = resultItemsArray.length - 1;
        } else if (currentIndex >= resultItemsArray.length) {
            currentIndex = 0;
        }
        
        openModal(currentIndex);
    }
    
    function closeModalFunc() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Анимация появления элементов при загрузке
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.date-container, .main-text, .subtitle, .author-image-wrapper, .certificate-box, .cta-button');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Анимация появления карточек результатов
        const resultCards = document.querySelectorAll('.result-item');
        resultCards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 + index * 0.1}s`;
        });
    });
});