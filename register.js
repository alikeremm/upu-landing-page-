/**
 * ==========================================================================
 * UPU.IO ONBOARDING & STEP SYSTEM (register.js)
 * Dil Çeviri (i18n) & İki Yönlü Entegrasyon Sistemi
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. DİL ÇEVİRİ SÖZLÜĞÜ (TR & EN Translation Dictionary)
    // ----------------------------------------------------------------------
    const translations = {
        tr: {
            welcome_text: "'ya hoşgeldiniz.",
            welcome_sub: "Kaydınızı oluşturmanız ve upu.io'yu kullanabilmeniz için gerekli adımları tamamlamanız gerekmektedir. Adımları tamamlamak için uygun dili seçin ve \"Başla\" butonuna tıklayın.",
            btn_start: "Başla",
            step2_title: "Firma Oluştur",
            company_logo: "Firma Logosu",
            upload_image: "Resim yükle",
            company_name: "Firma Adı",
            company_address: "Firma Adresi",
            company_email: "Firma E-Posta",
            company_phone: "Firma Telefonu",
            fiscal_year_start: "Mali Yıl Başlangıç Tarihi",
            authorized_name: "Yetkili Adı",
            authorized_email: "Yetkili E-Posta",
            authorized_phone: "Yetkili Telefonu",
            tax_office: "Vergi Dairesi",
            tax_number: "Vergi Numarası",
            solution_packages: "Çözüm Paketleri",
            country: "Ülke",
            timezone: "Zaman Dilimi",
            equipment_credit: "Ekipman Kredisi",
            personnel_credit: "Personel Kredisi",
            day_start_hour: "Gün Başlangıç Saati",
            t1_standard: "T1 Standart",
            btn_prev: "Önceki",
            btn_next: "Sonraki",
            step3_title: "Departman Ekle",
            step3_sub: "Firmanızda çalışan personelleri eklemeden önce; muhasebe, insan kaynakları, üretim gibi departmanları oluşturarak yönetim kolaylığı sağlayabilirsiniz.",
            step4_title: "Personel Ekle",
            step4_sub: "Firmanızda çalışan personellerinizi ekleyebilir, oluşturduğunuz departmanlara atayabilirsiniz.",
            btn_add: "Ekle",
            modal_dept_title: "Yeni Departman Ekle",
            modal_dept_name: "Departman Adı",
            modal_tag_label: "Etiket",
            btn_cancel: "Vazgeç",
            btn_save: "Kaydet"
        },
        en: {
            welcome_text: "Welcome to ",
            welcome_sub: "To create your registration and use upu.io, you need to complete the required steps. Please select a suitable language to begin and click \"Start\".",
            btn_start: "Start",
            step2_title: "Create Company",
            company_logo: "Company Logo",
            upload_image: "Upload image",
            company_name: "Company Name",
            company_address: "Company Address",
            company_email: "Company Email",
            company_phone: "Company Phone",
            fiscal_year_start: "Fiscal Year Start Date",
            authorized_name: "Authorized Person Name",
            authorized_email: "Authorized Person Email",
            authorized_phone: "Authorized Person Phone",
            tax_office: "Tax Office",
            tax_number: "Tax Number",
            solution_packages: "Solution Packages",
            country: "Country",
            timezone: "Timezone",
            equipment_credit: "Equipment Credit",
            personnel_credit: "Personnel Credit",
            day_start_hour: "Day Start Hour",
            t1_standard: "T1 Standard",
            btn_prev: "Previous",
            btn_next: "Next",
            step3_title: "Add Department",
            step3_sub: "Before adding personnel working in your company, you can create departments such as accounting, human resources, production to provide management convenience.",
            step4_title: "Add Personnel",
            step4_sub: "You can add personnel working in your company and assign them to the departments you have created.",
            btn_add: "Add",
            modal_dept_title: "Add New Department",
            modal_dept_name: "Department Name",
            modal_tag_label: "Tag",
            btn_cancel: "Cancel",
            btn_save: "Save"
        }
    };

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
    let currentLang = 'tr';
    let uploadedCompanyLogo = null;

    const stepItems = document.querySelectorAll('.step-item');
    const btnNextStep = document.getElementById('btnNextStep');
    const langRadios = document.querySelectorAll('input[name="language"]');
    const langCards = document.querySelectorAll('.lang-card');
    const globeBtn = document.getElementById('globeBtn');
    const langPopup = document.getElementById('langPopup');

    // ----------------------------------------------------------------------
    // 2. DİL DEĞİŞTİRME VE ÇİFT YÖNLÜ SENKRONİZASYON (Entegrasyon)
    // ----------------------------------------------------------------------
    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;

        // A) 1. Adımdaki Kartları & Radio Butonlarını Senkronize Et
        langCards.forEach(card => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                if (radio.value === lang) {
                    radio.checked = true;
                    card.classList.add('active');
                } else {
                    radio.checked = false;
                    card.classList.remove('active');
                }
            }
        });

        // B) Sol Alt Küre Pop-up Seçeneklerini Senkronize Et
        if (langPopup) {
            const popupOptions = langPopup.querySelectorAll('.lang-popup-option');
            popupOptions.forEach(opt => {
                const optLang = opt.getAttribute('data-lang');
                if (optLang === lang) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }

        // C) Sayfadaki Tüm Metinleri (data-i18n) Çevir
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // D) Sayfadaki Tüm Placeholder'ları (data-i18n-placeholder) Çevir
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    // 1. Adım Dil Kartları Tıklama Dinleyicileri
    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    });

    langCards.forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                setLanguage(radio.value);
            }
        });
    });

    // Sol Alt Küre Butonuna Tıklanınca Açılan Pop-up Menü
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
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = opt.getAttribute('data-lang');
                setLanguage(selectedLang);
                langPopup.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. ADIM GEÇİŞ YÖNETİMİ (?)
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
        const fadedSteps = [2]; 
        
        if (factoryImg) {
            if (fadedSteps.includes(currentStep)) {
                factoryImg.style.opacity = '0.4'; // Soluk (%40 Opaklık ve z index i az olacak) 
            } else {
                factoryImg.style.opacity = '1';   // Normal (%100 Opaklık)
            }
        }

        // Sağ Alt Yüzen Firma Logosu Rozeti Yönetimi (Step >= 3 VE resim yüklenmişse göster)
        const floatingBadge = document.getElementById('floatingCompanyBadge');
        if (floatingBadge) {
            if (currentStep >= 3 && uploadedCompanyLogo) {
                floatingBadge.style.display = 'flex';
            } else {
                floatingBadge.style.display = 'none';
            }
        }

        // Sol Alt Butonlar (Globe & Çıkış) Görünürlüğü (Step 1'de tamamen gizli, Step >= 2 iken göster)
        const floatingLeftActions = document.querySelector('.floating-left-actions');
        if (floatingLeftActions) {
            if (currentStep === 1) {
                floatingLeftActions.style.display = 'none';
                if (langPopup) langPopup.classList.remove('open');
            } else {
                floatingLeftActions.style.display = 'flex';
            }
        }
    }

    // Tıklama Dinleyicisi (Header Adımları)
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepVal = parseInt(item.getAttribute('data-step'), 10);
            goToStep(stepVal);
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

    // ----------------------------------------------------------------------
    // 4. FİRMA LOGOSU YÜKLEME VE CANLI ÖNİZLEME KISMIs
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
                    uploadedCompanyLogo = event.target.result;
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

    // ----------------------------------------------------------------------
    // 5. YENİ DEPARTMAN EKLE VE DİNAMİK LİSTE YÖNETİMİ (Dynamic Department System)
    // ----------------------------------------------------------------------
    let departmentsData = [];
    let maxDepartments = 4; // Varsayılan Başlangıç Limiti: 4
    let editingDeptId = null;

    const btnAddDepartment = document.getElementById('btnAddDepartment');
    const btnAddNewDept = document.getElementById('btnAddNewDept');
    const departmentModal = document.getElementById('departmentModal');
    const closeDeptModalBtn = document.getElementById('closeDeptModalBtn');
    const cancelDeptModalBtn = document.getElementById('cancelDeptModalBtn');
    const saveDeptModalBtn = document.getElementById('saveDeptModalBtn');
    const modalDeptNameInput = document.getElementById('modalDeptNameInput');
    const modalTagInput = document.getElementById('modalTagInput');
    const modalTagColorPicker = document.getElementById('modalTagColorPicker');
    const colorWheelBtn = document.getElementById('colorWheelBtn');
    const addTagBtn = document.getElementById('addTagBtn');
    const modalTagsContainer = document.getElementById('modalTagsContainer');
    
    const deptEmptyView = document.getElementById('deptEmptyView');
    const deptListView = document.getElementById('deptListView');
    const deptItemsList = document.getElementById('deptItemsList');
    const deptCountBadge = document.getElementById('deptCountBadge');
    const deptSearchInput = document.getElementById('deptSearchInput');

    function renderDepartments(filterQuery = '') {
        if (!deptEmptyView || !deptListView || !deptItemsList || !deptCountBadge) return;

        // Sayı Rozeti & Kredi Limiti Yönetimi (Figma Red/Purple State)
        deptCountBadge.textContent = `${departmentsData.length}/${maxDepartments} Departman`;

        if (departmentsData.length >= maxDepartments) {
            deptCountBadge.classList.add('limit-reached'); // Kırmızı Warning Pill
            if (btnAddNewDept) {
                btnAddNewDept.className = 'btn-buy-dept-credit';
                btnAddNewDept.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg> <span>Ek Departman Kredisi Satın Al</span>`;
            }
        } else {
            deptCountBadge.classList.remove('limit-reached'); // Mor Normal Pill
            if (btnAddNewDept) {
                btnAddNewDept.className = 'btn-add-new-dept';
                btnAddNewDept.innerHTML = `<span class="plus-sign">+</span><span>Yeni Departman Ekle</span>`;
            }
        }

        if (departmentsData.length === 0) {
            deptEmptyView.style.display = 'flex';
            deptListView.style.display = 'none';
        } else {
            deptEmptyView.style.display = 'none';
            deptListView.style.display = 'flex';

            // Arama filtresine göre filtrele
            const filtered = departmentsData.filter(d => 
                d.name.toLowerCase().includes(filterQuery.toLowerCase())
            );

            deptItemsList.innerHTML = '';
            filtered.forEach(dept => {
                const card = document.createElement('div');
                card.className = 'dept-item-card';
                card.innerHTML = `
                    <span class="dept-name-text">${dept.name}</span>
                    <div class="dept-item-actions">
                        <button type="button" class="dept-action-btn edit-btn" data-id="${dept.id}" title="Düzenle">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button type="button" class="dept-action-btn delete-btn" data-id="${dept.id}" title="Sil">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9381E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `;
                deptItemsList.appendChild(card);
            });
        }
    }

    function openModal(editId = null) {
        editingDeptId = editId;

        // Modal Input ve Etiketlerini Temizle
        if (modalDeptNameInput) modalDeptNameInput.value = '';
        if (modalTagInput) modalTagInput.value = '';
        if (modalTagsContainer) modalTagsContainer.innerHTML = '';

        if (editId) {
            // Düzenleme Modu: Seçili departmanın adı ve etiketlerini yükle
            const target = departmentsData.find(d => d.id === editId);
            if (target) {
                if (modalDeptNameInput) modalDeptNameInput.value = target.name;
                if (target.tags && Array.isArray(target.tags) && modalTagsContainer) {
                    target.tags.forEach(tag => {
                        const pill = document.createElement('span');
                        pill.className = 'tag-pill';
                        pill.style.backgroundColor = tag.color;
                        pill.innerHTML = `${tag.text} <button type="button" class="tag-remove">&times;</button>`;
                        modalTagsContainer.appendChild(pill);
                    });
                }
            }
        }
        if (departmentModal) departmentModal.classList.add('active');
    }

    function closeModal() {
        editingDeptId = null;
        if (departmentModal) departmentModal.classList.remove('active');
    }

    if (btnAddDepartment) btnAddDepartment.addEventListener('click', () => openModal());
    if (btnAddNewDept) {
        btnAddNewDept.addEventListener('click', () => {
            if (departmentsData.length >= maxDepartments) {
                // Kredi Satın Al Modu: Limiti 4'ten 10'a çıkarır
                maxDepartments = 10;
                renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            } else {
                openModal();
            }
        });
    }
    if (closeDeptModalBtn) closeDeptModalBtn.addEventListener('click', closeModal);
    if (cancelDeptModalBtn) cancelDeptModalBtn.addEventListener('click', closeModal);
    if (departmentModal) {
        departmentModal.addEventListener('click', (e) => {
            if (e.target === departmentModal) closeModal();
        });
    }

    // Arama Dinleyicisi
    if (deptSearchInput) {
        deptSearchInput.addEventListener('input', (e) => {
            renderDepartments(e.target.value);
        });
    }

    // Silme ve Düzenleme Tıklamaları
    if (deptItemsList) {
        deptItemsList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            const editBtn = e.target.closest('.edit-btn');

            if (deleteBtn) {
                const id = parseInt(deleteBtn.getAttribute('data-id'), 10);
                departmentsData = departmentsData.filter(d => d.id !== id);
                renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            } else if (editBtn) {
                const id = parseInt(editBtn.getAttribute('data-id'), 10);
                openModal(id);
            }
        });
    }

    // Renk Çarkına Tıklayınca Gizli Color Picker'ı Aç
    if (colorWheelBtn && modalTagColorPicker) {
        colorWheelBtn.addEventListener('click', () => {
            modalTagColorPicker.click();
        });
    }

    // Etiket Ekleme Mantığı
    function addNewTag() {
        if (!modalTagInput || !modalTagsContainer) return;
        const tagText = modalTagInput.value.trim();
        if (!tagText) return;

        const tagColor = modalTagColorPicker ? modalTagColorPicker.value : '#7C5CFC';
        const newPill = document.createElement('span');
        newPill.className = 'tag-pill';
        newPill.style.backgroundColor = tagColor;
        newPill.innerHTML = `${tagText} <button type="button" class="tag-remove">&times;</button>`;

        modalTagsContainer.appendChild(newPill);
        modalTagInput.value = '';
    }

    if (addTagBtn) addTagBtn.addEventListener('click', addNewTag);
    if (modalTagInput) {
        modalTagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addNewTag();
            }
        });
    }

    // Etiket Silme Mantığı ???
    if (modalTagsContainer) {
        modalTagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-remove')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Departman Kaydetme Mantığı (Özel Etiket Dizi Desteğiyle)
    if (saveDeptModalBtn) {
        saveDeptModalBtn.addEventListener('click', () => {
            let name = modalDeptNameInput ? modalDeptNameInput.value.trim() : '';
            if (!name) {
                const tagVal = modalTagInput ? modalTagInput.value.trim() : '';
                name = tagVal || 'Yeni Departman';
            }

            // Modal İçi Etiketleri Topla
            const currentTags = [];
            if (modalTagsContainer) {
                const pills = modalTagsContainer.querySelectorAll('.tag-pill');
                pills.forEach(pill => {
                    const tagText = pill.childNodes[0].textContent.trim();
                    const tagColor = pill.style.backgroundColor || '#7C5CFC';
                    currentTags.push({ text: tagText, color: tagColor });
                });
            }

            if (editingDeptId) {
                // Düzenleme Modu: Sadece o departmanın bilgilerini güncelle
                const target = departmentsData.find(d => d.id === editingDeptId);
                if (target) {
                    target.name = name;
                    target.tags = currentTags;
                }
            } else {
                // Yeni Ekleme Modu: Departmana özel unique etiket listesiyle ekle
                departmentsData.push({
                    id: Date.now(),
                    name: name,
                    tags: currentTags
                });
            }

            renderDepartments(deptSearchInput ? deptSearchInput.value : '');
            closeModal();
        });
    }

    // İlk Yükleme
    setLanguage('tr');
    renderDepartments();
    goToStep(1);

});
