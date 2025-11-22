# Vercel Environment Variables Kurulumu

Bu rehber, Vercel projenizde environment variables'ları otomatik olarak ayarlamanıza yardımcı olur.

## Hızlı Kurulum

### 1. Vercel Token Alın

1. https://vercel.com/account/tokens adresine gidin
2. "Create Token" butonuna tıklayın
3. Token'a bir isim verin (örn: "GarantiCo Setup")
4. Token'ı kopyalayın (sadece bir kez gösterilir!)

### 2. Environment Variables Ayarlayın

```bash
# Vercel token'ı ayarla
export VERCEL_TOKEN=your_vercel_token_here

# NeonDB connection string (opsiyonel - yoksa manuel ekleyin)
export DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Otomatik kurulumu çalıştır
node scripts/setup-vercel-env.js
```

### 3. Manuel Kurulum (Alternatif)

Token yoksa veya manuel yapmak isterseniz:

1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Projenizi seçin: `garantico-website`
3. Settings → Environment Variables
4. Şu değişkenleri ekleyin:

#### Production, Preview, Development için:

- **DATABASE_URL**: NeonDB connection string
  ```
  postgresql://user:password@host:port/database?sslmode=require
  ```

- **NEXT_PUBLIC_APP_URL**: Production URL
  ```
  https://garantico-website.vercel.app
  ```

- **NEXT_PUBLIC_WHATSAPP_NUMBER**: WhatsApp numarası
  ```
  +905551234567
  ```

## NeonDB Connection String Alma

### Yöntem 1: NeonDB Console

1. https://console.neon.tech adresine gidin
2. Projenizi seçin
3. "Connection Details" bölümünden connection string'i kopyalayın

### Yöntem 2: NeonDB API (Otomatik)

```bash
export NEON_API_KEY=your_neon_api_key
node scripts/neondb-setup.js
```

Bu script otomatik olarak:
- NeonDB projesi oluşturur
- Connection string alır
- Vercel'e ekler

## Tam Otomatik Kurulum

Hem NeonDB hem Vercel'i otomatik kurmak için:

```bash
# 1. NeonDB API Key
export NEON_API_KEY=your_neon_api_key

# 2. Vercel Token
export VERCEL_TOKEN=your_vercel_token

# 3. Otomatik kurulum
node scripts/setup-deployment.js
```

Bu script:
- ✅ NeonDB projesi oluşturur
- ✅ Connection string alır
- ✅ Vercel projesi oluşturur/bağlar
- ✅ Tüm environment variables'ları ayarlar

## Kontrol

Environment variables'ların doğru ayarlandığını kontrol etmek için:

```bash
vercel env ls
```

Veya Vercel Dashboard'dan:
- Settings → Environment Variables

## Sorun Giderme

### "VERCEL_TOKEN not found"

Token'ı export edin:
```bash
export VERCEL_TOKEN=your_token_here
```

### "DATABASE_URL not set"

Manuel olarak Vercel dashboard'dan ekleyin veya:
```bash
export DATABASE_URL=your_connection_string
node scripts/setup-vercel-env.js
```

### "Project not found"

Script otomatik olarak proje oluşturur. Eğer sorun olursa:
1. Vercel dashboard'dan projeyi kontrol edin
2. GitHub repository'nin bağlı olduğundan emin olun

## Önemli Notlar

- Environment variables her environment için ayrı ayrı ayarlanır (Production, Preview, Development)
- `NEXT_PUBLIC_*` ile başlayan değişkenler client-side'da kullanılabilir
- `DATABASE_URL` gibi sensitive değişkenler server-side only'dir
- Production'da mutlaka `DATABASE_URL` ayarlanmalıdır

