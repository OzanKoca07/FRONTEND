# Users & Posts App (Phase 1)

Bu proje, **React + TypeScript + Vite** kullanılarak geliştirilmiş bir mini uygulamadır.  
Phase 1 kapsamında JSONPlaceholder’dan veri çekilmekte ve **Users** ile **Posts** listeleri üzerinden CRUD işlemleri yapılabilmektedir.

---

## 🚀 Özellikler
- **Homepage**: Users ve Posts linkleri
- **Users Page**
  - Kullanıcı listesi (id, name, username, email)
  - Kullanıcı ekleme, düzenleme, silme
  - Kullanıcı detay sayfasına gidiş
- **User Detail Page**
  - Seçili kullanıcının postları
  - Yeni post ekleme, düzenleme, silme
- **Posts Page**
  - Tüm postların listesi (id, userId, title)
  - Post ekleme, düzenleme, silme
  - Kullanıcı adı ile ilişkilendirme
- **Client-side CRUD** (JSONPlaceholder sadece başlangıç verisi sağlıyor)
- **Temel Styling** (tablo, butonlar, formlar)
- **ESLint** uyumlu TypeScript kodu

---

## 🛠️ Kullanılan Teknolojiler
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) → hızlı geliştirme ortamı
- [Axios](https://axios-http.com/) → API istekleri
- [React Router](https://reactrouter.com/) → sayfa yönlendirme
- [ESLint](https://eslint.org/) → kod kalitesi

---

## 📦 Kurulum ve Çalıştırma
Projeyi lokalinizde çalıştırmak için:

```bash
# repoyu klonla
git clone https://github.com/kullanici-adi/users-posts-app.git
cd users-posts-app

# frontend klasörüne gir
cd frontend

# bağımlılıkları yükle
npm install

# geliştirme sunucusu başlat
npm run dev
