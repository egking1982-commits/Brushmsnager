const CACHE_NAME = 'brush-manager-v2.8.5'; // تحديث اسم الكاش للإصدار الجديد
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-database-compat.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
  'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'
];

// تثبيت الخدمة وحفظ الملفات في الكاش للعمل "أوفلاين"
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets for V2.8.5...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // تفعيل الإصدار الجديد فوراً عند التحميل
});

// تنظيف الكاش القديم (مثل v2.7.0) لمنع تعارض الملفات
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// استرجاع الملفات من الكاش في حال عدم وجود إنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

