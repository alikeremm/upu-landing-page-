/**
 * ==========================================================================
 * UPU.IO ONBOARDING & STEP SYSTEM (register.js)
 * images/ Klasörü Altındaki SVG Dosyaları Haritası
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // images/ Klasöründeki Tüm 8 Adımın Figma SVG Dosya Haritası
    const stepFilesMap = {
        1: {
            current: 'images/State=Current, Step Type=Language.svg',
            completed: 'images/State=Completed, Step Type=Language.svg',
            incomplete: 'images/State=Incomplete, Step Type=Language.svg'
        },
        2: {
            current: 'images/State=Current, Step Type=Company.svg',
            completed: 'images/State=Completed, Step Type=Company.svg',
            incomplete: 'images/State=Incomplete, Step Type=Company.svg'
        },
        3: {
            current: 'images/State=Current, Step Type=Department.svg',
            completed: 'images/State=Completed, Step Type=Department.svg',
            incomplete: 'images/State=Incomplete, Step Type=Department.svg'
        },
        4: {
            current: 'images/State=Current, Step Type=Personnel.svg',
            completed: 'images/State=Completed, Step Type=Personnel.svg',
            incomplete: 'images/State=Incomplete, Step Type=Personnel.svg'
        },
        5: {
            current: 'images/State=Current, Step Type=Internal Op..svg',
            completed: 'images/State=Completed, Step Type=Internal Op..svg',
            incomplete: 'images/State=Incomplete, Step Type=Internal Op..svg'
        },
        6: {
            current: 'images/State=Current, Step Type=External Op..svg',
            completed: 'images/State=Completed, Step Type=External Op..svg',
            incomplete: 'images/State=Incomplete, Step Type=External Op..svg'
        },
        7: {
            current: 'images/State=Current, Step Type=Equipments.svg',
            completed: 'images/State=Completed, Step Type=Equipments.svg',
            incomplete: 'images/State=Incomplete, Step Type=Equipments.svg'
        },
        8: {
            current: 'images/State=Current, Step Type=Shifts.svg',
            completed: 'images/State=Completed, Step Type=Shifts.svg',
            incomplete: 'images/State=Incomplete, Step Type=Shifts.svg'
        }
    };

    let currentStep = 1;
    let selectedLanguage = 'tr';

    const stepItems = document.querySelectorAll('.step-item');
    const btnNextStep = document.getElementById('btnNextStep');
    const langRadios = document.querySelectorAll('input[name="language"]');
    const langCards = document.querySelectorAll('.lang-card');

    // ----------------------------------------------------------------------
    // ADIM GEÇİŞ YÖNETİMİ
    // ----------------------------------------------------------------------
    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > stepItems.length) return;

        currentStep = stepNumber;

        stepItems.forEach(item => {
            const stepVal = parseInt(item.getAttribute('data-step'), 10);
            const img = item.querySelector('img');
            const files = stepFilesMap[stepVal];

            item.classList.remove('active', 'completed');

            if (stepVal === currentStep) {
                item.classList.add('active'); // AKTİF DURUM
                if (img && files) {
                    img.src = files.current || files.incomplete;
                }
            } else if (stepVal < currentStep) {
                item.classList.add('completed'); // TAMAMLANMIŞ DURUM
                if (img && files) {
                    img.src = files.completed || files.incomplete;
                }
            } else {
                // PASİF DURUM
                if (img && files) {
                    img.src = files.incomplete;
                }
            }
        });

        // Sayfa İçeriğini Değiştir (SPA View Switcher)
        const allStepViews = document.querySelectorAll('.step-view');
        allStepViews.forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`step-${currentStep}`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Belirli adımlarda alt fabrika görselini soluklaştır
        const factoryImg = document.querySelector('.factory-illustration-img');
        const fadedSteps = [2]; // İleride soluk olmasını istediğin sayfa numaralarını buraya ekleyebilirsin
        
        if (factoryImg) {
            if (fadedSteps.includes(currentStep)) {
                factoryImg.style.opacity = '0.4'; // Soluk (%40 Opaklık)
            } else {
                factoryImg.style.opacity = '1';   // Normal (%100 Opaklık)
            }
        }

        // Sağ Alt Yüzen Firma Logosu Rozeti Yönetimi (Step >= 3 iken göster)
        const floatingBadge = document.getElementById('floatingCompanyBadge');
        if (floatingBadge) {
            if (currentStep >= 3) {
                floatingBadge.style.display = 'flex';
            } else {
                floatingBadge.style.display = 'none';
            }
        }
    }

    // Tıklama Dinleyicisi
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepVal = parseInt(item.getAttribute('data-step'), 10);
            goToStep(stepVal);
        });
    });

    // Dil Seçim Formu
    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedLanguage = e.target.value;

            langCards.forEach(card => {
                const cardRadio = card.querySelector('input[type="radio"]');
                if (cardRadio && cardRadio.checked) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });

    // Buton Dinleyicileri
    if (btnNextStep) {
        btnNextStep.addEventListener('click', () => {
            goToStep(2);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-next')) {
            goToStep(currentStep + 1);
        } else if (e.target.classList.contains('btn-prev')) {
            goToStep(currentStep - 1);
        }
    });

    // İlk Yükleme
    goToStep(1);

    // ----------------------------------------------------------------------
    // SOL ALT KÜRE BUTONUNA TIKLANINCA AÇILAN DİL SEÇİM POPUP'I
    // ----------------------------------------------------------------------
    const globeBtn = document.getElementById('globeBtn');
    const langPopup = document.getElementById('langPopup');

    if (globeBtn && langPopup) {
        globeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langPopup.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!langPopup.contains(e.target) && e.target !== globeBtn) {
                langPopup.classList.remove('open');
            }
        });

        const popupOptions = langPopup.querySelectorAll('.lang-popup-option');
        popupOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                popupOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                langPopup.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // FİRMA LOGOSU YÜKLEME VE CANLI ÖNİZLEME (Logo Upload & Preview)
    // ----------------------------------------------------------------------
    const logoUploadBox = document.getElementById('logoUploadBox');
    const logoFileInput = document.getElementById('logoFileInput');
    const logoPreviewBox = document.getElementById('logoPreviewBox');
    const logoTitleText = document.getElementById('logoTitleText');

    if (logoUploadBox && logoFileInput) {
        logoUploadBox.addEventListener('click', () => {
            logoFileInput.click();
        });

        logoFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    logoPreviewBox.innerHTML = `<img src="${event.target.result}" alt="Logo" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
                    logoPreviewBox.style.border = 'none';
                    if (logoTitleText) {
                        logoTitleText.textContent = file.name.length > 16 ? file.name.substring(0, 13) + '...' : file.name;
                    }
                    // Sağ alt yüzen rozet görselini güncelle
                    const badgeLogoImg = document.getElementById('badgeLogoImg');
                    if (badgeLogoImg) {
                        badgeLogoImg.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
