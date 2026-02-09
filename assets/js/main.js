        // Модальное окно
        const modal = document.getElementById('registrationModal');
        const modalClose = document.getElementById('modalClose');
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        const registrationForm = document.getElementById('registrationForm');
        const successMessage = document.getElementById('successMessage');
        
        // Открытие модалки
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Закрытие модалки
        modalClose.addEventListener('click', () => {
            closeModal();
        });
        
        // Закрытие при клике на фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Закрытие на Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Функция закрытия модалки
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Отправка формы
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value;
            const userPhone = document.getElementById('userPhone').value;
            
            // Валидация номера телефона (простая)
            if (!userPhone.match(/^[\+]?[0-9\s\-\(\)]+$/)) {
                alert("Iltimos, to'g'ri telefon raqamini kiriting!");
                return;
            }
            
            // Показываем анимацию отправки
            const submitBtn = registrationForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;
            
            // Имитация отправки на сервер
            setTimeout(() => {
                // Скрываем форму и показываем успешное сообщение
                registrationForm.style.display = 'none';
                successMessage.classList.add('active');
                
                // Сброс формы
                registrationForm.reset();
                
                // Автоматическое закрытие через 3 секунды
                setTimeout(() => {
                    closeModal();
                    // Возвращаем форму обратно
                    registrationForm.style.display = 'flex';
                    successMessage.classList.remove('active');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
                // Здесь можно добавить реальную отправку на сервер
                console.log('Отправлены данные:', { name: userName, phone: userPhone });
                
            }, 1500);
        });
        
        // Floating elements animation
        document.addEventListener('DOMContentLoaded', function() {
            // Create floating elements
            const heroSection = document.querySelector('.hero');
            for (let i = 0; i < 15; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 10 + 5;
                
                // Random animation delay
                const delay = Math.random() * 5;
                
                element.style.left = `${posX}%`;
                element.style.top = `${posY}%`;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.animationDelay = `${delay}s`;
                
                heroSection.appendChild(element);
            }
            
            // Create decorative lines
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const line = document.createElement('div');
                line.classList.add('line');
                
                // Random position and size
                const posX = Math.random() * 100;
                const width = Math.random() * 30 + 10;
                
                line.style.top = `${Math.random() * 100}%`;
                line.style.left = `${posX}%`;
                line.style.width = `${width}%`;
                line.style.opacity = Math.random() * 0.3 + 0.1;
                
                section.appendChild(line);
            });
            
            // Add animation to floating elements
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach(element => {
                // Animate floating
                animateFloat(element);
            });
            
            // Button click animation
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    // Remove ripple after animation
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Scroll animation for stream items
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);
            
            const streamItems = document.querySelectorAll('.stream-item');
            streamItems.forEach(item => {
                observer.observe(item);
            });
        });
        
        function animateFloat(element) {
            // Random movement
            const moveX = Math.random() * 40 - 20;
            const moveY = Math.random() * 40 - 20;
            const duration = Math.random() * 10 + 10;
            
            // Apply animation
            element.style.animation = `float ${duration}s infinite ease-in-out`;
            
            // Create keyframes for floating animation
            const styleSheet = document.styleSheets[0];
            const floatKeyframes = `
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(${moveX}px, ${moveY}px) rotate(120deg); }
                    66% { transform: translate(${-moveX/2}px, ${-moveY/2}px) rotate(240deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
            `;
            
            // Only add if not already added
            if (!document.querySelector('#float-animation')) {
                const style = document.createElement('style');
                style.id = 'float-animation';
                style.textContent = floatKeyframes;
                document.head.appendChild(style);
            }
        }
        
        // Add ripple effect styles
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        // Анимация для плавающих label в модалке
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.querySelector('.form-label').classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.querySelector('.form-label').classList.remove('focused');
                }
            });
            
            // Проверка при загрузке страницы
            if (input.value) {
                input.parentElement.querySelector('.form-label').classList.add('focused');
            }
        });






















        // Конфигурация
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJl9ZUOBrxrLGcupImhxvLdn5qRUflahkn9ygM0Y-JobW6-gqMNuK8sL0aXQxojgu0/exec';
const TELEGRAM_CHANNEL_URL = 'https://t.me/+i_SeI4k5vZ9jY2Ri';

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;
    
    if (!userName.trim()) {
        alert("Iltimos, ismingizni kiriting!");
        return;
    }
    
    // Меняем текст кнопки
    const submitBtn = registrationForm.querySelector('.form-submit');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Telegramga o\'tish...';
    
    // Отправляем данные в Google Sheets (асинхронно, не ждем)
    const params = new URLSearchParams({name: userName, phone: userPhone});
    fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
    });
    
    // Сразу переходим в Telegram
    setTimeout(() => {
        window.open(TELEGRAM_CHANNEL_URL, '_blank');
        closeModal();
    }, 300);
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        registrationForm.reset();
        const submitBtn = registrationForm.querySelector('.form-submit');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Yuborish';
        submitBtn.disabled = false;
        document.querySelectorAll('.form-label').forEach(label => {
            label.classList.remove('focused');
        });
    }, 300);
}