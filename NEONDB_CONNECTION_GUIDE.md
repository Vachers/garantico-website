# NeonDB Connection String Alma Rehberi

## Yöntem 1: NeonDB Dashboard (Manuel)

### Adım 1: NeonDB'ye Giriş Yapın
1. https://console.neon.tech adresine gidin
2. Giriş yapın veya hesap oluşturun

### Adım 2: Proje Seçin veya Oluşturun
1. Dashboard'da projenizi seçin
2. Eğer proje yoksa "Create Project" butonuna tıklayın
3. Proje adı: `garantico-db` (veya istediğiniz bir isim)
4. Region seçin (EU Central önerilir)
5. "Create Project" butonuna tıklayın

### Adım 3: Connection String'i Bulun

**Seçenek A: Project Overview Sayfası**
1. Projenizi seçtikten sonra ana sayfada
2. "Connection string" veya "Connect" butonunu arayın
3. Genellikle sayfanın üst kısmında veya sağ tarafta bir kutu içinde gösterilir

**Seçenek B: Connection Details Modal**
1. Proje sayfasında "Connection Details" veya "Connect" butonuna tıklayın
2. Açılan modal'da connection string'i göreceksiniz
3. Format: `postgresql://user:password@host:port/database?sslmode=require`

**Seçenek C: Settings → Connection String**
1. Sol menüden "Settings" veya "Project Settings" seçin
2. "Connection String" veya "Database" bölümüne gidin
3. Connection string'i kopyalayın

**Seçenek D: SQL Editor**
1. Sol menüden "SQL Editor" seçin
2. Üst kısımda connection bilgileri gösterilir
3. Veya "Connect" butonuna tıklayın

### Adım 4: Connection String Formatı

Connection string şu formatta olmalı:
```
postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/dbname?sslmode=require
```

Örnek:
```
postgresql://neondb_owner:password123@ep-cool-darkness-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

## Yöntem 2: NeonDB API ile Otomatik (Önerilen)

Eğer NeonDB API key'iniz varsa, otomatik olarak proje oluşturup connection string alabilirsiniz:

### Adım 1: API Key Alın
1. https://console.neon.tech → Account Settings
2. "Developer Settings" veya "API Keys" bölümüne gidin
3. "Create API Key" butonuna tıklayın
4. Key'e bir isim verin (örn: "GarantiCo Setup")
5. Key'i kopyalayın (sadece bir kez gösterilir!)

### Adım 2: Otomatik Kurulum
```bash
export NEON_API_KEY=your_api_key_here
export VERCEL_TOKEN=UjW5UH68XaRb9UGKdmT0J6JP
node scripts/setup-deployment.js
```

Bu script:
- ✅ NeonDB projesi oluşturur
- ✅ Database branch oluşturur
- ✅ Connection string alır
- ✅ Vercel'e otomatik ekler

## Yöntem 3: NeonDB CLI (Alternatif)

Eğer NeonDB CLI kuruluysa:
```bash
# Install NeonDB CLI
npm install -g neonctl

# Login
neonctl auth

# Create project
neonctl projects create --name garantico-db

# Get connection string
neonctl connection-string --project-id your_project_id
```

## Connection String'i Vercel'e Ekleme

### Manuel Ekleme:
1. https://vercel.com/dashboard → garantico-website projesi
2. Settings → Environment Variables
3. "Add New" butonuna tıklayın
4. Key: `DATABASE_URL`
5. Value: Connection string'inizi yapıştırın
6. Environment: Production, Preview, Development (hepsini seçin)
7. "Save" butonuna tıklayın

### Otomatik Ekleme:
```bash
export DATABASE_URL="postgresql://..."
export VERCEL_TOKEN=UjW5UH68XaRb9UGKdmT0J6JP
node scripts/setup-vercel-env.js
```

## Sorun Giderme

### "Connection string bulamıyorum"
- NeonDB dashboard'un yeni versiyonunda farklı yerlerde olabilir
- "Connect" veya "Connection" butonlarını arayın
- Proje ayarlarına (Settings) bakın

### "API key bulamıyorum"
- Account Settings → Developer Settings
- Veya: https://console.neon.tech/settings/api-keys

### "Connection string formatı yanlış"
- `postgresql://` ile başlamalı
- `?sslmode=require` ile bitmeli
- Özel karakterler URL encode edilmiş olmalı

## Yardım

Hala connection string bulamıyorsanız:
1. NeonDB support'a ulaşın: support@neon.tech
2. Veya Discord community: https://discord.gg/neondatabase
3. Veya API key ile otomatik kurulum yapın (en kolay yol)

