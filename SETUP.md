# Automated Setup Guide

Bu script'ler NeonDB ve Vercel'i otomatik olarak yapılandırmanıza yardımcı olur.

## Gereksinimler

1. **NeonDB API Key**: https://console.neon.tech → Account Settings → Developer Settings
2. **Vercel Token** (opsiyonel): https://vercel.com/account/tokens

## Hızlı Kurulum

### Yöntem 1: Tam Otomatik (Önerilen)

```bash
# NeonDB API key'i ayarla
export NEON_API_KEY=your_neon_api_key

# Vercel token'ı ayarla (opsiyonel, yoksa CLI login kullanılır)
export VERCEL_TOKEN=your_vercel_token

# Otomatik kurulumu çalıştır
node scripts/setup-deployment.js
```

Bu script:
1. ✅ NeonDB projesi oluşturur
2. ✅ Database branch oluşturur
3. ✅ Connection string alır
4. ✅ Vercel projesi oluşturur/bağlar
5. ✅ Tüm environment variables'ları ayarlar

### Yöntem 2: Adım Adım

#### 1. NeonDB Kurulumu

```bash
export NEON_API_KEY=your_neon_api_key
node scripts/neondb-setup.js
```

Connection string'i kopyalayın ve `.env.local` dosyasına ekleyin:

```env
DATABASE_URL=postgresql://...
```

#### 2. Vercel Kurulumu (Token ile)

```bash
export VERCEL_TOKEN=your_vercel_token
export DATABASE_URL=your_neondb_connection_string
node scripts/vercel-setup.js
```

#### 3. Vercel Kurulumu (CLI ile)

```bash
# Login
vercel login

# Projeyi bağla
vercel link --name garantico-website

# Environment variables ekle
echo "your_connection_string" | vercel env add DATABASE_URL production
echo "https://garantico-website.vercel.app" | vercel env add NEXT_PUBLIC_APP_URL production
echo "+905551234567" | vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
```

## Token Alma

### NeonDB API Key

1. https://console.neon.tech adresine gidin
2. Account Settings → Developer Settings
3. "Create API Key" butonuna tıklayın
4. Key'i kopyalayın

### Vercel Token

1. https://vercel.com/account/tokens adresine gidin
2. "Create Token" butonuna tıklayın
3. Token'a bir isim verin (örn: "GarantiCo Setup")
4. Token'ı kopyalayın (sadece bir kez gösterilir!)

## Environment Variables

Aşağıdaki environment variables otomatik olarak ayarlanır:

- `DATABASE_URL`: NeonDB connection string
- `NEXT_PUBLIC_APP_URL`: Production URL
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp Business numarası

## Sorun Giderme

### "NEON_API_KEY not found"

NeonDB API key'inizi export edin:
```bash
export NEON_API_KEY=your_key_here
```

### "VERCEL_TOKEN not found"

Vercel token'ı export edin veya `vercel login` kullanın:
```bash
export VERCEL_TOKEN=your_token_here
# veya
vercel login
```

### "Project already exists"

Proje zaten mevcutsa, script mevcut projeyi kullanır. Sorun olmaz.

### Environment variable zaten var

Script mevcut değişkenleri günceller. Hata alırsanız, Vercel dashboard'dan manuel olarak silebilirsiniz.

## Sonraki Adımlar

Kurulum tamamlandıktan sonra:

1. **Database migrations çalıştırın:**
   ```bash
   npm run db:push
   ```

2. **Deploy edin:**
   ```bash
   vercel --prod
   ```
   
   Veya GitHub'a push yapın, Vercel otomatik deploy edecektir.

3. **Test edin:**
   - Production URL'i ziyaret edin
   - Form'ları test edin
   - Database bağlantısını kontrol edin

## Manuel Kontrol

### Vercel Environment Variables

```bash
vercel env ls
```

### NeonDB Connection

```bash
# Connection string'i test et
psql $DATABASE_URL -c "SELECT version();"
```

## Destek

Sorun yaşarsanız:
1. Script çıktılarını kontrol edin
2. Token'ların doğru olduğundan emin olun
3. Vercel ve NeonDB dashboard'larını kontrol edin

