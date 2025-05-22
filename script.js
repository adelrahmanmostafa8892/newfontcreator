// دالة لتوليد UUID بسيط
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// دالة لضمان تحميل جميع الخطوط
function loadAllFonts() {
    return document.fonts.ready;
}

// تعريف القوالب الافتراضية
const TEMPLATES = {
    classic: {
        name: 'classic',
        itemBackground: '#ffffff',
        numberColor: '#111827',
        badgeColor: '#3b82f6',
        badgeTextColor: '#ffffff',
        border: '#d1d5db',
        gridBackground: '#f3f4f6',
        introText1Color: '#111827',
        introText2Color: '#111827',
        introTextExtraColor: '#111827',
        gridItemStyle: 'default',
        badgeStyle: 'circle',
        itemMarginBottom: 0,
        paddingRight: 0,
        numberMarginBottom: 0,
        footerImage: 'imgs/footer_light.png', // إضافة جديدة
        addLargeZero: false // إضافة جديدة
    },
    modern: {
        name: 'light',
        itemBackground: '#111827',
        numberColor: '#333333',
        badgeColor: '#3b82f6',
        badgeTextColor: '#ffffff',
        border: '#374151',
        gridBackground: '#ebebeb',
        introText1Color: '#244659',
        introText2Color: '#474747',
        introTextExtraColor: '#474747',
        gridItemStyle: 'rectangle1',
        badgeStyle: 'shape2',
        itemMarginBottom: 0,
        paddingRight: 0,
        numberMarginBottom: 0,
        footerImage: 'imgs/footer_light.png', // إضافة جديدة
        addLargeZero: false // إضافة جديدة
    },
    minimal: {
        name: 'dark',
        itemBackground: '#ffffff',
        numberColor: '#111827',
        badgeColor: '#3b82f6',
        badgeTextColor: '#ffffff',
        border: '#d1d5db',
        gridBackground: '#0b161a',
        introText1Color: '#111827',
        introText2Color: '#4b5563',
        introTextExtraColor: '#6b7280',
        gridItemStyle: 'rectangle7',
        badgeStyle: 'shape10',
        itemMarginBottom: 10,
        paddingRight: 0,
        numberMarginBottom: 0,
        footerImage: 'imgs/footer_dark.png', // إضافة جديدة
        addLargeZero: true // إضافة جديدة
    }
};


// الثوابت
const GRID_COLS = 3;
const ROW_GAP = 10;
const COLUMN_GAP = 15;
const ITEM_HEIGHT = 100;
const PAGE_WIDTH = 1155;
const PAGE_HEIGHT = 1235;

// متغيرات التطبيق
let globalCurrentIndex;
let currentItemMarginBottom = 0; // القيمة الافتراضية
let introText1 = '';
let introText2 = '';
let introTextExtra = '';
let introText1Color = '#111827';
let introText2Color = '#111827';
let introTextExtraColor = '#111827';
let itemsPerRow = 3;
let itemHeight = 100;
let fontSize = 60;
let currentFont = '';
let currentTemplate = TEMPLATES.classic;
let startRange = 1;
let currentGridItemStyle = 'default';
let endRange = 100;
let currentFontBase64 = '';
const svgNS = 'http://www.w3.org/2000/svg';
let currentBadgeStyle = 'circle';
let currentBadgeBgColor = '#3b82f6';
let currentBadgeTextColor = '#ffffff';
let currentBorderColor = '#d1d5db';
let currentPageBgColor = '#f3f4f6';
let currentSvgSize = 100;
const DEFAULT_ITEM_HEIGHT = 100; // الارتفاع الثابت للنمط الافتراضي
let currentPaddingRight = 0;
let addZeroPage = true;
let addLargeZero = false;
let currentColorVariant = 'default';
let currentRectangleVariant = 'default';
let currentFooterImage = 'imgs/footer_light.png';
let currentGradient = 'none';
let currentNumberMarginBottom = 0; // القيمة الافتراضية لـ margin-bottom

// تعريف الخلفيات
const bgGradientSelect = document.getElementById('bg-gradient-select');

function applyGradient() {
    const containers = document.querySelectorAll('.grid-container, .intro-container');
    const gridItems = document.querySelectorAll('.grid-item:not(.zero-glyph)');
    const pageBgColor = document.getElementById('page-bg-color').value;


    containers.forEach(container => {
        switch (currentGradient) {
            case 'darkblue':
                container.style.background = 'linear-gradient(180deg, rgba(1, 99, 148, 1) 15.09%, rgba(2, 91, 140, 1) 26.93%, rgba(4, 70, 118, 1) 45.31%, rgba(8, 35, 82, 1) 67.84%, rgba(8, 32, 79, 1) 69.82%)';
                break;
            case 'graywhite':
                container.style.background = 'linear-gradient(180deg, rgba(218, 234, 233, 1) 0%, rgba(170, 201, 203, 1) 100%)';
                break;
            case 'sunset':
                container.style.background = 'linear-gradient(180deg, rgba(244, 248, 249, 1) 0%, rgba(188, 214, 215, 1) 100%)';
                break;
            case 'new':
                container.style.background = 'linear-gradient(180deg, rgba(96, 159, 192, 1) 0%, rgba(84, 137, 168, 1) 27.02%, rgba(53, 82, 107, 1) 83.81%, rgba(44, 65, 88, 1) 100%)';
                break;
            case 'neew':
                container.style.background = 'linear-gradient(180deg, rgba(24, 90, 142, 1) 0%, rgba(48, 109, 154, 1) 21.71%, rgba(109, 157, 186, 1) 67.28%, rgba(157, 194, 210, 1) 100%)';
                break;
            case 'neeew':
                container.style.background = 'linear-gradient(180deg, rgba(59, 111, 151, 1) 0%, rgba(83, 131, 168, 1) 27.73%, rgba(144, 184, 212, 1) 86.02%, rgba(160, 197, 223, 1) 100%)';
                break;
            case 'neeeew':
                container.style.background = 'linear-gradient(0deg, rgba(27, 20, 100, 1) 12.46%, rgba(25, 26, 104, 1) 21.55%, rgba(19, 43, 114, 1) 33.79%, rgba(10, 71, 131, 1) 47.77%, rgba(1, 99, 148, 1) 58.96%)';
                break;
            case 'neeeeew':
                container.style.background = 'linear-gradient(180deg, rgba(104, 69, 251, 1) 15.56%, rgba(100, 66, 243, 1) 22.3%, rgba(89, 59, 221, 1) 32.76%, rgba(70, 48, 185, 1) 45.65%, rgba(45, 32, 136, 1) 60.32%, rgba(27, 20, 100, 1) 69.82%)';
                break;
            case 'neeeeeew':
                container.style.background = 'linear-gradient(0deg, rgba(12, 166, 221, 1) 19.76%, rgba(27, 20, 100, 1) 69.82%)';
                break;
            case 'purple':
                container.style.background = 'linear-gradient(90deg, rgba(40, 14, 50, 1) 0%, rgba(52, 33, 81, 1) 100%)';
                break;
            case 'mint':
                container.style.background = 'linear-gradient(180deg, rgb(221, 221, 221) 0%, rgb(198, 246, 255) 100%)';
                break;
            default:
                container.style.background = pageBgColor;
        }
    });
}

bgGradientSelect.addEventListener('change', () => {
    currentGradient = bgGradientSelect.value;
    applyGradient();
    updatePreview();
});

function updateGridItemStyle(style) {
    currentGridItemStyle = style;

    // تحديث لون النص والهامش في حالة rectangle10 أو rectangle7
    if (style === 'rectangle10' || style === 'rectangle7') {
        currentTemplate.numberColor = '#ffffff';
        mainTextColorPicker.value = '#ffffff'; // تحديث حقل main-text-color في الـ UI
        currentItemMarginBottom = 10; // ضبط الهامش لـ 10 بكسل
        document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom; // تحديث النص في الـ UI
        document.getElementById('item-margin-bottom').value = currentItemMarginBottom; // تحديث الـ range input
        updateRangeBackground(document.getElementById('item-margin-bottom')); // تحديث خلفية الـ range input
        console.log(`${style} selected: numberColor = #ffffff, marginBottom = 10`);
    } else {
        // إعادة تعيين لون النص والهامش للقيم الافتراضية
        const defaultColor = mainTextColorPicker.value && mainTextColorPicker.value !== '#ffffff' ? mainTextColorPicker.value : '#111827';
        currentTemplate.numberColor = defaultColor;
        mainTextColorPicker.value = defaultColor; // تحديث حقل main-text-color في الـ UI
        // تحقق إذا كان badge style هو shape10 قبل إعادة تعيين الهامش لـ 0
        currentItemMarginBottom = currentBadgeStyle === 'shape10' ? 10 : 0;
        document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom; // تحديث النص في الـ UI
        document.getElementById('item-margin-bottom').value = currentItemMarginBottom; // تحديث الـ range input
        updateRangeBackground(document.getElementById('item-margin-bottom')); // تحديث خلفية الـ range input
        console.log(`Non-rectangle10/rectangle7 selected: numberColor = ${defaultColor}, marginBottom = ${currentItemMarginBottom}`);
    }

    updateShapesAndVariants('grid-item-style');
    updatePreview();
}

function updateBadgeStyle(style) {
    currentBadgeStyle = style;

    // تحديث الهامش في حالة shape10
    if (style === 'shape10') {
        currentItemMarginBottom = 10; // ضبط الهامش لـ 10 بكسل
        document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom; // تحديث النص في الـ UI
        document.getElementById('item-margin-bottom').value = currentItemMarginBottom; // تحديث الـ range input
        updateRangeBackground(document.getElementById('item-margin-bottom')); // تحديث خلفية الـ range input
        console.log('shape10 selected: marginBottom = 10');
    } else {
        // إعادة تعيين الهامش للقيمة الافتراضية لو مش shape10، مع التحقق من grid-item-style
        currentItemMarginBottom = (currentGridItemStyle === 'rectangle10' || currentGridItemStyle === 'rectangle7') ? 10 : 0;
        document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom; // تحديث النص في الـ UI
        document.getElementById('item-margin-bottom').value = currentItemMarginBottom; // تحديث الـ range input
        updateRangeBackground(document.getElementById('item-margin-bottom')); // تحديث خلفية الـ range input
        console.log(`Non-shape10 selected: marginBottom = ${currentItemMarginBottom}`);
    }

    updateShapesAndVariants('badge-style');
    updatePreview();
}


