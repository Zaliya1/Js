const headerModal = () => {
    const buttons = document.querySelectorAll('a[href="#callback"]');
    const modal = document.querySelector('.header-modal');
    const overlay = document.querySelector('.overlay');
    const closeModal = document.querySelector('.header-modal__close');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    });
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        overlay.style.display = "none"
    });
};
export default headerModal;