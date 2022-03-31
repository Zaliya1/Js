const servicesModal = () => {
    const modal = document.querySelector('.services-modal');
    const overlay = document.querySelector('.overlay');
    const btns = document.querySelectorAll('.service-button');
    const closeModal = document.querySelector('.services-modal__close');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modal.style.display = "block";
            overlay.style.display = "block";
            e.stopPropagation();
        }, true);
    });
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
};
export default servicesModal;