// تعريف الأشكال مع أسماء مخصصة للمتغيرات
const badgeShapes = {
    shape1: {
        name: 'شكل 1',
        variants: [
            { id: 'default', name: 'الأزرق', src: 'Shapes/shape1.svg' },
            { id: 'variant1', name: 'البرتقالي', src: 'Shapes/shape2.svg' },
        ]
    },
    shape3: {
        name: 'شكل 2',
        variants: [
            { id: 'default', name: 'أصفر', src: 'Shapes/shape3.svg' },
            { id: 'variant1', name: 'رمادي', src: 'Shapes/shape3_2.svg' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/shape3_3.svg' },
            { id: 'variant3', name: 'بنفسجي', src: 'Shapes/shape3_4.svg' },
            { id: 'variant4', name: 'لبني', src: 'Shapes/shape3_5.svg' }
        ]
    },
    shape4: {
        name: 'شكل 3',
        variants: [
            { id: 'default', name: 'أصفر', src: 'Shapes/shape4.svg' },
            { id: 'variant1', name: 'رمادي', src: 'Shapes/shape4_2.svg' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/shape4_3.svg' },
            { id: 'variant3', name: 'بنفسجي', src: 'Shapes/shape4_4.svg' },
            { id: 'variant4', name: 'لبني', src: 'Shapes/shape4_5.svg' }
        ]
    },
    shape5: {
        name: 'شكل 4',
        variants: [
            { id: 'default', name: 'أصفر', src: 'Shapes/shape5.svg' },
            { id: 'variant1', name: 'رمادي', src: 'Shapes/shape5_2.svg' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/shape5_3.svg' },
            { id: 'variant3', name: 'بنفسجي', src: 'Shapes/shape5_4.svg' },
            { id: 'variant4', name: 'لبني', src: 'Shapes/shape5_5.svg' }
        ]
    },
    shape6: {
        name: 'شكل 5',
        variants: [
            { id: 'default', name: 'أصفر', src: 'Shapes/shape6.svg' },
            { id: 'variant1', name: 'رمادي', src: 'Shapes/shape6_2.svg' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/shape6_3.svg' },
            { id: 'variant3', name: 'بنفسجي', src: 'Shapes/shape6_4.svg' },
            { id: 'variant4', name: 'لبني', src: 'Shapes/shape6_5.svg' }
        ]
    },
    shape7: {
        name: 'شكل 6',
        variants: [
            { id: 'default', name: 'أصفر', src: 'Shapes/shape7.svg' },
            { id: 'variant1', name: 'رمادي', src: 'Shapes/shape7_2.svg' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/shape7_3.svg' },
            { id: 'variant3', name: 'بنفسجي', src: 'Shapes/shape7_4.svg' },
            { id: 'variant4', name: 'لبني', src: 'Shapes/shape7_5.svg' }
        ]
    },
    shape8: {
        name: 'شكل 7',
        variants: [
            { id: 'default', name: 'بنسفجي', src: 'Shapes/shape8.svg' },
            { id: 'variant1', name: 'أخضر', src: 'Shapes/shape8_2.svg' },
            { id: 'variant2', name: 'برتقالي', src: 'Shapes/shape8_3.svg' },
            { id: 'variant3', name: 'أحمر', src: 'Shapes/shape8_4.svg' }
        ]
    },
    shape10: {
        name: 'شكل 8',
        variants: [
            { 
                id: 'default', 
                name: 'زهري بنفسجي', 
                css: {
                    background: 'linear-gradient(0deg, rgba(29, 4, 65, 1) 0%, rgba(114, 14, 105, 1) 100%)',
                    boxShadow: 'rgb(168, 54, 163) 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant1', 
                name: 'عنابي', 
                css: {
                    background: 'linear-gradient(0deg, rgba(139, 60, 144, 1) 0%, rgba(143, 25, 65, 1) 100%)',
                    boxShadow: ' #901942 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant2', 
                name: 'لبني', 
                css: {
                    background: 'linear-gradient(0deg, rgba(38, 211, 237, 1) 0%, rgba(58, 74, 146, 1) 100%)',
                    boxShadow: ' #3286ba 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant3', 
                name: 'أحمر', 
                css: {
                    background: 'linear-gradient(0deg, rgba(255, 85, 114, 1) 0%, rgba(50, 6, 63, 1) 100%)',
                    boxShadow: ' #a52b48 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant4', 
                name: 'أخضر', 
                css: {
                    background: 'linear-gradient(0deg, rgba(1, 116, 139, 1) 1.08%, rgb(0, 215, 181) 100%)',
                    boxShadow: ' #0ead8e 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant5', 
                name: 'بنسفجي', 
                css: {
                    background: 'linear-gradient(0deg, rgba(80, 34, 135, 1) 1.08%, rgba(29, 4, 65, 1) 100%)',
                    boxShadow: ' #6429c1 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
            { 
                id: 'variant6', 
                name: 'أصفر', 
                css: {
                    background: 'linear-gradient(0deg,rgb(224, 118, 3) 1.08%, rgb(249, 218, 0) 100%)',
                    boxShadow: ' #c6ae22 3px -3px 4px',
                },
                textRotation: 'rotate(-45deg)'
            },
        ]
    },
    shaperectang5: {
        name: 'شكل 9',
        variants: [
            { id: 'default', name: 'أخضر', src: 'Shapes/shaperectangle5.svg' },
            { id: 'variant1', name: 'أحمر', src: 'Shapes/shaperectangle5_2.svg' },
            { id: 'variant2', name: 'بنفسجى', src: 'Shapes/shaperectangle5_3.svg' },
            { id: 'variant3', name: 'برتقالي', src: 'Shapes/shaperectangle5_4.svg' }
        ]
    },
    shaperectang1: {
        name: 'شكل 1 "خاص بالمستطيلات"',
        variants: [
            { id: 'default', name: 'الزهري', src: 'Shapes/shaperectangle1.svg' },
            { id: 'variant1', name: 'الأصفر', src: 'Shapes/shaperectangle1_2.svg' },
            { id: 'variant2', name: 'الأخضر', src: 'Shapes/shaperectangle1_3.svg' }
        ]
    },
    shaperectang2: {
        name: 'شكل 2 خاص بالمستطيلات',
        variants: [
            { id: 'default', name: 'بنفسجى', src: 'Shapes/shaperectangle2.svg' },
            { id: 'variant2', name: 'برتقالي', src: 'Shapes/shaperectangle2_2.svg' },
            { id: 'variant1', name: 'زهري', src: 'Shapes/shaperectangle2_3.svg' },
            { id: 'variant3', name: 'أخضر', src: 'Shapes/shaperectangle2_4.svg' },
        ]
    },
    shaperectang3: {
        name: 'شكل 3 خاص بالمستطيلات',
        variants: [
            { id: 'default', name: 'البرتقالي', src: 'Shapes/shaperectangle3.svg' },
            { id: 'variant1', name: 'البنفسجي', src: 'Shapes/shaperectangle3_2.svg' },
            { id: 'variant2', name: 'الزهري', src: 'Shapes/shaperectangle3_3.svg' },
            { id: 'variant3', name: 'الأخضر', src: 'Shapes/shaperectangle3_4.svg' }
        ]
    },
};

const gridItemShapes = {
    rectangle1: {
        name: 'مستطيل 1',
        background: 'Shapes/rectangle1.svg',
        variants: [
            { id: 'default', name: 'زهري', src: 'Shapes/rectangle1.svg', badge: 'shaperectang1', badgeVariant: 'default' },
            { id: 'variant1', name: 'برتقالي', src: 'Shapes/rectangle1_2.svg', badge: 'shaperectang1', badgeVariant: 'variant1' },
            { id: 'variant2', name: 'أخضر', src: 'Shapes/rectangle1_3.svg', badge: 'shaperectang1', badgeVariant: 'variant2' }
        ]
    },
    rectangle2: {
        name: 'مستطيل 2',
        background: 'Shapes/rectangle2.svg',
        variants: [
            { id: 'default', name: 'بنفسجي', src: 'Shapes/rectangle2.svg', badge: 'shaperectang2', badgeVariant: 'default' },
            { id: 'variant3', name: 'برتقالي', src: 'Shapes/rectangle2_3.svg', badge: 'shaperectang2', badgeVariant: 'variant2' },
            { id: 'variant2', name: 'زهري', src: 'Shapes/rectangle2_2.svg', badge: 'shaperectang2', badgeVariant: 'variant1' },
            { id: 'variant1', name: 'أخضر', src: 'Shapes/rectangle2_4.svg', badge: 'shaperectang2', badgeVariant: 'variant3' }
        ]
    },
    rectangle3: {
        name: 'مستطيل 3',
        background: 'Shapes/rectangle3.svg',
        variants: [
            { id: 'default', name: 'البرتقالي', src: 'Shapes/rectangle3.svg', badge: 'shaperectang3', badgeVariant: 'default' },
            { id: 'variant2', name: 'البنفسجي', src: 'Shapes/rectangle3.svg', badge: 'shaperectang3', badgeVariant: 'variant1' },
            { id: 'variant3', name: 'الزهري', src: 'Shapes/rectangle3.svg', badge: 'shaperectang3', badgeVariant: 'variant2' },
            { id: 'variant1', name: 'الأخضر', src: 'Shapes/rectangle3.svg', badge: 'shaperectang3', badgeVariant: 'variant3' }
        ]
    },
    rectangle4: {
        name: 'مستطيل 4',
        cssOnly: true,
        badge: 'shape3',
        badgePosition: { top: '10px', left: '10px' },
        svgTextStyle: {
            fontSize: '1.4rem',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        variants: [
            {
                id: 'default',
                name: 'أخضر',
                css: {
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    borderBottom: '4px solid #22c55e'
                },
                badge: 'shape3',
                badgeVariant: 'default'
            },
            {
                id: 'variant1',
                name: 'البني',
                css: {
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    borderBottom: '4px solid #8b4513'
                },
                badge: 'shape3',
                badgeVariant: 'variant1'
            },
            {
                id: 'variant2',
                name: 'الأحمر',
                css: {
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    borderBottom: '4px solid #ef4444'
                },
                badge: 'shape3',
                badgeVariant: 'variant2'
            }
        ]
    },
    rectangle7: {
        name: 'مستطيل 5',
        cssOnly: true,
        css: {
            paddingRight: '30px',
        },
        variants: [
            {
                id: 'default',
                name: 'زهري بنفسجي',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg, rgba(92, 0, 125, 1) 0%, rgba(209, 25, 65, 1) 100%)',
                },
                badge: 'shape10', badgeVariant: 'default'
            },
            {
                id: 'variant1',
                name: 'عنابي',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg,rgb(11, 22, 26) 0%, rgb(144, 25, 66) 100%)',
                },
                badge: 'shape10', badgeVariant: 'variant3'
            },
            {
                id: 'variant2',
                name: 'لبني',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg,rgb(38, 211, 237) 0%,rgb(58, 74, 146) 100%)',
                },
                badge: 'shape10', badgeVariant: 'variant2'
            },
            {
                id: 'variant3',
                name: 'أخضر',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg, #01748b 0%, #00d7b5 100%)',
                },
                badge: 'shape10', badgeVariant: 'variant4'
            },
            {
                id: 'variant4',
                name: 'بنفسجي',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg, #502287 0%, #1d0441 100%)',
                },
                badge: 'shape10', badgeVariant: 'variant5'
            },
            {
                id: 'variant5',
                name: 'أصفر',
                css: {
                    width: '310px',
                    height: '90px',
                    border: 'none',
                    clipPath: 'polygon(0px -40px, 90% 0px, 100% 50%, 90% 100%, -300px 149%)',
                    background: 'linear-gradient(90deg, #e07603 0%, #f9da00 100%)',
                },
                badge: 'shape10', badgeVariant: 'variant6'
            },
        ]
    },
    rectangle10: {
        name: 'مستطيل 6',
        variants: [
            {
                id: 'default',
                src: 'Shapes/rectangle4.svg'
            }
        ],
        cssOnly: false,
        svgTextStyle: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5rem',
            color: currentBadgeTextColor
        }
    }
};

// عناصر DOM
const dropzone = document.getElementById('dropzone');
const fontUpload = document.getElementById('font-upload');
const startRangeInput = document.getElementById('start-range');
const endRangeInput = document.getElementById('end-range');
const templateButtons = document.querySelectorAll('.template-btn');
const exportPngBtn = document.getElementById('export-png');
const previewContainer = document.getElementById('preview-container');
const saveTemplateBtn = document.getElementById('save-template-btn');
const customTemplatesContainer = document.getElementById('custom-templates');
const badgeStyleSelect = document.getElementById('badge-style');
const badgeBgColorPicker = document.getElementById('badge-bg-color');
const badgeTextColorPicker = document.getElementById('badge-text-color');
const borderColorPicker = document.getElementById('border-color');
const mainBgColorPicker = document.getElementById('main-bg-color');
const mainTextColorPicker = document.getElementById('main-text-color');
const pageBgColorPicker = document.getElementById('page-bg-color');
const colorVariantGroup = document.getElementById('color-variant-group');
const colorVariantSelect = document.getElementById('color-variant-select');
const globalPaddingRightInput = document.getElementById('global-padding-right');
const globalPaddingValue = document.getElementById('global-padding-value');
const svgSizeInput = document.getElementById('svg-size');
const svgSizeValue = document.getElementById('svg-size-value');
const footerImageSelect = document.getElementById('footer-image');
const notification = document.getElementById('notification');

// إدارة القوالب المخصصة
let customTemplates = JSON.parse(localStorage.getItem('customTemplates')) || {};

function saveCustomTemplates() {
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
}

function renderCustomTemplates() {
    customTemplatesContainer.innerHTML = '';
    Object.keys(customTemplates).forEach(templateId => {
        const template = customTemplates[templateId];
        const button = document.createElement('div');
        button.className = 'custom-template-btn';
        button.dataset.templateId = templateId;
        button.innerHTML = `
            <span>${template.name}</span>
            <button class="delete-template-btn" data-template-id="${templateId}">🗑️</button>
        `;
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-template-btn')) return;
            selectTemplate(templateId, true);
        });
        customTemplatesContainer.appendChild(button);

        const deleteBtn = button.querySelector('.delete-template-btn');
        deleteBtn.addEventListener('click', () => {
            showConfirmDialog(templateId);
        });
    });
}

function showConfirmDialog(templateId) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
        <p>هل أنت متأكد أنك تريد حذف قالب "${customTemplates[templateId].name}"؟</p>
        <div class="confirm-dialog-buttons">
            <button class="confirm-btn">تأكيد</button>
            <button class="cancel-btn">إلغاء</button>
        </div>
    `;
    document.body.appendChild(dialog);

    const confirmBtn = dialog.querySelector('.confirm-btn');
    const cancelBtn = dialog.querySelector('.cancel-btn');

    confirmBtn.addEventListener('click', () => {
        delete customTemplates[templateId];
        saveCustomTemplates();
        renderCustomTemplates();
        if (currentTemplate === customTemplates[templateId]) {
            selectTemplate('classic');
        }
        document.body.removeChild(dialog);
        showSuccess('تم حذف القالب بنجاح!');
    });

    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
}

function updateShapesAndVariants(sourceEvent = 'grid-item-style') {
    const rectangleVariantGroup = document.getElementById('rectangle-variant-group');
    const rectangleVariantSelect = document.getElementById('rectangle-variant-select');
    const colorVariantGroup = document.getElementById('color-variant-group');
    const colorVariantSelect = document.getElementById('color-variant-select');
    const badgeStyleSelect = document.getElementById('badge-style');

    const shapeInfo = gridItemShapes[currentGridItemStyle];
    const rectangleVariants = shapeInfo?.variants || [];
    
    rectangleVariantSelect.innerHTML = '';
    rectangleVariants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant.id;
        option.textContent = variant.name;
        rectangleVariantSelect.appendChild(option);
    });

    rectangleVariantSelect.value = currentRectangleVariant;
    rectangleVariantGroup.style.display = rectangleVariants.length > 1 ? 'block' : 'none';

    if (sourceEvent === 'grid-item-style' || sourceEvent === 'rectangle-variant') {
        const selectedVariant = rectangleVariants.find(v => v.id === currentRectangleVariant) || 
                               rectangleVariants.find(v => v.id === 'default');
        
        if (selectedVariant?.badge) {
            currentBadgeStyle = selectedVariant.badge;
            badgeStyleSelect.value = currentBadgeStyle;
            
            if (selectedVariant.badgeVariant) {
                currentColorVariant = selectedVariant.badgeVariant;
            } else {
                currentColorVariant = 'default';
            }
        }
    }

    badgeStyleSelect.innerHTML = '';
    Object.entries(badgeShapes).forEach(([shapeId, shape]) => {
        const option = document.createElement('option');
        option.value = shapeId;
        option.textContent = shape.name;
        badgeStyleSelect.appendChild(option);
    });
    
    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'بدون';
    badgeStyleSelect.appendChild(noneOption);
    
    const circleOption = document.createElement('option');
    circleOption.value = 'circle';
    circleOption.textContent = 'دائرة';
    badgeStyleSelect.appendChild(circleOption);
    
    const rectangleOption = document.createElement('option');
    rectangleOption.value = 'rectangle';
    rectangleOption.textContent = 'مستطيل';
    badgeStyleSelect.appendChild(rectangleOption);

    badgeStyleSelect.value = currentBadgeStyle;

    const badgeVariants = badgeShapes[currentBadgeStyle]?.variants || [];
    colorVariantSelect.innerHTML = '';
    badgeVariants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant.id;
        option.textContent = variant.name;
        colorVariantSelect.appendChild(option);
    });

    colorVariantGroup.style.display = badgeVariants.length > 1 ? 'block' : 'none';
    
    if (badgeVariants.length === 0) {
        currentColorVariant = 'default';
    } else {
        const validVariant = badgeVariants.find(v => v.id === currentColorVariant) || badgeVariants[0];
        currentColorVariant = validVariant.id;
        colorVariantSelect.value = currentColorVariant;
    }
}

// تهيئة الأحداث
function initEventListeners() {
    const dropzone = document.getElementById('dropzone');
    const fontUpload = document.getElementById('font-upload');
    const startRangeInput = document.getElementById('start-range');
    const endRangeInput = document.getElementById('end-range');
    const exportPngBtn = document.getElementById('export-png');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportPdfHighQualityBtn = document.getElementById('export-pdf-low-quality');
    const saveTemplateBtn = document.getElementById('save-template-btn');
    const badgeStyleSelect = document.getElementById('badge-style');
    const badgeBgColorPicker = document.getElementById('badge-bg-color');
    const badgeTextColorPicker = document.getElementById('badge-text-color');
    const borderColorPicker = document.getElementById('border-color');
    const mainBgColorPicker = document.getElementById('main-bg-color');
    const mainTextColorPicker = document.getElementById('main-text-color');
    const pageBgColorPicker = document.getElementById('page-bg-color');
    const colorVariantSelect = document.getElementById('color-variant-select');
    const globalPaddingRightInput = document.getElementById('global-padding-right');
    const globalPaddingValue = document.getElementById('global-padding-value');
    const svgSizeInput = document.getElementById('svg-size');
    const svgSizeValue = document.getElementById('svg-size-value');
    const footerImageSelect = document.getElementById('footer-image');
    const templateButtons = document.querySelectorAll('.template-btn');
    const previewContainer = document.getElementById('preview-container');

    dropzone.addEventListener('dragover', handleDragOver);
    dropzone.addEventListener('dragleave', handleDragLeave);
    dropzone.addEventListener('drop', handleDrop);
    dropzone.addEventListener('click', () => fontUpload.click());
    fontUpload.addEventListener('change', handleFileSelect);

    startRangeInput.addEventListener('input', updateRange);
    endRangeInput.addEventListener('input', updateRange);

    document.getElementById('items-per-row').addEventListener('change', (e) => {
        itemsPerRow = parseInt(e.target.value);
        updatePreview();
    });

    document.getElementById('item-height').addEventListener('input', (e) => {
        itemHeight = parseInt(e.target.value);
        updatePreview();
    });

    document.getElementById('font-size').addEventListener('input', (e) => {
        fontSize = parseInt(e.target.value);
        updatePreview();
    });

    document.getElementById('intro-text-1').addEventListener('input', (e) => {
        introText1 = e.target.value;
        updatePreview();
    });

    document.getElementById('intro-text-2').addEventListener('input', (e) => {
        introText2 = e.target.value;
        updatePreview();
    });

    document.getElementById('intro-text-extra').addEventListener('input', (e) => {
        introTextExtra = e.target.value;
        updatePreview();
    });

    document.getElementById('intro-text-1-color').addEventListener('input', (e) => {
        introText1Color = e.target.value;
        updateColors();
    });

    document.getElementById('intro-text-2-color').addEventListener('input', (e) => {
        introText2Color = e.target.value;
        updateColors();
    });

    document.getElementById('intro-text-extra-color').addEventListener('input', (e) => {
        introTextExtraColor = e.target.value;
        updateColors();
    });

    document.getElementById('item-margin-bottom').addEventListener('input', (e) => {
        currentItemMarginBottom = parseInt(e.target.value);
        document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom;
        updateRangeBackground(document.getElementById('item-margin-bottom'));
        updatePreview();
    });

    document.getElementById('add-zero-page').addEventListener('change', (e) => {
        addZeroPage = e.target.checked;
        updatePreview();
    });

    document.getElementById('add-large-zero').addEventListener('change', (e) => {
        addLargeZero = e.target.checked;
        updatePreview();
    });

    document.getElementById('number-margin-bottom').addEventListener('input', (e) => {
        currentNumberMarginBottom = parseInt(e.target.value);
        document.getElementById('number-margin-bottom-value').textContent = currentNumberMarginBottom;
        updateRangeBackground(document.getElementById('number-margin-bottom'));
        document.querySelectorAll('.number-display').forEach(display => {
            display.style.marginBottom = `${currentNumberMarginBottom}px`;
        });
    });

    exportPngBtn.addEventListener('click', exportAsPNG);
    exportPdfBtn.addEventListener('click', exportAsPDF);
    exportPdfHighQualityBtn.addEventListener('click', exportAsPDFHighQuality);

    document.getElementById('zoom-in').addEventListener('click', () => {
        const container = previewContainer;
        const currentZoom = parseFloat(container.dataset.zoom || 1);
        container.dataset.zoom = Math.min(currentZoom + 0.1, 2);
        container.style.transform = `scale(${container.dataset.zoom})`;
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        const container = previewContainer;
        const currentZoom = parseFloat(container.dataset.zoom || 1);
        container.dataset.zoom = Math.max(currentZoom - 0.1, 0.5);
        container.style.transform = `scale(${container.dataset.zoom})`;
    });

    document.getElementById('fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            previewContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.getElementById('prev-page').addEventListener('click', () => {
        if (globalCurrentIndex > 0) {
            globalCurrentIndex--;
            updatePreview();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = calculateTotalPages();
        if (globalCurrentIndex < totalPages - 1) {
            globalCurrentIndex++;
            updatePreview();
        }
    });

    saveTemplateBtn.addEventListener('click', () => {
        const templateName = prompt('أدخل اسم القالب:');
        if (templateName) {
            const templateId = generateUUID();
            customTemplates[templateId] = {
                name: templateName,
                itemBackground: mainBgColorPicker.value,
                numberColor: mainTextColorPicker.value,
                badgeColor: badgeBgColorPicker.value,
                badgeTextColor: badgeTextColorPicker.value,
                border: borderColorPicker.value,
                gridBackground: pageBgColorPicker.value,
                introText1Color: introText1Color,
                introText2Color: introText2Color,
                introTextExtraColor: introTextExtraColor,
                gridItemStyle: currentGridItemStyle,
                badgeStyle: currentBadgeStyle,
                colorVariant: currentColorVariant,
                rectangleVariant: currentRectangleVariant,
                itemMarginBottom: currentItemMarginBottom,
                svgSize: currentSvgSize,
                paddingRight: currentPaddingRight,
                numberMarginBottom: currentNumberMarginBottom,
                itemsPerRow: itemsPerRow,
                itemHeight: itemHeight,
                fontSize: fontSize,
                addZeroPage: addZeroPage,
                addLargeZero: document.getElementById('add-large-zero').checked,
                footerImage: document.getElementById('footer-image').value
            };
            saveCustomTemplates();
            renderCustomTemplates();
            showSuccess('تم حفظ القالب بنجاح!');
        }
    });

    badgeStyleSelect.addEventListener('change', (e) => {
        updateBadgeStyle(e.target.value);
    });

    badgeBgColorPicker.addEventListener('input', (e) => {
        currentBadgeBgColor = e.target.value;
        updateColors();
    });

    badgeTextColorPicker.addEventListener('input', (e) => {
        currentBadgeTextColor = e.target.value;
        updateColors();
    });

    borderColorPicker.addEventListener('input', (e) => {
        currentBorderColor = e.target.value;
        updateColors();
    });

    mainBgColorPicker.addEventListener('input', (e) => {
        updateColors();
    });

    mainTextColorPicker.addEventListener('input', (e) => {
        updateColors();
    });

    pageBgColorPicker.addEventListener('input', (e) => {
        currentPageBgColor = e.target.value;
        updateColors();
    });

    colorVariantSelect.addEventListener('change', (e) => {
        currentColorVariant = e.target.value;
        updatePreview();
    });

    globalPaddingRightInput.addEventListener('input', (e) => {
        currentPaddingRight = parseInt(e.target.value);
        globalPaddingValue.textContent = currentPaddingRight;
        updateRangeBackground(globalPaddingRightInput);
        updatePreview();
    });

    document.getElementById('grid-item-style').addEventListener('change', (e) => {
        updateGridItemStyle(e.target.value);
    });

    document.getElementById('rectangle-variant-select').addEventListener('change', (e) => {
        currentRectangleVariant = e.target.value;
        updateShapesAndVariants('rectangle-variant');
        updatePreview();
    });

    svgSizeInput.addEventListener('input', (e) => {
        currentSvgSize = parseInt(e.target.value);
        svgSizeValue.textContent = currentSvgSize;
        updateRangeBackground(svgSizeInput);
        updatePreview();
    });

    footerImageSelect.addEventListener('change', (e) => {
        currentFooterImage = e.target.value;
        updatePreview();
    });

    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const templateKey = btn.dataset.template;
            selectTemplate(templateKey, false);
        });
    });
}

function updateColors() {
    // تحديث قيم القالب الحالي بناءً على منتقي الألوان (ميزة جديدة)
    currentTemplate.itemBackground = mainBgColorPicker.value;
    currentTemplate.numberColor = mainTextColorPicker.value;
    currentBadgeBgColor = badgeBgColorPicker.value;
    currentBadgeTextColor = badgeTextColorPicker.value;
    currentBorderColor = borderColorPicker.value;
    currentPageBgColor = pageBgColorPicker.value;

    // تحديث ألوان البادج
    document.querySelectorAll('.badge-circle, .badge-rectangle').forEach(badge => {
        badge.style.backgroundColor = currentBadgeBgColor;
        badge.style.color = currentBadgeTextColor;
    });

    // تحديث نصوص البادج
    document.querySelectorAll('.svg-text:not(.shape10-text)').forEach(text => {
        text.style.color = currentBadgeTextColor;
    });

    // تحديث العناصر مع الحفاظ على الترتيب
    document.querySelectorAll('.grid-item').forEach(item => {
        const gridColumn = item.style.gridColumn; // حفظ ترتيب العنصر
        const gridRow = item.style.gridRow;

        if (currentGridItemStyle === 'rectangle10') { // دعم rectangle10 (ميزة جديدة)
            const shapeInfo = gridItemShapes.rectangle10;
            const selectedVariant = shapeInfo.variants.find(v => v.id === 'default');

            item.style.border = 'none';
            item.style.backgroundImage = `url(${selectedVariant.src})`;
            item.style.backgroundColor = 'transparent';
            item.style.backgroundSize = 'cover';
            item.style.backgroundRepeat = 'no-repeat';
            item.style.backgroundPosition = 'center';
            item.style.width = '337.3229px'; // ضبط العرض
            item.style.height = '117.5745px'; // ضبط الارتفاع
            item.style.gridColumn = gridColumn;
            item.style.gridRow = gridRow;
            item.style.marginBottom = `${currentItemMarginBottom}px`; // تطبيق item-margin-bottom

            // إخفاء الـ badge
            const badgeWrapper = item.querySelector('.svg-wrapper');
            if (badgeWrapper) {
                badgeWrapper.style.display = 'none';
            }

            // تحديث svg-text
            const textWrapper = item.querySelector('.svg-text');
            if (textWrapper) {
                const shapeStyle = shapeInfo.svgTextStyle || {};
                Object.entries(shapeStyle).forEach(([key, value]) => {
                    textWrapper.style[key] = value;
                });
                textWrapper.style.color = currentBadgeTextColor;
                textWrapper.style.top = '50%'; // إبقاء النص ثابتًا في المركز
                textWrapper.style.left = '50%';
                textWrapper.style.transform = 'translate(-50%, -50%)';
            }
        } else if (currentGridItemStyle !== 'default' && gridItemShapes[currentGridItemStyle]?.variants) {
            const shapeInfo = gridItemShapes[currentGridItemStyle];
            const selectedVariant = shapeInfo.variants.find(v => v.id === currentRectangleVariant) ||
                                   shapeInfo.variants.find(v => v.id === 'default');

            if (shapeInfo.cssOnly) {
                // مسح فقط الأنماط المؤثرة دون المساس بالترتيب
                item.style.background = '';
                item.style.border = '';
                item.style.borderRadius = '';
                item.style.boxShadow = '';
                item.style.clipPath = '';
                
                Object.entries(selectedVariant.css).forEach(([key, value]) => {
                    item.style[key] = value;
                });
            } else {
                item.style.border = 'none';
                item.style.backgroundImage = `url(${selectedVariant.src})`;
                item.style.backgroundColor = 'transparent';
                item.style.backgroundSize = 'cover';
                item.style.backgroundRepeat = 'no-repeat';
                item.style.backgroundPosition = 'center';
            }
            
            item.style.marginBottom = `${currentItemMarginBottom}px`;
            item.style.gridColumn = gridColumn; // استعادة الترتيب
            item.style.gridRow = gridRow;
        } else {
            item.style.border = `1px solid ${currentBorderColor}`;
            item.style.backgroundColor = currentTemplate.itemBackground;
            item.style.backgroundImage = '';
            item.style.borderRadius = '';
            item.style.boxShadow = '';
            item.style.marginBottom = `${currentItemMarginBottom}px`;
            item.style.gridColumn = gridColumn;
            item.style.gridRow = gridRow;
        }
    });

    // تحديث نصوص العرض
    document.querySelectorAll('.number-display').forEach(display => {
        display.style.color = currentTemplate.numberColor;
        display.style.paddingLeft = `${currentPaddingRight}px`;
        display.style.marginBottom = `${currentNumberMarginBottom}px`; // ميزة جديدة
        if (currentBadgeStyle === 'none') {
            display.classList.remove('offset-badge');
        }
    });

    // تحديث لون نص الصفر في صفحة الصفر (ميزة جديدة)
    document.querySelectorAll('.zero-glyph .number-display').forEach(zero => {
        zero.style.color = currentTemplate.numberColor;
        zero.style.marginBottom = `${currentNumberMarginBottom}px`;
    });

    // تحديث خلفية الصفحة
    document.querySelectorAll('.grid-container, .intro-container').forEach(container => {
        container.style.backgroundColor = currentPageBgColor;
    });
    applyGradient();

    // دالة مساعدة لإنشاء/تحديث svg-text
    const updateOrCreateSvgText = (wrapper, variant) => {
        let svgText = wrapper.querySelector('.svg-text');
        const textContent = wrapper.parentElement.parentElement.dataset.number || '';
        
        if (!svgText) {
            svgText = document.createElement('div');
            svgText.className = 'svg-text';
            wrapper.appendChild(svgText);
        }
        
        // إضافة الكلاسات الديناميكية
        svgText.className = `svg-text ${currentBadgeStyle}-${currentColorVariant}`;
        svgText.textContent = textContent;
        svgText.style.color = currentBadgeTextColor;
        svgText.style.position = 'absolute';

        // خصائص إضافية حسب الشكل
        if (currentBadgeStyle === 'shape10') {
            svgText.classList.add('shape10-text');
            svgText.style.top = '50%';
            svgText.style.left = '50%';
            svgText.style.transform = `translate(-50%, -50%) ${variant?.textRotation || ''}`;
            svgText.style.fontSize = `${1.5 * (currentSvgSize / 100)}rem`;
        } else if (currentGridItemStyle === 'rectangle10') { // ميزة جديدة
            const shapeStyle = gridItemShapes.rectangle10.svgTextStyle || {};
            Object.entries(shapeStyle).forEach(([key, value]) => {
                svgText.style[key] = value;
            });
            svgText.style.top = '50%'; // إبقاء النص ثابتًا في المركز
            svgText.style.left = '50%';
            svgText.style.transform = 'translate(-50%, -50%)';
        } else {
            const shapeStyle = gridItemShapes[currentGridItemStyle]?.svgTextStyle || {};
            Object.entries(shapeStyle).forEach(([key, value]) => {
                svgText.style[key] = value;
            });
        }
    };

    // تحديث البادج بناءً على متغير البادج
    if (currentGridItemStyle !== 'rectangle10') { // ميزة جديدة
        document.querySelectorAll('.svg-wrapper').forEach(wrapper => {
            if (currentBadgeStyle === 'shape10') {
                wrapper.innerHTML = ''; // ميزة جديدة
                
                // تطبيق تنسيقات المتغير المحدد مباشرة على svg-wrapper
                const variants = badgeShapes.shape10.variants;
                const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
                
                wrapper.className = `svg-wrapper shape10`;
                Object.entries(variant.css).forEach(([key, value]) => {
                    wrapper.style[key] = value;
                });
                wrapper.style.position = 'relative';
                wrapper.style.width = `${currentSvgSize}px`;
                wrapper.style.height = `${currentSvgSize}px`;
                
                updateOrCreateSvgText(wrapper, variant);
            } 
            else if (currentBadgeStyle !== 'circle' && currentBadgeStyle !== 'rectangle' && badgeShapes[currentBadgeStyle]) { // تحسين جديد
                wrapper.innerHTML = ''; // ميزة جديدة
                
                const variants = badgeShapes[currentBadgeStyle]?.variants || [];
                const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
                
                if (variant?.src) {
                    const svgImg = document.createElement('img'); // إنشاء صورة جديدة
                    svgImg.src = variant.src;
                    svgImg.className = 'badge-svg';
                    svgImg.style.width = '100%';
                    svgImg.style.height = '100%';
                    wrapper.appendChild(svgImg);
                }
                
                wrapper.style.width = `${currentSvgSize}px`;
                updateOrCreateSvgText(wrapper, variant);
            }
        });
    } else {
        document.querySelectorAll('.svg-wrapper').forEach(wrapper => {
            if (currentBadgeStyle === 'shape10') {
                wrapper.innerHTML = '';
                
                // تطبيق تنسيقات المتغير المحدد مباشرة على svg-wrapper
                const variants = badgeShapes.shape10.variants;
                const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
                
                wrapper.className = `svg-wrapper shape10`;
                Object.entries(variant.css).forEach(([key, value]) => {
                    wrapper.style[key] = value;
                });
                wrapper.style.position = 'relative';
                wrapper.style.width = `${currentSvgSize}px`;
                wrapper.style.height = `${currentSvgSize}px`;
                
                updateOrCreateSvgText(wrapper, variant);
            } 
            else if (currentBadgeStyle !== 'circle' && currentBadgeStyle !== 'rectangle') {
                const svgImg = wrapper.querySelector('.badge-svg');
                if (svgImg) {
                    const variants = badgeShapes[currentBadgeStyle]?.variants || [];
                    const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
                    svgImg.src = variant?.src || '';
                    wrapper.style.width = `${currentSvgSize}px`;
                    updateOrCreateSvgText(wrapper, variant);
                }
            }
        });
    }

    // تحديث ألوان النصوص التمهيدية
    document.querySelectorAll('.intro-text-1').forEach(text => {
        text.style.color = introText1Color;
    });
    document.querySelectorAll('.intro-text-2').forEach(text => {
        text.style.color = introText2Color;
    });
    document.querySelectorAll('.intro-text-extra').forEach(text => {
        text.style.color = introTextExtraColor;
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';

    const files = e.dataTransfer.files;
    if (files.length && files[0].name.endsWith('.ttf')) {
        loadFont(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length && files[0].name.endsWith('.ttf')) {
        loadFont(files[0]);
    }
}

async function loadFont(file) {
    const fontName = `CustomFont-${Date.now()}`;
    currentFont = fontName;

    const base64 = await readFileAsBase64(file);
    currentFontBase64 = base64;

    const style = document.createElement('style');
    style.innerHTML = `
        @font-face {
            font-family: '${fontName}';
            src: url(data:font/ttf;base64,${base64}) format('truetype');
        }
    `;
    document.head.appendChild(style);

    const fontFace = new FontFace(fontName, `url(data:font/ttf;base64,${base64})`);
    try {
        const loadedFont = await fontFace.load();
        document.fonts.add(loadedFont);
        await loadAllFonts();
        updatePreview();
        toggleExportButtons(true);
        showSuccess('تم تحميل الخط وتطبيقه بنجاح!');
    } catch (error) {
        console.error('Error loading font:', error);
        showError('حدث خطأ أثناء تحميل الخط.');
    }
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function updateRange() {
    startRange = parseInt(startRangeInput.value) || 1;
    endRange = parseInt(endRangeInput.value) || 100;

    if (startRange > endRange) {
        endRange = startRange;
        endRangeInput.value = startRange;
    }

    globalCurrentIndex = startRange;
    updatePreview();
}

function selectTemplate(templateKey, isCustom = false) {
    if (isCustom) {
        currentTemplate = customTemplates[templateKey];
    } else {
        currentTemplate = TEMPLATES[templateKey];
    }

    currentBadgeBgColor = currentTemplate.badgeColor;
    currentBadgeTextColor = currentTemplate.badgeTextColor;
    currentBorderColor = currentTemplate.border;
    currentPageBgColor = currentTemplate.gridBackground;
    introText1Color = currentTemplate.introText1Color;
    introText2Color = currentTemplate.introText2Color;
    introTextExtraColor = currentTemplate.introTextExtraColor;
    currentFooterImage = currentTemplate.footerImage;
    addLargeZero = currentTemplate.addLargeZero;
    currentItemMarginBottom = currentTemplate.itemMarginBottom || 0;
    currentPaddingRight = currentTemplate.paddingRight || 0;
    currentNumberMarginBottom = currentTemplate.numberMarginBottom || 0;

    document.getElementById('badge-bg-color').value = currentBadgeBgColor;
    document.getElementById('badge-text-color').value = currentBadgeTextColor;
    document.getElementById('border-color').value = currentBorderColor;
    document.getElementById('main-bg-color').value = currentTemplate.itemBackground;
    document.getElementById('main-text-color').value = currentTemplate.numberColor;
    document.getElementById('page-bg-color').value = currentPageBgColor;
    document.getElementById('intro-text-1-color').value = introText1Color;
    document.getElementById('intro-text-2-color').value = introText2Color;
    document.getElementById('intro-text-extra-color').value = introTextExtraColor;
    document.getElementById('footer-image').value = currentFooterImage;
    document.getElementById('add-large-zero').checked = addLargeZero;
    document.getElementById('item-margin-bottom').value = currentItemMarginBottom;
    document.getElementById('item-margin-bottom-value').textContent = currentItemMarginBottom;
    document.getElementById('global-padding-right').value = currentPaddingRight;
    document.getElementById('global-padding-value').textContent = currentPaddingRight;
    document.getElementById('number-margin-bottom').value = currentNumberMarginBottom;
    document.getElementById('number-margin-bottom-value').textContent = currentNumberMarginBottom;

    if (currentTemplate.gridItemStyle) {
        currentGridItemStyle = currentTemplate.gridItemStyle;
        document.getElementById('grid-item-style').value = currentGridItemStyle;
    }

    if (currentTemplate.badgeStyle) {
        currentBadgeStyle = currentTemplate.badgeStyle;
        document.getElementById('badge-style').value = currentBadgeStyle;
    }

    if (currentTemplate.colorVariant) {
        currentColorVariant = currentTemplate.colorVariant;
    }

    if (currentTemplate.rectangleVariant) {
        currentRectangleVariant = currentTemplate.rectangleVariant;
    }

    if (currentTemplate.svgSize) {
        currentSvgSize = currentTemplate.svgSize;
        document.getElementById('svg-size').value = currentSvgSize;
        document.getElementById('svg-size-value').textContent = currentSvgSize;
    }

    if (currentTemplate.itemsPerRow) {
        itemsPerRow = currentTemplate.itemsPerRow;
        document.getElementById('items-per-row').value = itemsPerRow;
    }

    if (currentTemplate.itemHeight) {
        itemHeight = currentTemplate.itemHeight;
        document.getElementById('item-height').value = itemHeight;
    }

    if (currentTemplate.fontSize) {
        fontSize = currentTemplate.fontSize;
        document.getElementById('font-size').value = fontSize;
    }

    if (currentTemplate.addZeroPage !== undefined) {
        addZeroPage = currentTemplate.addZeroPage;
        document.getElementById('add-zero-page').checked = addZeroPage;
    }

    templateButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.template === templateKey && !isCustom);
    });

    document.querySelectorAll('.custom-template-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.templateId === templateKey && isCustom);
    });

    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.marginBottom = `${currentItemMarginBottom}px`;
    });

    document.querySelectorAll('.number-display').forEach(display => {
        display.style.paddingRight = `${currentPaddingRight}px`;
        display.style.marginBottom = `${currentNumberMarginBottom}px`;
    });

    updateRangeBackground(document.getElementById('item-margin-bottom'));
    updateRangeBackground(document.getElementById('global-padding-right'));
    updateRangeBackground(document.getElementById('number-margin-bottom'));
    updateSvgRangeBackground(document.getElementById('svg-size'));

    updateShapesAndVariants();
    updatePreview();
}

function updatePreview() {
    if (!currentFont) {
        previewContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-font"></i>
                </div>
                <h3>لا يوجد خط معروض حالياً</h3>
                <p>قم بتحميل ملف الخط لرؤية المعاينة هنا</p>
            </div>
        `;
        return;
    }

    previewContainer.innerHTML = '';
    globalCurrentIndex = startRange;

    const totalPages = calculateTotalPages();
    for (let i = 0; i < totalPages; i++) {
        const page = createPage(i);
        if (currentBadgeStyle === 'shape3') {
            page.classList.add('badge-shape3');
        }
        previewContainer.appendChild(page);
    }

    // تحديد ارتفاع العنصر بناءً على currentGridItemStyle
    let itemHeight = parseInt(document.getElementById('item-height').value) || 100;
    if (currentGridItemStyle === 'rectangle10') {
        itemHeight = 117.5745; // ارتفاع rectangle10
    }

    // حساب عدد الصفوف في الصفحة الحالية
    const itemsPerRow = parseInt(document.getElementById('items-per-row').value);
    const totalItems = endRange - startRange + 1;
    const itemsInCurrentPage = Math.min(totalItems - globalCurrentIndex * itemsPerRow * Math.floor((PAGE_HEIGHT - 40 - 40) / (itemHeight + currentItemMarginBottom)), itemsPerRow * Math.floor((PAGE_HEIGHT - 40 - 40) / (itemHeight + currentItemMarginBottom)));
    const rowsInPage = Math.ceil(itemsInCurrentPage / itemsPerRow);

    // ضبط min-height للـ grid-container
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        const minHeight = rowsInPage * (itemHeight + currentItemMarginBottom + ROW_GAP);
        gridContainer.style.minHeight = `${minHeight}px`;
    }

    updateColors();
    applyGradient();
    updatePageNavigation();
}

