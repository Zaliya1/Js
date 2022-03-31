const certificate = () => {
    const documentOverlays = document.querySelectorAll('.document-overlay');
    const overlay = document.querySelector('.overlay');
    const certificates = document.querySelectorAll('.sertificate-document');
    const modal = document.querySelector('.certificate-modal');
    const closeBtn = document.querySelector('.certificate-modal__close')

    documentOverlays.forEach(documentOverlay => {
        documentOverlay.style.width = "200px";
        documentOverlay.style.left = "25%";

        documentOverlay.addEventListener('mouseover', () => {
            documentOverlay.style.opacity = 1;
        });
        documentOverlay.addEventListener('mouseout', () => {
            documentOverlay.style.opacity = 0;
        });
    });
    certificates.forEach(certificate => {
        certificate.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.style.display = "block";
            modal.style.display = "block";
            const img = certificate.getAttribute('href');
            modal.style.backgroundImage = `url(${img})`;
        });
        closeBtn.addEventListener('click', () => {
            overlay.style.display = "none";
            modal.style.display = "none";
        });
    });  
        
    

};
export default certificate;