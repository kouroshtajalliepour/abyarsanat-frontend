// ! basic template for the project pre defined components -> no need to change
export default {
    captchaRequired: "لطفا ریکپچا را تایید کنید",
    buttons: {
        advancedSearch: "جست و جوی پیشرفته",
        apply: "اعمال",
        clearFilters: "حذف فیلتر ها",
        loadMore: "بارگذاری بیشتر",
        showMore: "بیشتر",
        showLess: "بستن",
        nextPage: "صفحه ی بعد",
        previousPage: "صفحه ی قبل",
        previousFolder: "پوشه قبلی",
        log: "تاریخچه",
        submit: "ثبت",
        fileManagement: "مدیریت فایل ها",
        searchResult: "جست و جو",
        addFile: "افزودن فایل",
        createNewFolder: "ساخت پوشه ی جدید",
        pasteFile: "تايید انتقال",
        updateFile: "ویرایش نام",
        deleteFolder: "حذف پوشه",
        deleteFile: "حذف فایل",
        updateQuote: "ویرایش",
        updateLocaleQuote: "ترجمه",
        login: "ورود / ثبت‌نام",
        enter: "ورود",
        scrollToTop: "بازگشت به بالا",
        back: "بازگشت",
        logs: {
            heading: "تاریخچه",
            title: "تاریخچه ی تغییرات",
            description: "برای نمایش تاریخچه ی تغییرات این داده کلیک کنید"
        },
        delete: {
            heading: "حذف",
            title: "حذف داده",
            description: "برای حذف این داده کلیک کنید"
        }
    },
    errorPages: {
        "429": {
            title: "خطای ۴۲۹ - تعداد درخواست بیش از حد معین",
            getTimer: "این صفحه بعد از {timer} ثانیه دوباره بارگذاری میشود",
            redirecting: "در حال بارگذاری مجدد ..."
        },
        "404": {
            title: "خطای ۴۰۴ - یافت نشد",
        },
        "500": {
            title: "خطای ۵۰۰ - مشکل داخلی سرور",
        },
        "403": {
            title: "خطای ۴۰۳ - دسترسی محدود",
        },
        "record404":{
            title: "داده ای یافت نشد",
        },
        goPreviousPage: "برو به صفحه ی قبل"
    },
    table: {
        headings: {
            actions: "عملیات",
            recordsFound: "{recordsFound} داده یافت شد",
        }
    },
    forms: {
        deleteConfirmation: "متوجه ام",
        general: {
            heading: {
                delete: "هشدار: اطلاعات حذف شده قابل برگشت نمی باشند"
            },
            error: {
                required: "این فیلد اجباری است",
                unknown: "خطا ی ناشناخته",
                langIsRequired: "فیلد زبان اجباری است",
                maxSizeExceeded: "اندازه ی فایل مورد نظر نمی تواند بیشتر از {maxSize} باشد"
            },
            label: {
                langSelection: "زبان اولیه ی داده",
                predefinedImage: "عکس",
                selectedFilePreview: "برای پیش نمایش فایل کلیک کنید",
            },
            placeholder: {
                predefinedImage: "عکسی که انتخاب کنید ۱۰۰٪ عرض موجود را اشغال خواهد کرد و ارتفاع آن به صورت خودکار تنظیم خواهد شد",
            },
            loading: {
                title: "در حال بارگذاری ..."
            }
        },
        fileManagement: {
            orderBy: {
                values: {
                    createdAtAcs: "قدیمی ترین",
                    createdAtDesc: "جدید ترین",
                    slugAsc: "حروف کوچک به بزرگ",
                    slugDesc: "حروف بزرگ به کوچک",
                }
            },
            deleteFolder: {
                hint: "در صورت حذف این پوشه دیگر به آن و فایل های موجود در آن دسترسی نخواهید داشت"
            },
            deleteFile: {
                hint: "در صورت حذف این فایل دیگر به آن دسترسی نخواهید داشت"
            },
            paste: {
                hint: "این فایل به مقصد فعلی منتقل خواهد شد"
            }
        },
        logout: {
            title: "خروج از حساب کاربری",
            hint: "آیا از خروج از حساب کاربری خود اطمینان دارید ؟",
            submitButton: "بله",
        },
        editCarousel: {
            heading: "مدیریت کروسل",
            title: "ویرایش اسلاید",
            createQuote: "افزودن اسلاید جدید",
            deleteQuote: "حذف اسلاید",
            moveQuote: "جا به جایی اسلاید"
        },
        editBasicFields: {
            heading: "فیلد های اصلی",
            title: "ویرایش فیلد های اصلی",
            description: "برای نمایش و یا ویرایش فیلد های اصلی کلیک کنید"
        },
        editLocalizedFields: {
            heading: "فیلد های ترجمه شده",
            description: "برای نمایش و یا ویرایش فیلد های ترجمه شده کلیک کنید"
        },
        editPassword: {
            title: "گذرواژه",
            description: "برای ویرایش گذرواژه کلیک کنید"
        },
        createLocalizedFields: {
            description: "برای ترجمه ی این داده به زبان مذکور کلیک کنید"
        },
    }
}