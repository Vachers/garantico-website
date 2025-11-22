# Admin Panel Kurulum Rehberi

## Admin Paneli Özellikleri

Admin paneli aşağıdaki özellikleri içerir:

1. **Dashboard**: Genel istatistikler ve son teklifler
2. **Ürün Yönetimi**: Ürün ekleme, düzenleme, silme
3. **Teklif Yönetimi**: Gelen teklifleri görüntüleme ve durum güncelleme
4. **İçerik Yönetimi**: Sayfa içeriklerini düzenleme (TR/EN)
5. **Logo Yönetimi**: Site logosunu yükleme ve değiştirme
6. **Site Ayarları**: İletişim bilgileri, adresler, telefon, email, WhatsApp

## Admin Kullanıcı Oluşturma

### Yöntem 1: Script ile (Önerilen)

```bash
npm run admin:create
```

Veya:

```bash
node scripts/create-admin-user.js
```

### Yöntem 2: SQL ile

```sql
-- Önce bcrypt hash oluşturun:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Sb26112020!', 10).then(h => console.log(h))"

INSERT INTO admin_users (username, password) 
VALUES ('Sinan', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT (username) DO NOTHING;
```

## Giriş Bilgileri

- **URL**: `/admin/login`
- **Kullanıcı Adı**: `Sinan`
- **Şifre**: `Sb26112020!`

## Database Migration

Admin paneli için yeni tablolar oluşturulmalı:

```bash
npm run db:push
```

Bu komut şu tabloları oluşturur:
- `admin_users`: Admin kullanıcıları
- `site_settings`: Site ayarları (logo, iletişim bilgileri)

## Özellikler

### Logo Yükleme
- PNG, JPG, SVG formatları desteklenir
- Maksimum dosya boyutu: 2MB
- Logo `/public/uploads/` klasörüne kaydedilir
- Database'de `site_settings` tablosunda `logo_url` key'i ile saklanır

### İçerik Yönetimi
- Tüm sayfa içerikleri `page_contents` tablosundan gelir
- Her içerik için TR ve EN versiyonları düzenlenebilir
- Değişiklikler anında kaydedilir

### Site Ayarları
- Ofis adresi
- Depo adresi
- Telefon numarası
- E-posta adresi
- WhatsApp numarası

Bu bilgiler `site_settings` tablosunda saklanır ve frontend'de kullanılır.

## Güvenlik

- Admin route'ları middleware ile korunur
- Session-based authentication kullanılır
- Şifreler bcrypt ile hash'lenir
- HTTP-only cookies kullanılır

## Notlar

- Production'da `SESSION_SECRET` environment variable'ını değiştirin
- Logo dosyaları `public/uploads/` klasöründe saklanır
- `.gitignore` dosyasına `public/uploads/` eklenmelidir (opsiyonel)