function calculateTotalPages() {
    let pages = 0;

    if (introText1 || introText2 || introTextExtra) {
        pages++;
    }

    let totalItems = endRange - startRange + 1;
    let currentIndex = startRange;

    while (currentIndex <= endRange) {
        const itemsInPage = getItemsPerPage();
        currentIndex += itemsInPage;
        pages++;
    }

    if (addZeroPage) {
        pages++;
    }

    return pages;
}

function getItemsPerPage(isLastPage = false) {
    const footerHeight = 40;
    const padding = 40;
    const availableHeight = PAGE_HEIGHT - footerHeight - padding;
    
    // تحديد ارتفاع العنصر بناءً على currentGridItemStyle
    let itemHeight = parseInt(document.getElementById('item-height').value) || 100;
    if (currentGridItemStyle === 'rectangle10') {
        itemHeight = 117.5745; // ارتفاع rectangle10
    }
    
    const rowHeight = itemHeight + ROW_GAP + currentItemMarginBottom;
    const maxRows = Math.floor(availableHeight / rowHeight);
    return Math.max(0, maxRows * itemsPerRow);
}

function createPage(pageIndex) {
    const page = document.createElement('div');
    page.className = 'page-preview';
    page.style.width = `${PAGE_WIDTH}px`;
    page.style.height = `${PAGE_HEIGHT}px`;
    page.style.margin = '0 auto 30px';
    page.style.position = 'relative';
    page.style.overflow = 'hidden';

    // إضافة رقم صفر كبير إذا تم تفعيله
    if (addLargeZero) {
        const largeZeroContainer = document.createElement('div');
        largeZeroContainer.className = 'large-zero-container';
        largeZeroContainer.style.position = 'absolute';
        largeZeroContainer.style.top = '0';
        largeZeroContainer.style.left = '0';
        largeZeroContainer.style.width = '100%';
        largeZeroContainer.style.height = '100%';
        largeZeroContainer.style.display = 'flex';
        largeZeroContainer.style.alignItems = 'center';
        largeZeroContainer.style.justifyContent = 'center';
        largeZeroContainer.style.pointerEvents = 'none';
        largeZeroContainer.style.zIndex = '1';
        largeZeroContainer.style.background = 'rgba(0, 0, 0, 0.1)'; // تأثير overlay خفيف

        const largeZero = document.createElement('div');
        largeZero.className = 'large-zero';
        largeZero.textContent = '0';
        largeZero.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
        largeZero.style.fontSize = '500px'; // حجم كبير جدًا
        largeZero.style.color = '#ffffff'; // لون أبيض
        largeZero.style.opacity = '0.12'; // تعتيم 25%
        largeZero.style.textAlign = 'center';

        largeZeroContainer.appendChild(largeZero);
        page.appendChild(largeZeroContainer);
    }

    if (pageIndex === 0 && (introText1 || introText2 || introTextExtra)) {
        const introContainer = document.createElement('div');
        introContainer.className = 'intro-container';
        introContainer.style.textAlign = 'center';
        introContainer.style.padding = '20px 0';
        introContainer.style.height = '100%';
        introContainer.style.position = 'relative';
        introContainer.style.zIndex = '2';
        introContainer.style.backgroundColor = currentPageBgColor;

        if (introText1) {
            const text1 = document.createElement('div');
            text1.className = 'intro-text intro-text-1';
            text1.textContent = introText1;
            text1.style.color = introText1Color;
            introContainer.appendChild(text1);
        }

        if (introText2) {
            const text2 = document.createElement('div');
            text2.className = 'intro-text intro-text-2';
            text2.textContent = introText2;
            text2.style.color = introText2Color;
            introContainer.appendChild(text2);
        }

        if (introTextExtra) {
            const extraText = document.createElement('div');
            extraText.className = 'intro-text intro-text-extra';
            extraText.textContent = introTextExtra;
            extraText.style.fontFamily = 'IBMPlexSansArabi, sans-serif';
            extraText.style.fontSize = '30px';
            extraText.style.lineHeight = '1.6';
            extraText.style.marginTop = '20px';
            extraText.style.padding = '0 20px';
            extraText.style.whiteSpace = 'pre-wrap';
            extraText.style.maxHeight = 'calc(100% - 200px)';
            extraText.style.overflow = 'auto';
            extraText.style.direction = 'rtl';
            extraText.style.textAlign = 'center';
            extraText.style.color = introTextExtraColor;
            introContainer.appendChild(extraText);
        }

        page.appendChild(introContainer);

        const pageFooter = document.createElement('div');
        pageFooter.style.zIndex = '10';
        pageFooter.className = 'page-footer';
        pageFooter.style.height = '40px';
        pageFooter.style.display = 'flex';
        pageFooter.style.alignItems = 'center';
        pageFooter.style.justifyContent = 'center';
        pageFooter.style.position = 'absolute';
        pageFooter.style.bottom = '0';
        pageFooter.style.width = '100%';

        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.style.width = '100%';
        watermark.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = currentFooterImage;
        img.alt = 'Footer Image';
        img.style.maxWidth = '100%';
        img.style.objectFit = 'contain';
        watermark.appendChild(img);

        pageFooter.appendChild(watermark);
        page.appendChild(pageFooter);

        return page;
    }

    const adjustedPageIndex = (introText1 || introText2 || introTextExtra) ? pageIndex - 1 : pageIndex;

    const totalPages = calculateTotalPages();
    const adjustedTotalPages = (introText1 || introText2 || introTextExtra) ? totalPages - 1 : totalPages;

    const isLastPage = adjustedPageIndex === adjustedTotalPages - 1;
    const isZeroPage = addZeroPage && isLastPage && globalCurrentIndex > endRange;

    if (isZeroPage) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        gridContainer.style.height = '100%';
        gridContainer.style.padding = '20px';
        gridContainer.style.backgroundColor = currentPageBgColor;

        const zeroItem = document.createElement('div');
        zeroItem.className = 'grid-item zero-glyph';
        zeroItem.style.height = '100%';
        zeroItem.style.position = 'relative';
        zeroItem.style.backgroundColor = 'transparent';
        zeroItem.style.border = 'none';
        zeroItem.style.gridColumn = '1 / -1';
        zeroItem.style.display = 'flex';
        zeroItem.style.alignItems = 'center';
        zeroItem.style.justifyContent = 'center';

        const zeroDisplay = document.createElement('div');
        zeroDisplay.className = 'number-display';
        zeroDisplay.textContent = '0';
        zeroDisplay.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
        zeroDisplay.style.color = currentTemplate.numberColor;
        zeroDisplay.style.fontSize = '250px';
        zeroItem.appendChild(zeroDisplay);

        const itemControls = document.createElement('div');
        itemControls.className = 'item-controls';

        const decreaseBtn = document.createElement('button');
        decreaseBtn.innerHTML = '−';
        decreaseBtn.className = 'control-btn decrease-font';
        decreaseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentSize = parseInt(zeroDisplay.style.fontSize) || 250;
            zeroDisplay.style.fontSize = `${Math.max(250, currentSize - 15)}px`;
        });

        const increaseBtn = document.createElement('button');
        increaseBtn.innerHTML = '+';
        increaseBtn.className = 'control-btn increase-font';
        increaseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentSize = parseInt(zeroDisplay.style.fontSize) || 250;
            zeroDisplay.style.fontSize = `${currentSize + 15}px`;
        });

        itemControls.appendChild(decreaseBtn);
        itemControls.appendChild(increaseBtn);
        zeroItem.appendChild(itemControls);

        gridContainer.appendChild(zeroItem);
        page.appendChild(gridContainer);

        const pageFooter = document.createElement('div');
        pageFooter.style.zIndex = '10';
        pageFooter.className = 'page-footer';
        pageFooter.style.height = '40px';
        pageFooter.style.display = 'flex';
        pageFooter.style.alignItems = 'center';
        pageFooter.style.justifyContent = 'center';
        pageFooter.style.position = 'absolute';
        pageFooter.style.bottom = '0';
        pageFooter.style.width = '100%';

        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.style.width = '100%';
        watermark.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = currentFooterImage;
        img.alt = 'Footer Image';
        img.style.maxWidth = '100%';
        img.style.objectFit = 'contain';
        watermark.appendChild(img);

        pageFooter.appendChild(watermark);
        page.appendChild(pageFooter);

        return page;
    }

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.gap = `${ROW_GAP}px ${COLUMN_GAP}px`;
    gridContainer.style.height = '100%';
    gridContainer.style.padding = '20px';
    gridContainer.style.backgroundColor = currentPageBgColor;

    const itemsPerPage = getItemsPerPage();
    const start = globalCurrentIndex;
    const end = Math.min(start + itemsPerPage - 1, endRange);

    const numRows = Math.ceil((end - start + 1) / itemsPerRow);
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${itemsPerRow}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${numRows}, auto)`;

    let items = [];
    for (let num = start; num <= end; num++) {
        items.push(createGridItem(num));
    }

    for (let col = 0; col < itemsPerRow; col++) {
        for (let row = 0; row < numRows; row++) {
            const index = row + (itemsPerRow - 1 - col) * numRows;
            if (index < items.length) {
                const item = items[index];
                item.style.gridColumn = col + 1;
                item.style.gridRow = row + 1;
                gridContainer.appendChild(item);
            }
        }
    }

    globalCurrentIndex = end + 1;

    if (addZeroPage && isLastPage && globalCurrentIndex > endRange) {
        const zeroItemHeight = 150 + ROW_GAP * 2;
        const availableHeight = PAGE_HEIGHT - 40 - 40;
        const usedHeight = numRows * (itemHeight + ROW_GAP);
        const hasSpaceForZero = usedHeight + zeroItemHeight <= availableHeight;

        if (hasSpaceForZero) {
            const zeroItem = document.createElement('div');
            zeroItem.className = 'grid-item zero-glyph';
            zeroItem.style.height = '150px';
            zeroItem.style.position = 'relative';
            zeroItem.style.backgroundColor = 'transparent';
            zeroItem.style.border = 'none';
            zeroItem.style.gridColumn = '1 / -1';
            zeroItem.style.display = 'flex';
            zeroItem.style.alignItems = 'center';
            zeroItem.style.justifyContent = 'center';
            zeroItem.style.marginTop = `${ROW_GAP * 2}px`;

            const zeroDisplay = document.createElement('div');
            zeroDisplay.className = 'number-display';
            zeroDisplay.textContent = '0';
            zeroDisplay.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
            zeroDisplay.style.color = currentTemplate.numberColor;
            zeroDisplay.style.fontSize = '150px';
            zeroItem.appendChild(zeroDisplay);

            const itemControls = document.createElement('div');
            itemControls.className = 'item-controls';

            const decreaseBtn = document.createElement('button');
            decreaseBtn.innerHTML = '−';
            decreaseBtn.className = 'control-btn decrease-font';
            decreaseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentSize = parseInt(zeroDisplay.style.fontSize) || 150;
                zeroDisplay.style.fontSize = `${Math.max(150, currentSize - 15)}px`;
            });

            const increaseBtn = document.createElement('button');
            increaseBtn.innerHTML = '+';
            increaseBtn.className = 'control-btn increase-font';
            increaseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentSize = parseInt(zeroDisplay.style.fontSize) || 150;
                zeroDisplay.style.fontSize = `${currentSize + 15}px`;
            });

            itemControls.appendChild(decreaseBtn);
            itemControls.appendChild(increaseBtn);
            zeroItem.appendChild(itemControls);

            gridContainer.appendChild(zeroItem);
        }
    }

    page.appendChild(gridContainer);

    const pageFooter = document.createElement('div');
    pageFooter.style.zIndex = '10';
    pageFooter.className = 'page-footer';
    pageFooter.style.height = '40px';
    pageFooter.style.display = 'flex';
    pageFooter.style.alignItems = 'center';
    pageFooter.style.justifyContent = 'center';
    pageFooter.style.position = 'absolute';
    pageFooter.style.bottom = '0';
    pageFooter.style.width = '100%';

    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.style.width = '100%';
    watermark.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = currentFooterImage;
    img.alt = 'Footer Image';
    img.style.maxWidth = '100%';
    img.style.objectFit = 'contain';
    watermark.appendChild(img);

    pageFooter.appendChild(watermark);
    page.appendChild(pageFooter);

    return page;
}

function createGridItem(number) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    
    // Set height based on item-height input or default to 100px
    itemHeight = parseInt(document.getElementById('item-height').value) || 100;
    item.style.height = `${itemHeight}px`;
    
    item.style.position = 'relative';
    item.dataset.number = number;

    // حساب عرض العنصر بناءً على النمط المختار
    let gridItemWidth;
    if (currentGridItemStyle === 'rectangle6') {
        gridItemWidth = 320;
    } else {
        gridItemWidth = (1080 - 40 - COLUMN_GAP * (itemsPerRow - 1)) / itemsPerRow;
    }
    item.style.width = `${gridItemWidth}px`;

    const shapeInfo = gridItemShapes[currentGridItemStyle];
    const useBadge = !shapeInfo?.noBadge && currentBadgeStyle !== 'none' && currentGridItemStyle !== 'rectangle10';

    if (currentGridItemStyle !== 'default' && shapeInfo?.variants) {
        item.style.border = 'none';
    } else {
        item.style.border = `1px solid ${currentBorderColor}`;
    }

    // استخدام main-text-color مباشرة (هيكون #ffffff افتراضيًا في rectangle10)
    const textColor = currentTemplate.numberColor || '#111827'; // fallback لو مفيش لون محدد

    const numberDisplay = document.createElement('div');
    numberDisplay.className = 'number-display';
    numberDisplay.classList.add(`number-display-${currentGridItemStyle}-${currentRectangleVariant}`);
    numberDisplay.style.marginBottom = `${currentNumberMarginBottom}px`;
    if (['rectangle', 'shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape10'].includes(currentBadgeStyle) && currentGridItemStyle !== 'rectangle10') {
        numberDisplay.classList.add('offset-badge');
    }
    numberDisplay.textContent = number;
    numberDisplay.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
    numberDisplay.style.color = textColor;
    numberDisplay.style.fontSize = `${fontSize}px`;
    numberDisplay.style.display = 'flex';
    numberDisplay.style.alignItems = 'center';
    numberDisplay.style.justifyContent = 'center';
    numberDisplay.style.height = '100%';
    numberDisplay.style.width = '100%';
    numberDisplay.style.paddingLeft = `${currentPaddingRight}px`;
    item.appendChild(numberDisplay);

    if (currentGridItemStyle === 'rectangle10') {
        const svgText = document.createElement('div');
        svgText.className = `svg-text svg-text-${currentGridItemStyle}`;
        svgText.textContent = number;
        svgText.style.color = textColor;
        svgText.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
        svgText.style.fontSize = `${fontSize}px`;
        svgText.style.position = 'absolute';
        svgText.style.top = '50%';
        svgText.style.left = '50%';
        svgText.style.transform = 'translate(-50%, -50%)';
        svgText.style.background = 'none';

        const shapeStyle = gridItemShapes[currentGridItemStyle]?.svgTextStyle || {};
        Object.entries(shapeStyle).forEach(([key, value]) => {
            svgText.style[key] = value;
        });

        item.appendChild(svgText);
    } else if (useBadge) {
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'badge-container';
        badgeContainer.style.position = 'absolute';
        badgeContainer.style.left = '-1';
        badgeContainer.style.top = '0';
        badgeContainer.style.height = '100%';

        if (currentBadgeStyle === 'circle') {
            const badge = document.createElement('div');
            badge.className = 'badge-circle';
            badge.textContent = number;
            badge.style.backgroundColor = currentBadgeBgColor;
            badge.style.color = currentBadgeTextColor;
            badgeContainer.appendChild(badge);
        } else if (currentBadgeStyle === 'rectangle') {
            const badge = document.createElement('div');
            badge.className = 'badge-rectangle';
            badge.textContent = number;
            badge.style.backgroundColor = currentBadgeBgColor;
            badge.style.color = currentBadgeTextColor;
            badge.style.height = `${itemHeight}px`;
            const maxBadgeWidth = gridItemWidth * 0.33;
            const badgeWidth = itemHeight > maxBadgeWidth ? maxBadgeWidth : itemHeight;
            badge.style.width = `${badgeWidth}px`;
            badgeContainer.appendChild(badge);
        } else if (badgeShapes[currentBadgeStyle]) {
            const svgWrapper = document.createElement('div');
            svgWrapper.className = `svg-wrapper ${currentBadgeStyle} ${currentColorVariant}`;
            svgWrapper.style.width = `${currentSvgSize}px`;
            svgWrapper.style.height = '100%';

            const svgImg = document.createElement('img');
            const variants = badgeShapes[currentBadgeStyle].variants;
            const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
            svgImg.src = variant.src;
            svgImg.className = 'badge-svg';
            svgImg.style.width = '100%';
            svgImg.style.height = '100%';
            svgImg.style.objectFit = 'contain';

            const svgText = document.createElement('div');
            svgText.className = 'svg-text';
            svgText.textContent = number;
            svgText.style.color = currentBadgeTextColor;
            svgText.style.position = 'absolute';

            svgWrapper.appendChild(svgImg);
            svgWrapper.appendChild(svgText);
            badgeContainer.appendChild(svgWrapper);
        }

        item.appendChild(badgeContainer);
    }

    const itemControls = document.createElement('div');
    itemControls.className = 'item-controls';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.innerHTML = '−';
    decreaseBtn.className = 'control-btn decrease-font';
    decreaseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentSize = parseInt(numberDisplay.style.fontSize) || fontSize;
        numberDisplay.style.fontSize = `${Math.max(10, currentSize - 2)}px`;
    });

    const increaseBtn = document.createElement('button');
    increaseBtn.innerHTML = '+';
    increaseBtn.className = 'control-btn increase-font';
    increaseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentSize = parseInt(numberDisplay.style.fontSize) || fontSize;
        numberDisplay.style.fontSize = `${currentSize + 2}px`;
    });

    const decreasePaddingBtn = document.createElement('button');
    decreasePaddingBtn.innerHTML = '⬅️';
    decreasePaddingBtn.className = 'control-btn decrease-padding';
    decreasePaddingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let currentPadding = parseFloat(getComputedStyle(numberDisplay).paddingLeft) || 0;
        if (isNaN(currentPadding)) currentPadding = 0;
        const newPadding = Math.max(0, currentPadding - 2);
        numberDisplay.style.paddingLeft = `${newPadding}px`;
    });

    const increasePaddingBtn = document.createElement('button');
    increasePaddingBtn.innerHTML = '➡️';
    increasePaddingBtn.className = 'control-btn increase-padding';
    increasePaddingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let currentPadding = parseFloat(getComputedStyle(numberDisplay).paddingLeft) || 0;
        if (isNaN(currentPadding)) currentPadding = 0;
        numberDisplay.style.paddingLeft = `${currentPadding + 2}px`;
    });

    const increasePaddingTopBtn = document.createElement('button');
    increasePaddingTopBtn.innerHTML = '🔽';
    increasePaddingTopBtn.className = 'control-btn increase-padding-top';
    increasePaddingTopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let currentPadding = parseFloat(getComputedStyle(numberDisplay).paddingTop) || 0;
        if (isNaN(currentPadding)) currentPadding = 0;
        const newPadding = currentPadding + 2;
        numberDisplay.style.paddingTop = `${newPadding}px`;
    });

    const increasePaddingBottomBtn = document.createElement('button');
    increasePaddingBottomBtn.innerHTML = '🔼';
    increasePaddingBottomBtn.className = 'control-btn increase-padding-bottom';
    increasePaddingBottomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let currentPadding = parseFloat(getComputedStyle(numberDisplay).paddingBottom) || 0;
        if (isNaN(currentPadding)) currentPadding = 0;
        const newPadding = currentPadding + 2;
        numberDisplay.style.paddingBottom = `${newPadding}px`;
    });

    itemControls.appendChild(decreaseBtn);
    itemControls.appendChild(increaseBtn);
    itemControls.appendChild(decreasePaddingBtn);
    itemControls.appendChild(increasePaddingBtn);
    itemControls.appendChild(increasePaddingTopBtn);
    itemControls.appendChild(increasePaddingBottomBtn);
    item.appendChild(itemControls);

    return item;
}

function createGridItemForExport(number) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.style.boxSizing = 'border-box';
    
    // Set height based on item-height input or default to 100px
    itemHeight = parseInt(document.getElementById('item-height').value) || 100;
    item.style.height = `${itemHeight}px`;
    
    item.style.position = 'relative';
    item.dataset.number = number;

    let gridItemWidth;
    if (currentGridItemStyle === 'rectangle6') {
        gridItemWidth = 320;
    } else {
        gridItemWidth = (1080 - 40 - COLUMN_GAP * (itemsPerRow - 1)) / itemsPerRow;
    }
    item.style.width = `${gridItemWidth}px`;

    if (currentGridItemStyle !== 'default' && gridItemShapes[currentGridItemStyle]?.variants) {
        item.style.border = 'none';
    } else {
        item.style.border = `1px solid ${currentBorderColor}`;
    }

    const textColor = currentTemplate.numberColor || '#111827';

    const numberDisplay = document.createElement('div');
    numberDisplay.className = 'number-display';
    numberDisplay.classList.add(`number-display-${currentGridItemStyle}-${currentRectangleVariant}`);
    numberDisplay.style.marginBottom = `${currentNumberMarginBottom}px`;
    if (['rectangle', 'shape1', 'shape2', 'shape3', 'shape4', 'shape5', 'shape6', 'shape7', 'shape10'].includes(currentBadgeStyle) && currentGridItemStyle !== 'rectangle10') {
        numberDisplay.classList.add('offset-badge');
    }
    numberDisplay.textContent = number;
    numberDisplay.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
    numberDisplay.style.color = textColor;
    numberDisplay.style.fontSize = `${fontSize}px`;
    numberDisplay.style.display = 'flex';
    numberDisplay.style.alignItems = 'center';
    numberDisplay.style.justifyContent = 'center';
    numberDisplay.style.height = '100%';
    numberDisplay.style.width = '100%';
    numberDisplay.style.paddingLeft = `${currentPaddingRight}px`;
    item.appendChild(numberDisplay);

    if (currentGridItemStyle === 'rectangle10') {
        const svgText = document.createElement('div');
        svgText.className = `svg-text svg-text-${currentGridItemStyle}`;
        svgText.textContent = number;
        svgText.style.color = textColor;
        svgText.style.fontFamily = currentFont || 'Tajawal-Medium, sans-serif';
        svgText.style.fontSize = `${fontSize}px`;
        svgText.style.position = 'absolute';
        svgText.style.top = '50%';
        svgText.style.left = '50%';
        svgText.style.transform = 'translate(-50%, -50%)';
        svgText.style.background = 'none';

        const shapeStyle = gridItemShapes[currentGridItemStyle]?.svgTextStyle || {};
        Object.entries(shapeStyle).forEach(([key, value]) => {
            svgText.style[key] = value;
        });

        item.appendChild(svgText);
    } else if (currentBadgeStyle !== 'none') {
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'badge-container';
        badgeContainer.style.position = 'absolute';
        badgeContainer.style.left = '0';
        badgeContainer.style.top = '0';
        badgeContainer.style.height = '100%';

        if (currentBadgeStyle === 'circle') {
            const badge = document.createElement('div');
            badge.className = 'badge-circle';
            badge.textContent = number;
            badge.style.backgroundColor = currentBadgeBgColor;
            badge.style.color = currentBadgeTextColor;
            badgeContainer.appendChild(badge);
        } else if (currentBadgeStyle === 'rectangle') {
            const badge = document.createElement('div');
            badge.className = 'badge-rectangle';
            badge.textContent = number;
            badge.style.backgroundColor = currentBadgeBgColor;
            badge.style.color = currentBadgeTextColor;
            badge.style.height = '100%';
            const badgeWidth = Math.min(itemHeight, 100);
            badge.style.width = `${badgeWidth}px`;
            badgeContainer.appendChild(badge);
        } else if (badgeShapes[currentBadgeStyle]) {
            const svgWrapper = document.createElement('div');
            svgWrapper.className = `svg-wrapper ${currentBadgeStyle} ${currentColorVariant}`;
            svgWrapper.style.width = `${currentSvgSize}px`;
            svgWrapper.style.height = '100%';

            const svgImg = document.createElement('img');
            const variants = badgeShapes[currentBadgeStyle].variants;
            const variant = variants.find(v => v.id === currentColorVariant) || variants[0];
            svgImg.src = variant.src;
            svgImg.className = 'badge-svg';
            svgImg.style.width = '100%';
            svgImg.style.height = '100%';
            svgImg.style.objectFit = 'contain';

            const svgText = document.createElement('div');
            svgText.className = 'svg-text';
            svgText.textContent = number;
            svgText.style.color = currentBadgeTextColor;
            svgText.style.position = 'absolute';

            svgWrapper.appendChild(svgImg);
            svgWrapper.appendChild(svgText);
            badgeContainer.appendChild(svgWrapper);
        }

        item.appendChild(badgeContainer);
    }

    return item;
}


async function exportAsPNG() {
    if (!currentFont) {
        showError('يرجى تحميل خط أولاً.');
        return;
    }

    try {
        await loadAllFonts();
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = 'none');
        
        // تغيير نص الزر إلى "جاري التصدير"
        const originalText = exportPngBtn.textContent;
        exportPngBtn.textContent = 'جاري التصدير...';
        exportPngBtn.disabled = true;

        const totalPages = calculateTotalPages();
        globalCurrentIndex = startRange;

        for (let i = 0; i < totalPages; i++) {
            const originalPage = document.querySelectorAll('.page-preview')[i];
            const clone = originalPage.cloneNode(true);

            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.zIndex = '9999';
            clone.style.opacity = '1';
            clone.style.pointerEvents = 'none';
            clone.style.transform = 'scale(1)';
            clone.style.backgroundColor = 'transparent';

            const isIntroPage = i === 0 && (introText1 || introText2 || introTextExtra);
            const introContainer = clone.querySelector('.intro-container');
            if (introContainer) {
                introContainer.style.backgroundColor = currentPageBgColor;
            }

            document.body.appendChild(clone);

            await new Promise(resolve => setTimeout(resolve, 500));

            const exportBgColor = isIntroPage ? currentPageBgColor : 'transparent';
            const dataUrl = await htmlToImage.toPng(clone, {
                quality: 2,
                backgroundColor: exportBgColor,
                pixelRatio: 6,
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                }
            });

            const link = document.createElement('a');
            link.download = `دليل-الخط-صفحة-${i + 1}.png`;
            link.href = dataUrl;
            link.click();

            document.body.removeChild(clone);
        }

        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
        exportPngBtn.textContent = originalText; // إعادة النص الأصلي
        exportPngBtn.disabled = false;
        showSuccess('تم التصدير بنجاح!');
    } catch (error) {
        console.error('Error exporting PNG:', error);
        exportPngBtn.textContent = originalText; // إعادة النص الأصلي في حالة الخطأ
        exportPngBtn.disabled = false;
        showError('فشل في التصدير. تأكد من تحميل الخط والعناصر.');
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
    }
}

async function exportAsPDF() {
    if (!currentFont) {
        showError('يرجى تحميل خط أولاً.');
        return;
    }

    try {
        await loadAllFonts();
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = 'none');
        
        // تغيير نص الزر إلى "جاري التصدير"
        const exportPdfBtn = document.getElementById('export-pdf');
        const originalText = exportPdfBtn.textContent;
        exportPdfBtn.textContent = 'جاري التصدير...';
        exportPdfBtn.disabled = true;

        const totalPages = calculateTotalPages();
        globalCurrentIndex = startRange;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [PAGE_WIDTH, PAGE_HEIGHT]
        });

        for (let i = 0; i < totalPages; i++) {
            const originalPage = document.querySelectorAll('.page-preview')[i];
            const clone = originalPage.cloneNode(true);

            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.zIndex = '9999';
            clone.style.opacity = '1';
            clone.style.pointerEvents = 'none';
            clone.style.transform = 'scale(1)';
            clone.style.backgroundColor = 'transparent';

            const isIntroPage = i === 0 && (introText1 || introText2 || introTextExtra);
            const introContainer = clone.querySelector('.intro-container');
            if (introContainer) {
                introContainer.style.backgroundColor = currentPageBgColor;
            }

            if (currentBadgeStyle === 'shape3') {
                clone.classList.add('badge-shape3');
            }

            document.body.appendChild(clone);

            await new Promise(resolve => setTimeout(resolve, 500));

            const exportBgColor = isIntroPage ? currentPageBgColor : 'transparent';
            const dataUrl = await htmlToImage.toJpeg(clone, {
                quality: 1,
                backgroundColor: exportBgColor,
                pixelRatio: 4
            });

            if (i > 0) pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, 0, PAGE_WIDTH, PAGE_HEIGHT);

            document.body.removeChild(clone);
        }

        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
        exportPdfBtn.textContent = originalText; // إعادة النص الأصلي
        exportPdfBtn.disabled = false;
        pdf.save('دليل-الخط.pdf');
        showSuccess('تم إنشاء ملف PDF بنجاح!');
    } catch (error) {
        console.error('Error exporting PDF:', error);
        exportPdfBtn.textContent = originalText; // إعادة النص الأصلي في حالة الخطأ
        exportPdfBtn.disabled = false;
        showError('حدث خطأ أثناء التصدير إلى PDF.');
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
    }
}

async function exportAsPDFHighQuality() {
    if (!currentFont) {
        showError('يرجى تحميل خط أولاً.');
        return;
    }

    try {
        await loadAllFonts();
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = 'none');
        
        // تغيير نص الزر إلى "جاري التصدير"
        const exportPdfBtn = document.getElementById('export-pdf-low-quality');
        const originalText = exportPdfBtn.textContent;
        exportPdfBtn.textContent = 'جاري التصدير...';
        exportPdfBtn.disabled = true;

        const totalPages = calculateTotalPages();
        globalCurrentIndex = startRange;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [PAGE_WIDTH, PAGE_HEIGHT]
        });

        for (let i = 0; i < totalPages; i++) {
            const originalPage = document.querySelectorAll('.page-preview')[i];
            const clone = originalPage.cloneNode(true);

            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.zIndex = '9999';
            clone.style.opacity = '1';
            clone.style.pointerEvents = 'none';
            clone.style.transform = 'scale(1)';
            clone.style.backgroundColor = 'transparent';

            const isIntroPage = i === 0 && (introText1 || introText2 || introTextExtra);
            const introContainer = clone.querySelector('.intro-container');
            if (introContainer) {
                introContainer.style.backgroundColor = currentPageBgColor;
            }

            if (currentBadgeStyle === 'shape3') {
                clone.classList.add('badge-shape3');
            }

            document.body.appendChild(clone);

            await new Promise(resolve => setTimeout(resolve, 500));

            const exportBgColor = isIntroPage ? currentPageBgColor : 'transparent';
            const dataUrl = await htmlToImage.toJpeg(clone, {
                quality: 1,
                backgroundColor: exportBgColor,
                pixelRatio: 2
            });

            if (i > 0) pdf.addPage();
            pdf.addImage(dataUrl, 'PNG', 0, 0, PAGE_WIDTH, PAGE_HEIGHT);

            document.body.removeChild(clone);
        }

        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
        exportPdfBtn.textContent = originalText; // إعادة النص الأصلي
        exportPdfBtn.disabled = false;
        pdf.save('دليل-الخط.pdf');
        showSuccess('تم إنشاء ملف PDF بنجاح!');
    } catch (error) {
        console.error('Error exporting PDF:', error);
        exportPdfBtn.textContent = originalText; // إعادة النص الأصلي في حالة الخطأ
        exportPdfBtn.disabled = false;
        showError('حدث خطأ أثناء التصدير إلى PDF.');
        document.querySelectorAll('.item-controls').forEach(el => el.style.display = '');
    }
}


function toggleExportButtons(enabled) {
    exportPngBtn.disabled = !enabled;
    document.getElementById('export-pdf').disabled = !enabled;
}

function showSuccess(message) {
    notification.className = 'notification success show';
    notification.textContent = message;
    setTimeout(() => {
        notification.className = 'notification success';
    }, 3000);
}

function showError(message) {
    notification.className = 'notification error show';
    notification.textContent = message;
    setTimeout(() => {
        notification.className = 'notification error';
    }, 3000);
}

function updateRangeBackground(rangeInput) {
    const value = parseInt(rangeInput.value);
    const max = parseInt(rangeInput.max);
    const percentage = (value / max) * 100;
    rangeInput.style.background = `linear-gradient(to right, #4361ee 0%, #4361ee ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
}

function updateSvgRangeBackground(rangeInput) {
    const value = parseInt(rangeInput.value);
    const max = parseInt(rangeInput.max);
    const percentage = (value / max) * 100;
    rangeInput.style.background = `linear-gradient(to right, #4361ee 0%, #4361ee ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
}

function updatePageNavigation() {
    const totalPages = calculateTotalPages();
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    totalPagesSpan.textContent = totalPages;
    currentPageSpan.textContent = 1;

    prevPageBtn.disabled = true;
    nextPageBtn.disabled = totalPages <= 1;

    prevPageBtn.onclick = () => {
        const currentPage = parseInt(currentPageSpan.textContent);
        if (currentPage > 1) {
            currentPageSpan.textContent = currentPage - 1;
            scrollToPage(currentPage - 1);
            prevPageBtn.disabled = currentPage - 1 === 1;
            nextPageBtn.disabled = false;
        }
    };

    nextPageBtn.onclick = () => {
        const currentPage = parseInt(currentPageSpan.textContent);
        if (currentPage < totalPages) {
            currentPageSpan.textContent = currentPage + 1;
            scrollToPage(currentPage + 1);
            nextPageBtn.disabled = currentPage + 1 === totalPages;
            prevPageBtn.disabled = false;
        }
    };
}

function scrollToPage(pageNumber) {
    const pages = document.querySelectorAll('.page-preview');
    if (pages[pageNumber - 1]) {
        pages[pageNumber - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.getElementById('zoom-in').addEventListener('click', () => {
    const scale = parseFloat(previewContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
    previewContainer.style.transform = `scale(${Math.min(scale + 0.1, 2)})`;
});

document.getElementById('zoom-out').addEventListener('click', () => {
    const scale = parseFloat(previewContainer.style.transform.replace('scale(', '').replace(')', '')) || 1;
    previewContainer.style.transform = `scale(${Math.max(scale - 0.1, 0.5)})`;
});

document.getElementById('fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        previewContainer.requestFullscreen().catch(err => {
            showError('فشل في تفعيل وضع الشاشة الكاملة.');
        });
    } else {
        document.exitFullscreen();
    }
});

const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const controlsSection = document.querySelector('.controls-section');
const controlsHeader = document.querySelector('.controls-header');

toggleSidebarBtn.addEventListener('click', () => {
    controlsSection.classList.toggle('sidebar-active');
    const isActive = controlsSection.classList.contains('sidebar-active');
    toggleSidebarBtn.innerHTML = isActive
        ? '<i class="fas fa-times"></i> إغلاق الإعدادات'
        : '<i class="fas fa-sliders-h"></i> الإعدادات';
    toggleSidebarBtn.classList.toggle('active', isActive);
    controlsHeader.style.marginTop = isActive ? '50px' : '0px';
});

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updateColors();
    renderCustomTemplates();
    updatePreview();

    document.getElementById('svg-size').value = currentSvgSize;
    document.getElementById('global-padding-right').value = currentPaddingRight;
    document.getElementById('svg-size-value').textContent = currentSvgSize;
    document.getElementById('global-padding-value').textContent = currentPaddingRight;

    updateSvgRangeBackground(document.getElementById('svg-size'));
    updateRangeBackground(document.getElementById('global-padding-right'));
});
